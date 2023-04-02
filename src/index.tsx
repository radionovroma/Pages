import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { makeServer } from "@mock";
import { store } from "@store/store"
import { NotificationProvider } from "@components";
import { Router } from "@router";
import "./index.scss";

makeServer();

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <Provider store={store}>
      <NotificationProvider>
        <Router/>
      </NotificationProvider>
    </Provider>
  );
