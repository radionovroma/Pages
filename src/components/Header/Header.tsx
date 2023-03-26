import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "antd";
import { getUserAuthFlag, getUserName, actions } from "@store/user";
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

export const Header: FC<HeaderProps> = ({ routs, LogoSvg }) => {
  const isUserAuth = useSelector(getUserAuthFlag);
  const userName = useSelector(getUserName);
  const dispatch = useDispatch();

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
          <nav className="flex justify-end">
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
          <div className="flex gap-30 justify-end">
            <InputWithIcon
              img={<SearchSvg/>}
              placeholder="Try an author name or a book title"
              wrapStyles="group flex items-center gap-10 w-[330px] px-5 pb-5 border-b border-b-white cursor-text hover:border-b-yellow header-svg-stroke"
              inputStyles="flex-1 h-[37px] bg-blue caret-white font-sans text-lg text-white outline-0 group-hover:placeholder:text-yellow"
            />
            {
              !isUserAuth &&
              <div
                className="flex items-center gap-15 font-sans text-2xl text-center text-white capitalize cursor-default">
                <Link
                  to="/login"
                  className="flex justify-center items-center w-[70px] h-full text-lg leading-5 hover:text-yellow cursor-pointer">
                  Sign In
                </Link>
                /
                <Link
                  to="/registration"
                  className="flex justify-center items-center w-[70px] h-full text-lg leading-5 hover:text-yellow cursor-pointer">
                  Sign Up
                </Link>
              </div>
            }
            {
              isUserAuth &&
              <>
                <Link to="/cart">
                  <CartSvg className={svgHoverStyles}/>
                </Link>
                <Dropdown
                  menu={{
                    items:
                      [
                        {
                          key: "1",
                          label: (<button onClick={() => dispatch(actions.signOut() as any)}>Sign Out</button>)
                        },
                      ]
                  }}
                  className="group">
                  <Link
                    to="/profile"
                    className="flex items-center gap-15 text-lg leading-5 text-white user-profile-link">
                    <ProfileSvg/>
                    <span className="group-hover:text-yellow">
                    {userName}
                  </span>
                  </Link>
                </Dropdown>
              </>
            }
          </div>
        </div>
      </div>
    </header>
  );
}

