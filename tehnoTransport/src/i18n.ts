import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en",
    resources: {
      en: {
        translation: {
          name: "Tehno Transport",
        },
      },
      bg: {
        translation: {
          name: "Техно Транспорт",
        },
      },
    },
  });
