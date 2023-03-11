import { FC } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesList, getCategoriesList, getCategoriesStatus } from "@store/categories";
import { BannerSwiper, PopularCategories, Footer, Header, BannerBlock, NewsletterBlock } from "@components";
import { NavRoute } from "@types";
import LogoSvg from "@img/logo.svg";

export const MainPage: FC = () => {
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
    <div className="App">
      <Header
        routs={routs}
        LogoSvg={LogoSvg}
      />
      <main>
        <BannerSwiper/>
        <PopularCategories/>
        <BannerBlock/>
        <NewsletterBlock/>
      </main>
      <Footer
        routs={routs}
        LogoSvg={LogoSvg}/>
    </div>
  );
}
