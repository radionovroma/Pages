import { FC, useEffect } from "react";
import { LOAD_STATUSES } from "@types";
import { CategorySwiper } from "./CategorySwiper";
import { Loader } from "@common";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@store/store";
import { fetchPopularCategories, getPopularCategoriesList, getPopularCategoriesStatus } from "@store/popularCategories";

export const PopularCategories: FC = () => {
  const popularCategoriesList = useSelector(getPopularCategoriesList);
  const popularCategoriesStatus = useSelector(getPopularCategoriesStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPopularCategories());
  }, []);

  return (
    <section className="flex flex-col gap-65 items-center my-90">
      {
        (popularCategoriesStatus === LOAD_STATUSES.UNKNOWN || popularCategoriesStatus === LOAD_STATUSES.LOADING) &&
        <Loader type="popularCategories" itemsCount={2}/>
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
