import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@router";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@store/store";
import { Dropdown } from "antd";
import { getUserAuthFlag, getUserName, actions } from "@store/user";
import { Search } from "./Search";
import { DropdownMenu } from "./DropdownMenu";
import { NavRoute } from "@types";
import CartSvg from "@img/cartIcon.svg";
import ProfileSvg from "@img/profileIcon.svg";
import "./styles.module.scss";

interface HeaderProps {
  routs: NavRoute[];
  LogoSvg: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const Header: FC<HeaderProps> = ({ routs, LogoSvg }) => {
  const isUserAuth = useSelector(getUserAuthFlag);
  const userName = useSelector(getUserName);
  const dispatch = useAppDispatch();

  const svgHoverStyles = "cursor-pointer header-svg-stroke";

  const signOutHandler = () => {
    dispatch(actions.signOut());
    dispatch(actions.removeUserFromLocalStorage());
  }

  return (
    <header className="flex justify-center w-full pt-20 bg-blue">
      <div className="flex justify-between items-start w-cont">
        <Link
          to={ROUTES.MAIN}
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
            <Search/>
            {
              !isUserAuth &&
              <div
                className="flex items-center gap-15 font-sans text-2xl text-center text-white capitalize cursor-default">
                <Link
                  to={ROUTES.LOGIN}
                  className="flex justify-center items-center w-[70px] h-full text-lg leading-5 hover:text-yellow cursor-pointer">
                  Sign In
                </Link>
                /
                <Link
                  to={ROUTES.REGISTRATION}
                  className="flex justify-center items-center w-[70px] h-full text-lg leading-5 hover:text-yellow cursor-pointer">
                  Sign Up
                </Link>
              </div>
            }
            {
              isUserAuth &&
              <>
                <Link to={ROUTES.CART}>
                  <CartSvg className={svgHoverStyles}/>
                </Link>
                <Dropdown
                  menu={{
                    items:
                      [
                        {
                          key: "1",
                          label: (<button onClick={signOutHandler}>Sign Out</button>)
                        },
                      ]
                  }}
                  className="group">
                  <Link
                    to={ROUTES.PROFILE}
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
