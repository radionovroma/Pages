import { Category } from "./category"

export const categories: Pick<Category, "type" | "label">[] = [
  { "type": "fiction", "label": "Fiction", },
  { "type": "thriller", "label": "Thriller & suspense", },
  { "type": "detective", "label": "Mystery & detective", },
  { "type": "romance", "label": "Romance", },
  { "type": "fantasy", "label": "Science fiction & fantasy", },
  { "type": "nonfiction", "label": "Nonfiction", },
  { "type": "biography", "label": "Biography & memoir", },
  { "type": "history", "label": "History", },
  { "type": "social", "label": "Current events & social issues", },
  { "type": "comics", "label": "Graphic novels & comics", },
  { "type": "teen", "label": "Teen & young adult", },
  { "type": "children", "label": "Children's", },
  { "type": "bestsellers", "label": "Bestsellers", },
  { "type": "best", "label": "Best of 2022", },
  { "type": "soon", "label": "On sale soon", }
];
