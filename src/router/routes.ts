export const ROUTES = {
  BLOG: "/blog",
  CART: "/cart",
  CATALOG: "/catalog",
  CONTACTS: "./contacts",
  LOGIN: "/login",
  MAIN: "/",
  PROFILE: "/profile",
  REGISTRATION: "/registration",
  book: (bookId: string) => `/book/${bookId}`,
  categoryCatalog: (categoryType: string) => `/catalog/${categoryType}`,
}
