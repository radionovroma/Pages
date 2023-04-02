import { FC } from "react";
import { BookLoader } from "../BookLoader";

interface CatalogLoaderProps {
  placeholder: string;
  itemsCount: number;
}

export const CatalogLoader: FC<CatalogLoaderProps> = ({placeholder, itemsCount}) => {
  const booksListLoader = new Array(itemsCount);

  booksListLoader.fill(<BookLoader placeholder={placeholder}/>);

  return (
    <div className="grid grid-cols-4 pl-20 gap-30 animate-pulse">
      {
        booksListLoader.map((item, index) => (
          <div key={index}>
            {item}
          </div>
        ))
      }
    </div>
  );
}
