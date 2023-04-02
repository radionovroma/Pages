import { FC } from "react"
import classNames from "classnames";

interface BannerBooksLoaderProps {
  placeholder: string;
}

export const BannerBookLoader: FC<BannerBooksLoaderProps> = ({placeholder}) => {
  return (
    <div className="w-cont flex justify-center items-center gap-65 pt-50 pb-90 animate-pulse">
      <div className="w-660">
        <div className={classNames("w-[330px] h-[64px] mt-[4px]", placeholder)}></div>
        <div className={classNames("w-230 h-[28px] mt-10", placeholder)}></div>
        <div className={classNames("h-[72px] mt-35", placeholder)}></div>
        <div className="flex gap-35 mt-35">
          <div className={classNames("w-230 h-50", placeholder)}></div>
          <div className={classNames("w-230 h-50", placeholder)}></div>
        </div>
        <div className="flex justify-between mt-35">
          <div className="w-[160px]">
            <div className={classNames("h-[32px]", placeholder)}></div>
            <div className={classNames("h-[32px] mt-[5px]", placeholder)}></div>
          </div>
          <div className="w-[160px]">
            <div className={classNames("h-[32px]", placeholder)}></div>
            <div className={classNames("h-[32px] mt-[5px]", placeholder)}></div>
          </div>
          <div className="w-[160px]">
            <div className={classNames("h-[32px]", placeholder)}></div>
            <div className={classNames("h-[32px] mt-[5px]", placeholder)}></div>
          </div>
        </div>
      </div>
      <div className={classNames("h-[500px] w-[335px]", placeholder)}></div>
    </div>
  );
}
