import { FC } from "react";
import { RegistrationBlock } from "@components";
import { PageBanner } from "@common";

export const RegistrationPage: FC = () => {
  return (
    <main>
      <PageBanner heading="Registration"/>
      <RegistrationBlock/>
    </main>
  );
}
