import React, { FC } from "react";
import { Link } from "react-router-dom";
import { InputWithIcon } from "./InputWithIcon";
import { DropdownMenu } from "./DropdownMenu";
import { NavRoute } from "@types";
import SearchSvg from "@img/search-icon.svg";
import CartSvg from "@img/cart-icon.svg";
import ProfileSvg from "@img/profile-icon.svg";

interface HeaderProps {
  routs: NavRoute[];
  LogoSvg: React.FC<React.SVGProps<SVGSVGElement>>;
}
export const Header:FC<HeaderProps> = ({ routs, LogoSvg }) => {
  const svgHoverStyles = "cursor-pointer header-svg-stroke";

  return (
    <header className="flex justify-center w-full pt-20 bg-blue">
      <div className="flex justify-between items-start w-cont">
        <Link
          to="/"
          className="relative z-20 cursor-pointer">
          <LogoSvg/>
        </Link>
        <div className="flex gap-30">
          <nav className="flex justify-end w-660">
            {
              routs.map((item) => {
                return (
                  <DropdownMenu
                    key={item.id}
                    route={item}/>
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
            <Link to="/cart">
              <CartSvg className={svgHoverStyles}/>
            </Link>
            <Link to="/profile">
              <ProfileSvg className={svgHoverStyles}/>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

