import { FC, useEffect } from "react";
import classNames from "classnames";
import { LOAD_STATUSES } from "@types";
import { CategorySwiper } from "./CategorySwiper";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularCategories, getPopularCategoriesList, getPopularCategoriesStatus } from "@store/popularCategories";
import { bookLoader, pulse } from "@loaders";

export const PopularCategories: FC = () => {
  const popularCategoriesList = useSelector(getPopularCategoriesList);
  const popularCategoriesStatus = useSelector(getPopularCategoriesStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularCategories() as any);
  }, []);

  const booksListLoader = new Array(5);
  booksListLoader.fill(bookLoader);

  const categoryLoader =
    <div className="w-cont animate-pulse">
      <div className={classNames("w-300 h-[40px] bg-lightGray rounded", pulse)}></div>
      <div className="flex gap-[32px] mt-[16px]">
        {
          booksListLoader.map((item, index) => (
            <div key={index}>
              {item}
            </div>
          ))
        }
      </div>
    </div>

  const popularCategoriesLoader = new Array(2);
  popularCategoriesLoader.fill(categoryLoader);

  return (
    <section className="flex flex-col gap-65 items-center my-90">
      {
        (popularCategoriesStatus === LOAD_STATUSES.UNKNOWN || popularCategoriesStatus === LOAD_STATUSES.LOADING) &&
        popularCategoriesLoader.map((item,index) => (
          <div key={index}>
            { item }
          </div>
        ))
      }
      {
        popularCategoriesStatus === LOAD_STATUSES.LOADED &&
        popularCategoriesList.map(({ category, books }) => {
          return <CategorySwiper key={category.id} category={category} books={books}/>
        })
      }
    </section>
  );
}
