import { FC } from "react";

interface PageBannerProps {
  heading: string;
}

export const PageBanner: FC<PageBannerProps> = ({heading}) => {
  return (
    <section className="flex justify-center w-full py-50 bg-blue">
      <h1 className="relative pb-20 font-serif font-bold text-5xl leading-[55px] text-white
              after:absolute after:bottom-0 after:left-1/2 after:-translate-x-2/4 after:w-[55px] after:h-[2px] after:bg-yellow">
        {heading}
      </h1>
    </section>
  );
}
