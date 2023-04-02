import { FC, Fragment } from "react";
import classNames from "classnames";

interface BookBlockLoaderProps {
  placeholder: string;
}

export const BookBlockLoader: FC<BookBlockLoaderProps> = ({placeholder}) => {
  const tableRowLoader = <div className={classNames("w-[385px] h-30", placeholder)}></div>;
  const tableLoader =
    <div className="flex flex-col gap-[12px] py-[6px]">
      {
        new Array(4).fill(tableRowLoader).map((item, index) =>
          <Fragment key={index}>
            { item }
          </Fragment>
        )
      }
    </div>

  const paragraphFirstRowLoader = <div className={classNames("ml-40 h-[18px]", placeholder)}></div>;
  const paragraphRowLoader = <div className={classNames("h-[18px]", placeholder)}></div>;
  const paragraphLoader =
    <div className="flex flex-col gap-10 py-[5px]">
      {
        new Array(4).fill(paragraphFirstRowLoader, 0, 1).fill(paragraphRowLoader, 1).map((item, index) => (
          <Fragment key={index}>
            {item}
          </Fragment>
        ))
      }
    </div>;

  const descriptionLoader =
    <div className="flex flex-col gap-10 animate-pulse">
      {
        new Array(2).fill(paragraphLoader).map((item, index) =>
          <Fragment key={index}>
            { item }
          </Fragment>
        )
      }
    </div>;

  return (
    <div className="flex flex-col gap-50">
      <div className="w-cont flex gap-[100px]">
        <div className="flex justify-center items-center w-600 h-660 bg-lightGray/30">
          <div className={classNames("w-[340px] h-[510px] animate-pulse", placeholder)}></div>
        </div>
        <div className="flex flex-col justify-center gap-20 w-600 animate-pulse">
          <div className="flex flex-col gap-[12px] py-[3px]">
            <div className={classNames("w-300 h-30", placeholder)}></div>
            <div className={classNames("w-[150px] h-20", placeholder)}></div>
            <div className={classNames("w-[150px] h-30", placeholder)}></div>
          </div>
          { tableLoader }
          <div className="flex gap-20">
            <div className={classNames("w-300 h-65", placeholder)}></div>
            <div className={classNames("w-65 h-65", placeholder)}></div>
          </div>
        </div>
      </div>
      { descriptionLoader }
    </div>
  );
}
