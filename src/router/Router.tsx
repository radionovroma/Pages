import React, { FC } from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import { BookPage, CatalogPage, ErrorPage, LoginPage, MainPage, RegistrationPage } from "@containers";
import { App, RequireAuth } from "@components";

export const Router: FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path={ROUTES.MAIN}
        element={<App/>}>
        <Route index element={<MainPage/>}/>
        <Route
          path={ROUTES.CATALOG}
          element={<CatalogPage/>}>
          <Route
            path={ROUTES.categoryCatalog(":categoryType")}
            element={<CatalogPage/>}/>
        </Route>
        <Route
          path={ROUTES.book(":ids")}
          element={<BookPage/>}/>
        <Route
          path={ROUTES.CART}
          element={
            <RequireAuth isDirectOrder={true}>
              <ErrorPage/>
            </RequireAuth>
          }/>
        <Route
          path={ROUTES.PROFILE}
          element={
            <RequireAuth isDirectOrder={true}>
              <ErrorPage/>
            </RequireAuth>
          }/>
        <Route
          path={ROUTES.LOGIN}
          element={
            <RequireAuth isDirectOrder={false}>
              <LoginPage/>
            </RequireAuth>
          }/>
        <Route
          path={ROUTES.REGISTRATION}
          element={
            <RequireAuth isDirectOrder={false}>
              <RegistrationPage/>
            </RequireAuth>
          }/>
        <Route
          path="*"
          element={<ErrorPage/>}/>
      </Route>
    )
  );

  return <RouterProvider router={router}/>
}
