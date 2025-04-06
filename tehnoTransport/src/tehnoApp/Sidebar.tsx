import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Car, Users, FileText, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const menuItems = [
    { name: t("dashboard"), icon: Home, path: "/app/dashboard" },
    { name: t("customers"), icon: Users, path: "/app/customers" },
    { name: t("reports"), icon: Car, path: "/app/reports" },
    { name: t("sms_logs"), icon: FileText, path: "/app/sms_logs" },
    { name: t("settings"), icon: Settings, path: "/app/settings" },
  ];
  function goTo(p: string) {
    navigate(p);
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2 className="sidebar-title">
          <span>{t("name").split(" ")[0]}</span>
          <br />
          <span>{t("name").split(" ")[1]}</span>
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
