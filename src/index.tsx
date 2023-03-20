import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import { App } from "./App";
import { MainPage, CatalogPage, ErrorPage } from "@containers";
import { makeServer } from "@mock";
import { store } from "@store/store"
import "./styles/index.scss";

makeServer();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App/>}>
      <Route index element={<MainPage/>} />
      <Route
        path="catalog"
        element={<CatalogPage/>}>
        <Route
          path=":categoryType"
          element={<CatalogPage/>}/>
      </Route>
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
      <RouterProvider router={router} />
    </Provider>
  );
