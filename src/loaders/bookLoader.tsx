import classNames from "classnames";
import { pulse } from "./pulse";

export const bookLoader =
  <div>
    <div className={classNames("h-[334px] w-[222px]", pulse)}></div>
    <div className={classNames("mt-15 w-90 h-[28px]", pulse)}></div>
    <div className="h-[80px] mt-10 ">
      <div className={classNames("h-[25px]", pulse)}></div>
      <div className={classNames("mt-[5px] h-[22px]", pulse)}></div>
    </div>
    <div className="flex gap-10 mt-10">
      <div className={classNames("w-[162px] h-50", pulse)}></div>
      <div className={classNames("w-50 h-50", pulse)}></div>
    </div>
  </div>
