import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useNotification } from "@hooks";
import { fetchCategoriesList, getCategoriesList, getCategoriesStatus } from "@store/categories";
import { actions } from "@store/user";
import { Footer, Header } from "@components";
import { NavRoute } from "@types";
import LogoSvg from "@img/logo.svg";

export const App: FC = () => {
  const categoriesList = useSelector(getCategoriesList);
  const categoriesStatus = useSelector(getCategoriesStatus);
  const dispatch = useDispatch();
  const { contextHolder } = useNotification();

  useEffect(() => {
    dispatch(fetchCategoriesList() as any);
  }, []);

  useEffect(() => {
    const { name, login, token } = JSON.parse(localStorage.getItem("user") || '{}');
    if (token && login) {
      dispatch(actions.signIn({ name, login, token }) as any);
    }
  }, [])

  const routs: NavRoute[] = [
    { label: "Home", id: "home", path: "/", },
    {
      label: "Catalog",
      id: "catalog",
      path: "/catalog",
      dropdownList: { list: categoriesList, status: categoriesStatus }
    },
    { label: "Blog", id: "blog", path: "./blog" },
    { label: "Contacts", id: "contacts", path: "./contacts" },
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
