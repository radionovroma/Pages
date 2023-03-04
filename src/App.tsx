import { Header } from "@components";
import { NavRoute } from "@types";
import LogoSvg from "@img/logo.svg";

export const App = () => {

  const routs: NavRoute[] = [
    { label: "Home", id: "home", route: "./",  },
    { label: "Books", id: "books", route: "./books" },
    { label: "Blog", id: "blog", route: "./blog" },
    { label: "Contacts", id: "contacts", route: "./contacts" },
  ];

  return (
    <div className="App">
      <Header
        routs={routs}
        LogoSvg={LogoSvg}
      />
    </div>
  );
}
