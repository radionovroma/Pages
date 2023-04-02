import { Category, Book, SearchParams, FilterParams } from "@types";

const BASE_URL = "http://localhost:8080/";

export class Api {
  get = (url: string, params: Record<string, string | number> = {}): Promise<any> => {
    const searchParams = new URLSearchParams({
      ...params
    } as Record<string, string>);
    const fullUrl = new URL(url, BASE_URL);
    fullUrl.search = searchParams.toString();
    return fetch(fullUrl)
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          throw new Error(`${data.statusText}`);
        }
      });

  }

  getCategoriesList = (): Promise<Category[]> => {
    return this.get('/api/categories');
  };

  getBannerProducts = (): Promise<Book[]> => {
    return this.get('/api/banner_products')
  }

  getPopularCategories = (): Promise<{ category: Category, books: Book[] }[]> => {
    return this.get('/api/popular_categories');
  }

  getProducts = (params: SearchParams = {}): Promise<{ items: Book[], filterParams: FilterParams, total: number }> => {
    return this.get('/api/products', params);
  };

  post = (url: string, body: Record<string, unknown>): Promise<any> => {
    const fullUrl = new URL(url, BASE_URL);
    return fetch(fullUrl, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          // @ts-ignore
          throw new Error(data['_bodyText']);
        }
      })
  };

  login = (body: { login: string, password: string }): Promise<{ name: string, login: string, token: string }> => {
    return this.post('/api/login', body);
  };

  registration = (body: Record<string, any>) => {
    return this.post('/api/registration', body);
  }

  subscribe = (body: { email: string }): Promise<{ subscribers: { email: string, id: string } }> => {
    return this.post('/api/subscribe', body);
  }
}
