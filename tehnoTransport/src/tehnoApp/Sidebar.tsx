import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Car,
  Users,
  FileText,
  Settings,
  ArrowBigLeft,
  ArrowBigRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSpring, animated } from "@react-spring/web";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: t("dashboard"), icon: Home, path: "/app/dashboard" },
    { name: t("customers"), icon: Users, path: "/app/customers" },
    { name: t("reports"), icon: Car, path: "/app/reports" },
    { name: t("sms_logs"), icon: FileText, path: "/app/sms_logs" },
    { name: t("settings"), icon: Settings, path: "/app/settings" },
  ];

  const goTo = (p: string) => {
    navigate(p);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarAnimation = useSpring({
    width: isOpen
      ? windowWidth <= 768
        ? "40vw"
        : "15vw"
      : windowWidth <= 768
      ? "7vw"
      : "1vw",
  });

  const textAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    delay: 300,
  });

  const menuItemAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    delay: 300,
  });

  const buttonRotation = useSpring({
    transform: isOpen ? "rotate(0deg)" : "rotate(360deg)",
  });

  return (
    <div
      className="app-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <animated.div className="sidebar" style={sidebarAnimation}>
        {isOpen && (
          <animated.h2 className="sidebar-title" style={textAnimation}>
            <span>{t("name").split(" ")[0]}</span>
            <br />
            <span>{t("name").split(" ")[1]}</span>
          </animated.h2>
        )}
        <nav>
          {isOpen &&
            menuItems.map((item) => (
              <animated.div
                key={item.name}
                className="menu-item"
                style={menuItemAnimation}
                onClick={() => goTo(item.path)}
              >
                <item.icon className="menu-icon" />
                <span className="menu-text">{item.name}</span>
              </animated.div>
            ))}
        </nav>
        <animated.button
          className="toggle-btn"
          onClick={toggleSidebar}
          style={buttonRotation}
        >
          {isOpen ? (
            <ArrowBigLeft color="#8C8C8C" />
          ) : (
            <ArrowBigRight color="#8C8C8C" />
          )}
        </animated.button>
      </animated.div>
    </div>
  );
}
