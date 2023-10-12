import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router";
import "./index.css";
import "uno.css";
import ModalRender from "@components/Modal";
import { ToastRender } from "@components/Toast";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastRender />
    <ModalRender />
    <AppRouter />
  </React.StrictMode>
);
