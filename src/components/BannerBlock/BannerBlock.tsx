import { FC } from "react";
import { Link } from "react-router-dom";
import img from "@img/banner.png";

export const BannerBlock: FC = () => {
  return (
    <section className="flex justify-center py-35 w-full bg-blue">
      <div className="flex justify-between w-cont">
        <div className="flex flex-col justify-center gap-30">
          <h2
            className="relative pb-20 font-serif font-bold text-5xl text-white capitalize cursor-default
            after:absolute after:bottom-0 after:left-0 after:w-50 after:h-[2px] after:bg-yellow">
            Get book today!
          </h2>
          <p
            className="font-sans text-lg text-lightBlue leading-8 cursor-default">
            Welcome to Pages! We have several thousand titles and free delivery. Looking for your new favourite book? Browse some of our top categories.
          </p>
          <Link
            to="/catalog"
            preventScrollReset={false}
            className="flex justify-center items-center w-230 h-50 border border-yellow font-serif font-bold text-lg text-white hover:bg-yellow hover:text-blue">
            View our catalog
          </Link>
        </div>
        <img src={img} alt=""/>
      </div>
    </section>
  );
}
