import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import { makeServer } from "@mock";
import { store } from "@store/store"
import { App } from "./App";
import { NotificationProvider } from "@hocs";
import { MainPage, CatalogPage, BookPage, ErrorPage } from "@containers";
import "./styles/index.scss";

makeServer();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App/>}>
      <Route index element={<MainPage/>}/>
      <Route
        path="catalog"
        element={<CatalogPage/>}>
        <Route
          path=":categoryType"
          element={<CatalogPage/>}/>
      </Route>
      <Route
        path="book/:ids"
        element={<BookPage/>}/>
      <Route
        path="*"
        element={<ErrorPage/>}/>
    </Route>
  )
);

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <Provider store={store}>
      <NotificationProvider>
        <RouterProvider router={router}/>
      </NotificationProvider>
    </Provider>
  );
