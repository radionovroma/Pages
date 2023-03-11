import { createServer, Model, belongsTo, Response } from 'miragejs'
import * as yup from 'yup'
import { products, categories } from './models'

const subscriberCredentialsSchema = yup.object().shape({
  email: yup.string().required(),
})

const getValidator = (schema) => async (entity) => {
  return schema
    .validate(entity, { abortEarly: false })
    .then(() => [])
    .catch(({ inner }) => inner.map((e) => e.message?.split(' at createError')[0] ?? e))
}

const validateSubscriberCredentials = getValidator(subscriberCredentialsSchema)

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
      subscribers: Model,
    },

    seeds (server) {
      categories.forEach((category) => {
        server.create('category', category)
      })
      products.forEach((product) => {
        server.create('product', product)
      })
    },

    routes () {
      this.namespace = 'api';

      this.get('/categories', (schema) => {
        return schema.categories.all().models
      })

      this.get('/banner_products', (schema) => {
        //изменить на 15 когда будут заполнены данные
        const popularProducts = schema.products.where({ categoryId: 1 }).models.slice(0, 10)
        return popularProducts.map(({ id, title, authors, synopsis, img, pages, language, date_published, count }) => {
          return {
            id,
            title,
            authors,
            synopsis,
            img,
            pages,
            language,
            date_published,
            count
          }
        })
      })

      this.get('/popular_categories', (schema) => {
        //изменить на 13, 14 когда будут заполнены данные
        const categories = schema.categories.find( [2, 3] ).models

        return categories.map((category) => {
          const items = schema.products.where({ categoryId: category.id }).models
          return { category, books: items.slice(0, 20) }
        })
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
