import { FC } from "react";
import { BookLoader } from "../BookLoader";
import classNames from "classnames";
interface PopularCategoriesLoaderProps {
  placeholder: string;
  itemsCount: number;
}

export const PopularCategoriesLoader: FC<PopularCategoriesLoaderProps> = ({placeholder, itemsCount}) => {
  const booksListLoader = new Array(5);
  booksListLoader.fill(<BookLoader placeholder={placeholder}/>);

  const categoryLoader =
    <div className="w-cont animate-pulse">
      <div className={classNames("w-300 h-[40px] bg-lightGray rounded", placeholder)}></div>
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

  const popularCategories = new Array(itemsCount);
  popularCategories.fill(categoryLoader);

  return (
    <>
      {
        popularCategories.map((item,index) => (
          <div key={index}>
            { item }
          </div>
        ))
      }
    </>
  );
}
