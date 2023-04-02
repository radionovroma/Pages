import { FC, Fragment } from "react";
import classNames from "classnames";

interface FavoritesLoaderProps {
  placeholder: string;
}

export const FavoritesLoader: FC<FavoritesLoaderProps> = ({placeholder}) => {
  const rowLoader = <div className={classNames("h-20", placeholder)}></div>
  const favorites = new Array(4).fill(rowLoader);

  return (
    <div className="flex flex-col gap-[11px] w-full mt-[5px] animate-pulse">
      {
        favorites.map((item, index) =>
          <Fragment key={index}>
            {item}
          </Fragment>
        )
      }
    </div>
  )
}
