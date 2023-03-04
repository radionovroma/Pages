import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./App";
import { makeServer } from "@mock";
import { store } from "@store/store"
import "./styles/index.scss";

makeServer();

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <Provider store={store}>
      <App/>
    </Provider>
  );
