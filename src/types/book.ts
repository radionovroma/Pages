export interface Book {
  categoryTypeId: string;
  id: string;
  title: string;
  description: string;
  img: string;
  authors: string[];
  publisher: string;
  date_published: string;
  language: string;
  dimensions: string;
  pages: number;
  price: number;
  count: number | null;
}
