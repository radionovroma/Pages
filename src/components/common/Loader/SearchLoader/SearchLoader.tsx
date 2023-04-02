import { FC, Fragment } from "react";
import classNames from "classnames";

interface SearchLoaderProps {
  placeholder: string;
}

export const SearchLoader: FC<SearchLoaderProps> = ({placeholder}) => {
  const searchedBookLoader =
    <div className="flex gap-10 w-full p-15 border-b border-blue animate-pulse">
      <div className={classNames("w-[100px] h-[150px]", placeholder)}></div>
      <div className="flex flex-col gap-[8px] w-[210px] py-[3px]">
        <div className={classNames("w-full h-[22px]", placeholder)}></div>
        <div className={classNames("w-1/2 h-[18px]", placeholder)}></div>
        <div className={classNames("w-1/3 h-[22px]", placeholder)}></div>
      </div>
    </div>
  const searchedBookListLoader = new Array(3);
  searchedBookListLoader.fill(searchedBookLoader);

  return (
    <div className="absolute left-0 z-20 flex flex-col w-[350px] bg-white shadow-2xl cursor-default">
      {
        searchedBookListLoader.map((item, index) => (
          <Fragment key={index}>
            {item}
          </Fragment>
        ))
      }
    </div>
  )
}
