export interface Product {
  id: string;
  title: string;
  synopsis: string;
  img: string;
  authors: string[];
  publisher: string;
  date_published: number;
  language: string;
  dimensions: string;
  pages: number;
  price: number;
  count: number;
  categoryId: string;
}
