import { FC } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesList, getCategoriesList, getCategoriesStatus } from "@store/categories";
import { fetchPopularCategories, getPopularCategoriesList, getPopularCategoriesStatus } from "@store/popularCategories";
import { BannerSwiper, CategorySwiper, Footer, Header, BannerBlock, NewsletterBlock } from "@components";
import { LOAD_STATUSES, NavRoute } from "@types";
import LogoSvg from "@img/logo.svg";

export const MainPage: FC = () => {
  const categoriesList = useSelector(getCategoriesList);
  const categoriesStatus = useSelector(getCategoriesStatus);
  const popularCategoriesList = useSelector(getPopularCategoriesList);
  const popularCategoriesStatus = useSelector(getPopularCategoriesStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesList() as any);
    dispatch(fetchPopularCategories() as any);
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
        <div className="flex flex-col gap-65 items-center my-90">
          {
            popularCategoriesStatus === LOAD_STATUSES.LOADED &&
            popularCategoriesList.map(({category, books}) => {
              return <CategorySwiper key={category.id} category={category} books={books}/>
            })
          }
        </div>
        <BannerBlock/>
        <NewsletterBlock/>
      </main>
      <Footer routs={routs} LogoSvg={LogoSvg}/>
    </div>
  );
}
