import { FC } from "react";
import { PageBanner } from "@common";
import { ErrorBlock } from "@components";

export const ErrorPage: FC = () => {
  return (
    <main>
      <PageBanner heading="Page not found"/>
      <ErrorBlock/>
    </main>
  )
}
