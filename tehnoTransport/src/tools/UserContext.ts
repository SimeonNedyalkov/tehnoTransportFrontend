import { createContext } from "react";

const UserContext = createContext({
  authToken: "",
  refreshToken: "",
  isAuthenticated: false,
  changeAuthState: () => null,
});

export default UserContext;
