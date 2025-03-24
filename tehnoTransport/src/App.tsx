import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./tehnoApp/Dashboard";
import Sidebar from "./tehnoApp/Sidebar";
import Login from "./user/Login";
import Customers from "./tehnoApp/Customers";
import Navigation from "./tehnoApp/Navigation";
import Settings from "./tehnoApp/Settings";
import Reports from "./tehnoApp/Reports";
import useAuth from "./hooks/useAuth";
import UserSettings from "./tehnoApp/userSettings";

function Layout() {
  const { isAuthenticated } = useAuth();
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
            element={isAuthenticated ? <Dashboard /> : <Login />}
          />
          <Route
            path="customers"
            element={isAuthenticated ? <Customers /> : <Login />}
          />
          <Route
            path="reports"
            element={isAuthenticated ? <Reports /> : <Login />}
          />
          <Route
            path="settings"
            element={isAuthenticated ? <Settings /> : <Login />}
          />
          <Route
            path="userSettings"
            element={isAuthenticated ? <UserSettings /> : <Login />}
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

        {/* app routes  */}
        <Route path="app/*" element={<Layout />} />

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Routes>
    </>
  );
}

export default App;
