import i18n from "i18next";

import { initReactI18next } from "react-i18next";

import HttpApi from "i18next-http-backend";

import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
    ns: ["sidebar", "calendar", "dashboard"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
