import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Home, Car, Users, FileText, Settings } from "lucide-react";

export default function Sidebar() {
  //   const navigate = useNavigate();
  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Vehicles", icon: Car, path: "/vehicles" },
    { name: "Customers", icon: Users, path: "/customers" },
    { name: "Reports", icon: FileText, path: "/reports" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

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
            <div key={item.name} className="menu-item">
              <item.icon className="menu-icon" />
              {item.name}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
