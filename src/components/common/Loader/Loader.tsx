import { FC } from "react"
import { BannerBookLoader } from "./BannerBookLoader";
import { BookBlockLoader} from "./BookBlockLoader";
import { SortPanelLoader } from "./SortPanelLoader";
import { CatalogLoader } from "./CatalogLoader";
import { PopularCategoriesLoader } from "./PopularCategoriesLoader";
import { SearchLoader } from "./SearchLoader";
import { FavoritesLoader } from "./FavoritesLoader";
import classNames from "classnames";

interface LoaderProps {
  type: string;
  itemsCount?: number
}

export const Loader: FC<LoaderProps> = ({type, itemsCount= 1}) => {
  const placeholder = "bg-lightGray rounded";

  if (type === "bannerBook") return <BannerBookLoader placeholder="bg-lightBlue rounded opacity-10"/>;
  if (type === "bookBlock") return <BookBlockLoader placeholder={placeholder}/>;
  if (type === "sortPanel") return <SortPanelLoader placeholder={placeholder}/>;
  if (type === "filterForm") return (
    <div
      className={classNames("sticky row-start-2 row-span-1 top-20 self-start p-20 border border-lightGray mb-[52px]" +
        "flex-col gap-20 h-[840px] border-0 animate-pulse", placeholder)}>
    </div>
  );
  if (type === "catalog") return <CatalogLoader placeholder={placeholder} itemsCount={itemsCount}/>;
  if (type === "popularCategories") return <PopularCategoriesLoader placeholder={placeholder} itemsCount={itemsCount}/>;
  if (type === "search") return <SearchLoader placeholder={placeholder}/>;
  if (type === "favorites" ) return <FavoritesLoader placeholder={placeholder}/>;

  return null;
}
