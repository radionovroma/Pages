import { FC } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { LOAD_STATUSES, NavRoute } from "@types";

interface DropdownMenuProps {
  route: NavRoute;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ route }) => {
  const arrow = (route.dropdownList?.status === LOAD_STATUSES.LOADED) ?
    "before:absolute before:top-[18px] before:right-[6px] before:w-10 before:h-[2px] before:rotate-45 before:bg-white before:hover:bg-yellow " +
    "after:absolute after:top-[18px] after:right-0 after:w-10 after:h-[2px] after:rotate-315  after:bg-white after:hover:bg-yellow" :
    "";

  return (
    <div className="group flex justify-center w-120">
      <Link
        to={route.path}
        className={classNames("relative flex items-center px-25 font-sans text-lg leading-5 text-center text-white capitalize cursor-pointer hover:text-yellow", arrow)}>
        {route.label}
      </Link>
      {
        route.dropdownList?.status === LOAD_STATUSES.LOADED &&
        <div
          className="hidden absolute z-10 group-hover:flex shadow-2xl top-[58px] left-0 justify-center w-full bg-blue">
          <ul className="flex flex-wrap gap-x-[125px] align-center content-between w-cont py-10">
            {
              route.dropdownList.list.map((item) => (
                <li
                  key={item.id}
                  className="flex w-230 h-[36px]">
                  <Link
                    to={`${route.path}/${item.type}`}
                    className="flex-auto flex items-center
                    font-sans text-base leading-4 text-center text-white capitalize
                    cursor-pointer hover:text-yellow">
                    {item.label}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  );
}
