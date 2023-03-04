import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { makeServer } from "@mock";
import "./styles/index.scss";

makeServer();

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(<App/>);
