import { FC } from "react";
import { PageBanner } from "@common";
import { Catalog, NewsletterBlock } from "@components";

export const CatalogPage: FC = () => {
  return (
    <main>
      <PageBanner
        heading="Catalog"/>
      <Catalog/>
      <NewsletterBlock/>
    </main>
  );
}
