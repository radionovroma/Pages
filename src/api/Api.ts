import { Category, Book } from "@types";

export class Api {
  fetchData = (url: URL) => {
    return fetch(url)
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          throw new Error('Network err');
        }
      });
  };

  getCategoriesList = (): Promise<Category[]> => {
    return this.fetchData(new URL('http://localhost:8080/api/categories'));
  };
  getBannerBooks = (): Promise<Book[]> => {
    return this.fetchData(new URL('http://localhost:8080/api/banner_products'))
  }

  getPopularCategories = (): Promise<{category: Category, products: Book[]}[]> => {
    return this.fetchData(new URL('http://localhost:8080/api/popular_categories'));
  }
}
