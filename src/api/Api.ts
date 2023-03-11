import { Category, Book } from "@types";

const CATEGORIES_URL = new URL('http://localhost:8080/api/categories');
const BANNER_PRODUCTS_URL = new URL('http://localhost:8080/api/banner_products');
const POPULAR_CATEGORIES_URL = new URL('http://localhost:8080/api/popular_categories');
const SUBSCRIBE_URL = new URL('http://localhost:8080/api/subscribe');

type Options = { method: string, body: string }

export class Api {
  fetchData = (url: URL, options?: Options) => {
    return fetch(url, options)
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          throw new Error(`${data.statusText}`);
        }
      });
  };

  getCategoriesList = (): Promise<Category[]> => {
    return this.fetchData(CATEGORIES_URL);
  };

  getBannerProducts = (): Promise<Book[]> => {
    return this.fetchData(BANNER_PRODUCTS_URL)
  }

  getPopularCategories = (): Promise<{ category: Category, books: Book[] }[]> => {
    return this.fetchData(POPULAR_CATEGORIES_URL);
  }

  subscribeNewsletter = (email: string) => {
    return this.fetchData(SUBSCRIBE_URL, {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }
}
