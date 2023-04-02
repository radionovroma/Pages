import { FC } from "react";
import classNames from "classnames";

interface SortPanelLoaderProps {
  placeholder: string;
}

export const SortPanelLoader: FC<SortPanelLoaderProps> = ({placeholder}) => {
  return (
    <div className="flex grow justify-end gap-20 pt-2 col-start-2 pt-20 pb-[24px] animate-pulse">
      <div className={classNames("w-[277px] h-[32px]", placeholder)}></div>
      <div className={classNames("w-[132px] h-[32px]", placeholder)}></div>
    </div>
  )
}
