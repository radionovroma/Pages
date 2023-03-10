import { FC } from "react";
import classNames from "classnames";
import { Book, Category, LOAD_STATUSES } from "@types";
import { CategorySwiper } from "./CategorySwiper";

interface PopularCategoriesProps {
  popularCategories: { category: Category, books: Book[] }[];
  status: LOAD_STATUSES;
}

export const PopularCategories: FC<PopularCategoriesProps> = ({ popularCategories, status }) => {
  const pulse = "bg-lightGray rounded";

  const bookLoader =
    <div>
      <div className={classNames("h-350 w-[234px]", pulse)}></div>
      <div className={classNames("mt-15 w-90 h-[28px]", pulse)}></div>
      <div className="h-[80px] mt-10 ">
        <div className={classNames("h-[25px]", pulse)}></div>
        <div className={classNames("mt-[5px] h-[22px]", pulse)}></div>
      </div>
      <div className="flex gap-10 mt-10">
        <div className={classNames("w-[170px] h-50", pulse)}></div>
        <div className={classNames("w-50 h-50", pulse)}></div>
      </div>
    </div>

  const booksListLoader = new Array(5);
  booksListLoader.fill(bookLoader);

  const categoryLoader =
    <div className="w-cont animate-pulse">
      <div className="w-300 h-[40px] bg-lightGray rounded"></div>
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
        (status === LOAD_STATUSES.UNKNOWN || status === LOAD_STATUSES.LOADING) &&
        popularCategoriesLoader.map((item,index) => (
          <div key={index}>
            { item }
          </div>
        ))
      }
      {
        status === LOAD_STATUSES.LOADED &&
        popularCategories.map(({ category, books }) => {
          return <CategorySwiper key={category.id} category={category} books={books}/>
        })
      }
    </section>
  );
}
