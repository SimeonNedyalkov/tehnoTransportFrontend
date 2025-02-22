import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./tehnoApp/Dashboard";
import Sidebar from "./tehnoApp/Sidebar";
import Login from "./user/Login";
import Customers from "./tehnoApp/Customers";

function Layout() {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex-1">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
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
