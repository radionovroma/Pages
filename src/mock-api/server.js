import { createServer, Model, belongsTo } from 'miragejs'
import { products, categories } from './models'

export function makeServer () {
  return createServer({
    models: {
      categories: Model,
      products: Model.extend({
        category: belongsTo('category')
      }),

    },

    seeds (server) {
      categories.forEach((category) => {
        server.create('category', category);
      });
      products.forEach((product) => {
        server.create('product', product)
      });
    },

    routes () {
      this.namespace = "api"

      this.get('/categories', (schema) => {
        return schema.categories.all().models
      });

      this.get('/banner_products', (schema) => {
        //изменить на 15 когда будут заполнены данные
        const popularProducts = schema.products.where({categoryId: 1}).models.slice(0,10);
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
      });

      this.get('/popular_categories', (schema) => {
        //изменить на 13, 14 когда будут заполнены данные
        const categories = schema.categories.find([2, 3]).models;

        return categories.map((category) => {
            const items = schema.products.where({categoryId: category.id}).models;
            return { category, books: items };
          });
      });

    },
  })
}
