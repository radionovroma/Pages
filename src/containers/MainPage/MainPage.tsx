import { FC } from "react";
import { BannerSwiper, PopularCategories, BannerBlock, NewsletterBlock } from "@components";

export const MainPage: FC = () => {
  return (
    <main>
      <BannerSwiper/>
      <PopularCategories/>
      <BannerBlock/>
      <NewsletterBlock/>
    </main>
  );
}
