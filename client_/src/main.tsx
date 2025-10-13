import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "../i18n/i18n-config.ts";
import i18n from "../i18n/i18n-config.ts";

import dayjs from "dayjs";
import "dayjs/locale/es";
import "dayjs/locale/en";

i18n.on("languageChanged", () => {
  dayjs.locale(i18n.language);
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
