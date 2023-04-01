import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getSearchList, getSearchListCount, getSearchListStatus } from "@store/search";
import { SearchInput } from "./SearchInput";
import { BookCover } from "@common";
import { LOAD_STATUSES } from "@types";
import { pulse } from "@loaders";
import classNames from "classnames";

export const Search: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchRequest, setSearchRequest] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const location = useLocation();
  const searchList = useSelector(getSearchList);
  const searchListCount = useSelector(getSearchListCount);
  const searchListStatus = useSelector(getSearchListStatus);

  useEffect(() => {
    setSearchRequest(searchValue);
  }, [searchList]);

  useEffect(() => {
    if (isSearchActive) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "16px";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }
  }, [isSearchActive]);

  const clickHandler = useCallback((e: MouseEvent) => {
    if ( isSearchActive ) {
      // @ts-ignore
      const withinBoundaries = e.composedPath().includes(document.getElementById("backdrop"));
      if (withinBoundaries) {
        setIsSearchActive(false);
      }
    }
  }, [isSearchActive]);

  useEffect(() => {
    document.addEventListener('click', clickHandler);
    return (() => document.removeEventListener("click", clickHandler));
  }, [clickHandler]);

  useEffect(() => {
    setIsSearchActive(false);
  }, [location])

  return (
    <>
      {
        isSearchActive &&
        <div
          id="backdrop"
          className="absolute top-0 right-0 z-20 w-[100vw] h-[100vh] bg-black/30">
        </div>
      }
      <div
        className="relative z-30">
        <SearchInput
          value={searchValue}
          isSearchActive={isSearchActive}
          onChange={setSearchValue}
          onFocusChange={() => setIsSearchActive(!isSearchActive)}/>
        {((searchListStatus === LOAD_STATUSES.LOADING || (searchListStatus === LOAD_STATUSES.UNKNOWN && searchValue )) && isSearchActive) &&
          <div className="absolute left-0 z-20 flex flex-col w-[350px] bg-white shadow-2xl cursor-default">
            <div className="flex gap-10 w-full p-15 border-b border-blue">
              <div className={classNames("w-[100px] h-[150px]", pulse)}></div>
              <div className="flex flex-col gap-[8px] w-[210px] py-[3px]">
                <div className={classNames("w-full h-[22px]", pulse)}></div>
                <div className={classNames("w-1/2 h-[18px]", pulse)}></div>
                <div className={classNames("w-1/3 h-[22px]", pulse)}></div>
              </div>
            </div>
            <div className="flex gap-10 w-full p-15 border-b border-blue">
              <div className={classNames("w-[100px] h-[150px]", pulse)}></div>
              <div className="flex flex-col gap-[8px] w-[210px] py-[3px]">
                <div className={classNames("w-full h-[22px]", pulse)}></div>
                <div className={classNames("w-1/2 h-[18px]", pulse)}></div>
                <div className={classNames("w-1/3 h-[22px]", pulse)}></div>
              </div>
            </div>
            <div className="flex gap-10 w-full p-15">
              <div className={classNames("w-[100px] h-[150px]", pulse)}></div>
              <div className="flex flex-col gap-[8px] w-[210px] py-[3px]">
                <div className={classNames("w-full h-[22px]", pulse)}></div>
                <div className={classNames("w-1/2 h-[18px]", pulse)}></div>
                <div className={classNames("w-1/3 h-[22px]", pulse)}></div>
              </div>
            </div>
          </div>
        }
        {
          (searchListStatus === LOAD_STATUSES.LOADED && searchListCount > 0 && isSearchActive) &&
          <ul className="absolute flex flex-col w-[350px] left-0 z-10 bg-white shadow-xl">
            {
              searchList.slice(0,3).map(({id, img, title, authors, price}) => {
                return(
                  <li
                    key={id}
                    className="border-b border-b-blue last:border-0 hover:bg-lightBlue/30">
                    <Link
                      to={`/book/${id}`}
                      className="flex gap-10 p-15">
                      <BookCover
                        coverImg={img}
                        alt={`Cover of the book "${title}"`}
                        className="w-[100px] h-[150px]"/>
                      <div
                        className="flex flex-col gap-[5px]">
                        <h3
                          className="font-serif font-bold text-lg text-blue line-clamp-2">
                          {title}
                        </h3>
                        <p
                          className="font-sans text-gray">
                          {authors.join(",")}
                        </p>
                        <p
                          className="font-sans text-lg text-yellow">
                          {`$${price}`}
                        </p>
                      </div>
                    </Link>
                  </li>
                )
              })
            }
            {
              searchListCount >= 3 &&
              <li>
                <Link
                  to="./catalog" state={{text: searchRequest}}
                  className="flex justify-center p-15 font-sans text-gray hover:bg-lightBlue/30 hover:text-blue">
                  {`Found ${searchListCount} items for "${searchRequest}", view other`}
                </Link>
              </li>
            }
          </ul>
        }
        {
          (searchListStatus === LOAD_STATUSES.UNKNOWN && !searchValue && isSearchActive) &&
          <div className="absolute left-0 z-20 flex w-[350px] bg-white shadow-2xl cursor-default">
            <p className="w-full p-15 font-sans text-gray text-center">
              Try an author name or a book title
            </p>
          </div>
        }
        {
          (searchListStatus === LOAD_STATUSES.LOADED && searchListCount === 0 && isSearchActive) &&
          <div className="absolute left-0 z-20 flex w-[350px] bg-white shadow-2xl cursor-default">
            <p className="w-full p-15 font-sans text-gray text-center">
              {`No results found for "${searchRequest}"`}
            </p>
          </div>
        }
        {(searchListStatus === LOAD_STATUSES.ERROR && isSearchActive) &&
          <div className="absolute left-0 z-20 flex w-[350px] bg-white shadow-2xl cursor-default">
            <p className="w-full p-15 font-sans text-gray text-center">
              An error occurred, please try again later
            </p>
          </div>
        }
      </div>
    </>
  );
}
