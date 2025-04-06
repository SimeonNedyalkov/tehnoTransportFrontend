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
          dashboard: "Dashboard",
          customers: "Customers",
          reports: "Reports",
          sms_logs: "SMS logs",
          settings: "Settings",
          dueSoon: "Due Soon",
          upcoming: "Upcoming Tests",
          valid: "Have Tehno Test",
          overdue: "Overdue",
          expired: "Expired",
          dashboardText: "Customers with Upcoming Tests",
          dName: "Name",
          dStatus: "Status",
          dNextTehnoDate: "Next Test Date",
          statusUpcoming: "Upcoming",
          statusDueSoon: "Due Soon",
          statusValid: "Have Tehno Test",
          statusOverdue: "Overdue",
          statusExpired: "Expired",
        },
      },
      bg: {
        translation: {
          name: "Техно Транспорт",
          dashboard: "Табло",
          customers: "Клиенти",
          reports: "Доклади",
          sms_logs: "SMS доклади",
          settings: "Настройки",
          dueSoon: "Очакват се скоро",
          upcoming: "Предстоящи",
          valid: "Имат ГТП",
          overdue: "Просрочени",
          expired: "Изтекли",
          dashboardText: "Клиенти с предстоящи тестове",
          dName: "Име",
          dStatus: "Статус",
          dNextTehnoDate: "Дата на следващ ГТП",
          statusUpcoming: "Предстоящи",
          statusDueSoon: "Очакват се скоро",
          statusValid: "Имат ГТП",
          statusOverdue: "Просрочени",
          statusExpired: "Изтекли",
        },
      },
    },
  });
