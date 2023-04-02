import { FC } from "react";
import { LoginBlock } from "@components";
import { PageBanner } from "@common";

export const LoginPage: FC = () => {
  return (
    <main>
      <PageBanner heading="Login"/>
      <LoginBlock/>
    </main>
  );
}
