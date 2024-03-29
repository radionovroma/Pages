import { createServer, Model, belongsTo, Response } from 'miragejs'
import * as yup from 'yup'
import orderBy from 'lodash.orderby'
import * as jose from 'jose'
import { products, categories } from './models'

const APP_CONFIG = {
  DEFAULT_RESPONSE_DELAY: 0,
  TOKEN_TTL: '24h',
  USE_AUTH_CHECK: true,
  LOG_BE_ERRORS: true,
}

const userCredentialsSchema = yup.object().shape({
  login: yup.string().required(),
  password: yup.string().required(),
})

const subscriberCredentialsSchema = yup.object().shape({
  email: yup.string().required(),
})

const getValidator = (schema) => async (entity) => {
  return schema
    .validate(entity, { abortEarly: false })
    .then(() => [])
    .catch(({ inner }) => inner.map((e) => e.message?.split(' at createError')[0] ?? e))
}

const validateUserCredentials = getValidator(userCredentialsSchema)
const validateSubscriberCredentials = getValidator(subscriberCredentialsSchema)

const generateSecret = async () => {
  return jose.generateSecret('HS256')

}

const DEFAULT_HEADERS = {}

const RESPONSE_MESSAGES = {
  INVALID_TOKEN: 'This action is not available to the current user (check the token)',
  USER_NOT_FOUND: 'User is not found',
  USER_ALREADY_EXISTS: 'This user already exists',
  USER_ALREADY_SUBSCRIBED: 'You are already subscribed',
  CART_PRODUCT_NOT_FOUND: 'Product not in cart',
  CART_PRODUCT_ALREADY_EXISTS: 'The product is already in the cart',
}

const RESPONSE_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

