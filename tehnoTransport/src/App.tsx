import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./tehnoApp/Dashboard";
import Sidebar from "./tehnoApp/Sidebar";
import Login from "./user/Login";
import Customers from "./tehnoApp/Customers";
import Navigation from "./tehnoApp/Navigation";
import Settings from "./tehnoApp/Settings";
import Reports from "./tehnoApp/Reports";
import useAuth from "./hooks/useAuth";
import UserSettings from "./tehnoApp/userSettings/UserSettingss";
import ForgotPassword from "./user/ForgotPassword";
import SmsLogs from "./tehnoApp/SmsLogs";
import UserProfile from "./tehnoApp/userSettings/UserProfile";
import useGetCustomer from "./hooks/useGetCustomer";

function Layout() {
  const { isAuthenticated } = useAuth();
  const customers = useGetCustomer();
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex-1">
        <div className="adminIcon">
          <Navigation />
        </div>
        <Routes>
          <Route
            path="dashboard"
            element={
              isAuthenticated ? <Dashboard customers={customers} /> : <Login />
            }
          />
          <Route
            path="customers"
            element={
              isAuthenticated ? <Customers DATA={customers} /> : <Login />
            }
          />
          <Route
            path="reports"
            element={isAuthenticated ? <Reports DATA={customers} /> : <Login />}
          />
          <Route
            path="settings"
            element={isAuthenticated ? <Settings /> : <Login />}
          />
          <Route
            path="sms_logs"
            element={isAuthenticated ? <SmsLogs /> : <Login />}
          />
          <Route
            path="userSettings"
            element={isAuthenticated ? <UserSettings /> : <Login />}
          />
          <Route
            path="userProfile"
            element={isAuthenticated ? <UserProfile /> : <Login />}
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Routes>
        {/* user routes*/}
        <Route path="/" element={<Login />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        {/* app routes  */}
        <Route path="app/*" element={<Layout />} />

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Routes>
    </>
  );
}

export default App;
