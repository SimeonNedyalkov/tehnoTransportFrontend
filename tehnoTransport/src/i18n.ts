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
          saveAllBTN: "Save All",
          addNewBTN: "Add new",
          page: "Page",
          of: "of",
          searchPlaceholder: "Search",
          filters: "Filters",
          filterBy: "Filter By:",
          tHeaderBrand: "Brand",
          tHeaderModel: "Model",
          tHeaderRegNumb: "Registration Number",
          tHeaderFirstName: "First Name",
          tHeaderPhoneNumber: "Phone number",
          tHeaderStatus: "Status",
          tHeaderLastTehnoTest: "Last tehno test",
          tHeaderActions: "Actions",
          tPeopleToSendSms: "People to send sms",
          selectAll: "Select All",
          sendToAppBTN: "Send To App",
          sender: "Sender:",
          receiver: "Receiver:",
          searchHere: "Search here",
          hSender: "Sender",
          hReceiver: "Receiver",
          hDateofSms: "Date of Sms",
          choseTheme: "Choose theme:",
          switchLabel: "Switch to {{theme}} mode",
          themeLight: "light",
          themeDark: "dark",
          choseLanguage: "Change Language:",
          bulgarian: "Bulgarian",
          english: "English",
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
          saveAllBTN: "Запази",
          addNewBTN: "Добави нов",
          page: "Страница",
          of: "от",
          searchPlaceholder: "Търсене",
          filters: "Филтри",
          filterBy: "Филтрирай по:",
          tHeaderBrand: "Марка",
          tHeaderModel: "Модел",
          tHeaderRegNumb: "Рег. номер",
          tHeaderFirstName: "Собствено име",
          tHeaderPhoneNumber: "Телефонен номер",
          tHeaderStatus: "Статус",
          tHeaderLastTehnoTest: "Последен ГТП",
          tHeaderActions: "Действия",
          tPeopleToSendSms: "Хора за изпращане на sms",
          selectAll: "Избери всички",
          sendToAppBTN: "Изпрати в приложение",
          sender: "Изпращач:",
          receiver: "Получател:",
          searchHere: "Търси тук",
          hSender: "Изпращач",
          hReceiver: "Получател",
          hDateofSms: "Дата на СМС",
          choseTheme: "Избери тема:",
          switchLabel: "Превключване към {{theme}} режим",
          themeLight: "светъл",
          themeDark: "тъмен",
          choseLanguage: "Избери език:",
          bulgarian: "Български",
          english: "Английски",
        },
      },
    },
  });
