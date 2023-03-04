import { Category } from "./category"

export const categories: Pick<Category, "type" | "label">[] = [
  { "type": "fiction", "label": "fiction", },
  { "type": "thriller", "label": "thriller & suspense", },
  { "type": "detective", "label": "mystery & detective", },
  { "type": "romance", "label": "romance", },
  { "type": "fantasy", "label": "science fiction & fantasy", },
  { "type": "nonfiction", "label": "nonfiction", },
  { "type": "biography", "label": "biography & memoir", },
  { "type": "history", "label": "history", },
  { "type": "social", "label": "current events & social issues", },
  { "type": "comics", "label": "graphic novels & comics", },
  { "type": "teen", "label": "teen & young adult", },
  { "type": "children", "label": "children's", },
  { "type": "bestsellers", "label": "bestsellers", },
  { "type": "best", "label": "best of 2022", },
  { "type": "soon", "label": "on sale soon", }
];
