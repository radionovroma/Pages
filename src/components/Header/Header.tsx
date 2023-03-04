import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import classNames from "classnames";
import { DropdownMenu, InputWithIcon } from "@common";
import { fetchCategoriesList, getCategoriesList, getCategoriesStatus } from "@store/categories";
import { LOAD_STATUSES, NavRoute } from "@types";
import SearchSvg from "@img/search-icon.svg";
import CartSvg from "@img/cart-icon.svg";
import ProfileSvg from "@img/profile-icon.svg";

interface HeaderProps {
  routs: NavRoute[];
  LogoSvg: React.FC<React.SVGProps<SVGSVGElement>>;
}
export const Header:FC<HeaderProps> = ({ routs, LogoSvg }) => {
  const categoriesList = useSelector(getCategoriesList);
  const categoriesStatus = useSelector(getCategoriesStatus);
  const dispatch = useDispatch();

  const svgHoverStyles = "cursor-pointer header-svg-stroke";
  const navLinkStyles = "flex justify-center w-110 pt-10 font-sans text-lg leading-5 text-center text-white capitalize cursor-pointer hover:text-yellow";

  useEffect(() => {
    dispatch(fetchCategoriesList() as any);
  }, [])

  return (
    <header className="flex justify-center w-full pt-20 bg-blue">
      <div className="flex justify-between items-start w-cont">
        <a
          href="./"
          className="cursor-pointer">
          <LogoSvg/>
        </a>
        <div className="flex gap-30">
          <nav className="flex justify-end w-660">
            {
              routs.map((item) => {
                if (item.id === 'books' && categoriesStatus === LOAD_STATUSES.LOADED) {
                  return (
                    <div key={item.id} className="flex">
                      <DropdownMenu
                        mainRoute={item}
                        dropdownList={categoriesList}
                        mainRouteStyles={classNames(navLinkStyles, "before:top-[17px] before:right-[6px] before:bg-white before:hover:bg-yellow",
                          "after:top-[17px] after:right-0 after:bg-white after:hover:bg-yellow")}
                        dropdownWrapStyles="top-[64px] left-0 justify-center w-full bg-blue"
                        dropdownListStyles=" flex flex-col flex-wrap align-center content-between w-cont h-[184px] py-20"
                        dropdownItemStyles="flex w-230 h-[36px]"
                        dropdownItemLinkStyles="flex-auto flex items-center
                      font-sans text-base leading-4 text-center text-white capitalize
                      cursor-pointer
                      hover:text-yellow"/>
                    </div>
                  )
                }
                return (
                  <a
                    key={item.id}
                    href={item.route}
                    className={navLinkStyles}>
                    {item.label}
                  </a>
                )
              })
            }
          </nav>
          <div className="flex gap-30 pb-20 justify-end">
            <InputWithIcon
              img={<SearchSvg/>}
              placeholder="Try an author name or a book title"
              wrapStyles="group flex items-center gap-10 w-350 px-5 pb-5 border-b border-b-white cursor-text hover:border-b-yellow header-svg-stroke"
              inputStyles="flex-1 h-30 bg-blue caret-white font-sans text-lg text-white outline-0 group-hover:placeholder:text-yellow"
            />
            <a href="">
              <CartSvg className={svgHoverStyles}/>
            </a>
            <a href="">
              <ProfileSvg className={svgHoverStyles}/>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

