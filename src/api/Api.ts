import { Category, Book, SearchParams, FilterParams } from "@types";

const CATEGORIES_URL = new URL('http://localhost:8080/api/categories');
const BANNER_PRODUCTS_URL = new URL('http://localhost:8080/api/banner_products');
const POPULAR_CATEGORIES_URL = new URL('http://localhost:8080/api/popular_categories');
const PRODUCTS_URL = new URL('http://localhost:8080/api/products');
const SUBSCRIBE_URL = new URL('http://localhost:8080/api/subscribe');

export class Api {
  get = (url: URL): Promise<any> => {
    return fetch(url)
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          throw new Error(`${data.statusText}`);
        }
      });

  }

  getCategoriesList = (): Promise<Category[]> => {
    return this.get(CATEGORIES_URL);
  };

  getBannerProducts = (): Promise<Book[]> => {
    return this.get(BANNER_PRODUCTS_URL)
  }

  getPopularCategories = (): Promise<{ category: Category, books: Book[] }[]> => {
    return this.get(POPULAR_CATEGORIES_URL);
  }

  getProducts = (params ?: SearchParams): Promise<{ items: Book[], filterParams: FilterParams, total: number }> => {
    const searchParams = new URLSearchParams({
      ...params,
    } as Record<string, string>).toString();
    const url = new URL(PRODUCTS_URL);
    url.search = searchParams;
    return this.get(url);
  };

  post = (url: URL, body: Record<string, unknown>): Promise<any> => {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          throw new Error(`${data.statusText}`);
        }
      })
  };

  postSubscriber = (body: Record<string, unknown>): Promise<{ subscribers: { email: string, id: string } }> => {
    return this.post(SUBSCRIBE_URL, body);
  }
}