export function makeServer () {
  return createServer({
    models: {
      categories: Model,
      products: Model.extend({
        category: belongsTo('category')
      }),
      users: Model,
      subscribers: Model,
    },

    seeds (server) {
      categories.forEach((category) => {
        server.create('category', category)
      });
      products.forEach((product) => {
        server.create('product', product)
      });
      server.create('user', { login: 'user', name: "User", password: 'testUser01' });
    },

    routes () {
      this.namespace = 'api'

      this.get('/categories', (schema) => {
        return schema.categories.all().models
      })

      this.get('/banner_products', (schema) => {
        //изменить на 15 когда будут заполнены данные
        return schema.products.where({ categoryId: 1 }).models.slice(0, 10)
      })

      this.get('/popular_categories', (schema) => {
        //изменить на 13, 14 когда будут заполнены данные
        const categories = schema.categories.find([2, 3]).models

        return categories.map((category) => {
          const items = schema.products.where({ categoryId: category.id }).models
          return { category, books: items.slice(0, 20) }
        })
      })

      this.get('/products', (schema, request) => {
        const {
          ids,
          categoryTypeIds,
          minPrice,
          maxPrice,
          minYear,
          maxYear,
          text,
          limit = '20',
          offset = '0',
          sortBy = 'id',
          sortDirection = 'asc'
        } = request.queryParams

        const idsArray = ids?.split(',')
        const categoryTypeIdsArray = categoryTypeIds === '' ? undefined : categoryTypeIds?.split(',')
        const minPriceValue = parseInt(minPrice, 10)
        const maxPriceValue = parseInt(maxPrice, 10)
        const minYearValue = parseInt(minYear, 10)
        const maxYearValue = parseInt(maxYear, 10)

        const filteredItems = schema.products.where((good) => {
          const isIdMatch = idsArray?.includes(good.id) ?? true
          const isTypeIdMatch = categoryTypeIdsArray?.includes(good.categoryId) ?? true
          const isMinPriceMatch = Number.isNaN(minPriceValue) ? true : good.price >= minPriceValue
          const isMaxPriceMatch = Number.isNaN(maxPriceValue) ? true : good.price <= maxPriceValue
          const isMinYearMatch = Number.isNaN(minYearValue) ? true : good.date_published >= minYearValue
          const isMaxYearMatch = Number.isNaN(maxYearValue) ? true : good.date_published <= maxYearValue
          const isTextMatch = text ? good.title.toLowerCase().includes(text.toLowerCase()) : true
          const isAuthorMatch = text ? good.authors.map((item, i) => item.toLowerCase().indexOf(text.toLowerCase()) >= 0 ? i : -1).filter(item => item >= 0).length : true;

          return [isIdMatch, isTypeIdMatch, isMinPriceMatch, isMaxPriceMatch, isMinYearMatch, isMaxYearMatch].every(Boolean) && (isAuthorMatch || isTextMatch);
        }).models

        const sortedItems = sortBy ? orderBy(filteredItems, [sortBy], [sortDirection]) : filteredItems

        const limitValue = parseInt(limit, 10)
        const offsetValue = parseInt(offset, 10)

        const filterParams = {
          minPrice: Math.floor(schema.products.all().models.reduce((acc, curr) => acc.price < curr.price ? acc : curr).price),
          maxPrice: Math.ceil(schema.products.all().models.reduce((acc, curr) => acc.price > curr.price ? acc : curr).price),
          minYear: schema.products.all().models.reduce((acc, curr) => acc.date_published < curr.date_published ? acc : curr).date_published,
          maxYear: schema.products.all().models.reduce((acc, curr) => acc.date_published > curr.date_published ? acc : curr).date_published,
        }

        return {
          items: sortedItems.slice(offsetValue, offsetValue + limitValue),
          filterParams,
          total: sortedItems.length,
        }
      })

      this.post('/login', async (schema, request) => {
        const credentials = JSON.parse(request.requestBody) ?? {}
        const errors = await validateUserCredentials(credentials)

        if (errors.length) {
          return new Response(RESPONSE_CODES.BAD_REQUEST, DEFAULT_HEADERS, errors)
        }

        const user = schema.users.findBy(credentials)

        if (!user) {
          return new Response(RESPONSE_CODES.NOT_FOUND, DEFAULT_HEADERS, RESPONSE_MESSAGES.USER_NOT_FOUND)
        }

        const { login, password, name } = user

        //   const token = jwt.sign({ login, password }, JWT_SECRET, { expiresIn: APP_CONFIG.TOKEN_TTL });
        const token = await new jose.SignJWT({
          login,
          password,
          name
        }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime(APP_CONFIG.TOKEN_TTL).sign(await generateSecret())

        return new Response(RESPONSE_CODES.OK, DEFAULT_HEADERS, { login, token, name })
      })

      this.post('/registration', async (schema, request) => {
        const credentials = JSON.parse(request.requestBody) ?? {}
        const errors = await validateUserCredentials(credentials)

        if (errors.length) {
          return new Response(RESPONSE_CODES.BAD_REQUEST, {}, errors)
        }

        const currentUser = schema.users.where({ login: credentials.login })

        if (currentUser && currentUser.models.length) {
          return new Response(RESPONSE_CODES.NOT_FOUND, DEFAULT_HEADERS, RESPONSE_MESSAGES.USER_ALREADY_EXISTS)
        }

        const subscriber = schema.subscribers.where({ email: credentials.login })

        if (subscriber && !subscriber.models.length && credentials.isSubscribe) {
          schema.subscribers.create({ email: credentials.login })
        }

        return schema.users.create(credentials)
      })

      this.post('/subscribe', async (schema, request) => {
        const credentials = JSON.parse(request.requestBody) ?? {}
        const errors = await validateSubscriberCredentials(credentials)

        if (errors.length) {
          return new Response(RESPONSE_CODES.BAD_REQUEST, {}, errors)
        }

        const currentSubscriber = schema.subscribers.where({ email: credentials.email })

        if (currentSubscriber && currentSubscriber.models.length) {
          return new Response(RESPONSE_CODES.NOT_FOUND, DEFAULT_HEADERS, RESPONSE_MESSAGES.USER_ALREADY_SUBSCRIBED)
        }

        return schema.subscribers.create(credentials)
      })

    },
  })
}
