import { FC } from "react";
import classNames from "classnames";
import { NavRoute, Category } from "@types";

interface DropdownMenuProps {
  mainRoute: NavRoute;
  dropdownList: Category[];
  mainRouteStyles: string;
  dropdownWrapStyles: string;
  dropdownListStyles: string;
  dropdownItemStyles: string;
  dropdownItemLinkStyles: string;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
  mainRoute,
  dropdownList,
  mainRouteStyles,
  dropdownWrapStyles,
  dropdownListStyles,
  dropdownItemStyles,
  dropdownItemLinkStyles
  }) => {

  return (
    <div className="group flex">
      <a
        href={mainRoute.route}
        className={classNames(mainRouteStyles, "relative",
          "before:absolute before:rotate-45 before:w-[10px] before:h-[2px]",
          "after:absolute after:rotate-315 after:w-[10px] after:h-[2px]")}>
        {mainRoute.label}
      </a>
      <div
        className={classNames("hidden absolute group-hover:flex", dropdownWrapStyles)}>
        <ul className={dropdownListStyles}>
          {
            dropdownList.map((item) => (
              <li
                key={item.id}
                className={dropdownItemStyles}>
                <a
                  href={`${mainRoute.route}/${item.type}`}
                  className={dropdownItemLinkStyles}>
                  {item.label}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}
