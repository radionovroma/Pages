import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesList, getCategoriesList, getCategoriesStatus } from "@store/categories";
import { MainPage } from "@containers";
import { Footer, Header } from "@components";
import { NavRoute } from "@types";
import LogoSvg from "@img/logo.svg";

export const App: FC = () => {
  const categoriesList = useSelector(getCategoriesList);
  const categoriesStatus = useSelector(getCategoriesStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesList() as any);
  }, []);

  const routs: NavRoute[] = [
    { label: "Home", id: "home", path: "./",  },
    { label: "Catalog", id: "catalog", path: "./catalog", dropdownList: { list: categoriesList, status: categoriesStatus } },
    { label: "Blog", id: "blog", path: "./blog" },
    { label: "Contacts", id: "contacts", path: "./contacts" },
  ];

  return (
    <>
      <Header
        routs={routs}
        LogoSvg={LogoSvg}/>
      <MainPage/>
      <Footer
        routs={routs}
        LogoSvg={LogoSvg}/>
    </>
  )
}
