import { FC } from "react";
import { PageBanner } from "@common";
import { BookBlock, FeaturesBlock } from "@components";

export const BookPage: FC = () => {
  return (
    <main>
      <PageBanner heading="Catalog"/>
      <BookBlock/>
      <FeaturesBlock/>
    </main>
  );
}
