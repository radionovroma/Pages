import { FC } from "react";
import classNames from "classnames";
import { LOAD_STATUSES, NavRoute } from "@types";

interface DropdownMenuProps {
  route: NavRoute;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ route }) => {
  const arrow = (route.dropdownList?.status === LOAD_STATUSES.LOADED) ?
    "before:absolute before:top-[20px] before:right-[6px] before:w-10 before:h-[2px] before:rotate-45 before:bg-white before:hover:bg-yellow " +
    "after:absolute after:top-[20px] after:right-0 after:w-10 after:h-[2px] after:rotate-315  after:bg-white after:hover:bg-yellow" :
    "";

  return (
    <div className="group flex justify-center w-120">
      <a
        href={route.path}
        className={ classNames("relative pt-10 px-25 font-sans text-lg leading-5 text-center text-white capitalize cursor-pointer hover:text-yellow", arrow)}>
        {route.label}
      </a>
      {
        route.dropdownList?.status === LOAD_STATUSES.LOADED &&
        <div
          className="hidden absolute z-10 group-hover:flex shadow-2xl top-[64px] left-0 justify-center w-full bg-blue">
          <ul className="flex flex-wrap gap-x-[125px] align-center content-between w-cont py-20">
            {
              route.dropdownList.list.map((item) => (
                <li
                  key={item.id}
                  className="flex w-230 h-[36px]">
                  <a
                    href={`${route.path}/${item.type}`}
                    className="flex-auto flex items-center
                    font-sans text-base leading-4 text-center text-white capitalize
                    cursor-pointer hover:text-yellow">
                    {item.label}
                  </a>
                </li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  );
}
