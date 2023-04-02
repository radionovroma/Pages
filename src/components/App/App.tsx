import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@store/store";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useNotification } from "@hooks";
import { fetchCategoriesList, getCategoriesList, getCategoriesStatus } from "@store/categories";
import { actions } from "@store/user";
import { Footer, Header } from "@components";
import { ROUTES } from "@router";
import { NavRoute } from "@types";
import LogoSvg from "@img/logo.svg";
import "./styles.module.scss";

export const App: FC = () => {
  const categoriesList = useSelector(getCategoriesList);
  const categoriesStatus = useSelector(getCategoriesStatus);
  const dispatch = useAppDispatch();
  const { contextHolder } = useNotification();

  useEffect(() => {
    dispatch(fetchCategoriesList());
  }, []);

  useEffect(() => {
    const { name, login, token } = JSON.parse(localStorage.getItem("user") || '{}');
    if (token && login) {
      dispatch(actions.signIn({ name, login, token }));
    }
  }, [])

  const routs: NavRoute[] = [
    { label: "Home", id: "home", path: ROUTES.MAIN, },
    {
      label: "Catalog",
      id: "catalog",
      path: ROUTES.CATALOG,
      dropdownList: { list: categoriesList, status: categoriesStatus }
    },
    { label: "Blog", id: "blog", path: ROUTES.BLOG },
    { label: "Contacts", id: "contacts", path: ROUTES.CONTACTS },
  ];

  return (
    <>
      <ScrollRestoration/>
      {contextHolder}
      <Header
        routs={routs}
        LogoSvg={LogoSvg}/>
      <Outlet/>
      <Footer
        routs={routs}
        LogoSvg={LogoSvg}/>
    </>
  )
}
