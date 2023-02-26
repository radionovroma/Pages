import { createServer, Model } from "miragejs";
import { books, categories } from "./mock"
export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,
    models: {
      notes: Model,
    },
    routes() {
      this.namespace = "pages";
      this.get("/books", () => {
        return JSON.stringify([...books]);
      });
      this.get("/categories", () => {
        return JSON.stringify([...categories]);
      })
    },
  });
}
