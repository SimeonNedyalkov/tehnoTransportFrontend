import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { SettingsProvider } from "./tehnoApp/SettingsProvider.tsx";
import "./i18n.ts";
import { UserProvider } from "./tools/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ChakraProvider value={defaultSystem}>
      <SettingsProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </SettingsProvider>
    </ChakraProvider>
  </BrowserRouter>
  /* </React.StrictMode> */
);
