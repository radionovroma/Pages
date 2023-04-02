import { FC } from "react";
import classNames from "classnames";

interface BookLoaderProps {
  placeholder: string;
}

export const BookLoader: FC<BookLoaderProps> = ({placeholder}) => {
  return (
    <div>
      <div className={classNames("h-[334px] w-[222px]", placeholder)}></div>
      <div className={classNames("mt-15 w-90 h-[28px]", placeholder)}></div>
      <div className="h-[80px] mt-10 ">
        <div className={classNames("h-[25px]", placeholder)}></div>
        <div className={classNames("mt-[5px] h-[22px]", placeholder)}></div>
      </div>
      <div className="flex gap-10 mt-10">
        <div className={classNames("w-[162px] h-50", placeholder)}></div>
        <div className={classNames("w-50 h-50", placeholder)}></div>
      </div>
    </div>
  );
}
