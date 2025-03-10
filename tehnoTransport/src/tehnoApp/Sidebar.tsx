import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Car, Users, FileText, Settings } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/app/dashboard" },
    { name: "Customers", icon: Users, path: "/app/customers" },
    { name: "Reports", icon: FileText, path: "/app/reports" },
    { name: "Vehicles", icon: Car, path: "/app/vehicles" },
    { name: "Settings", icon: Settings, path: "/app/settings" },
  ];
  function goTo(p: string) {
    navigate(p);
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2 className="sidebar-title">
          <span>Tehno</span>
          <br />
          <span>Transport</span>
        </h2>
        <nav>
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="menu-item"
              onClick={() => goTo(item.path)}
            >
              <item.icon className="menu-icon" />
              {item.name}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
