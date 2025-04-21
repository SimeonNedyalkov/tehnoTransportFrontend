import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../tools/UserContext";
import { useTranslation } from "react-i18next";
import oldPerson from "../assets/photo-1472099645785-5658abf4ff4e.avif";
import { useEffect, useState } from "react";

export default function Navigation() {
  const { user } = useUser();
  const navigation = useNavigate();
  const LOGOUTURL = "https://tehno-transport-b.onrender.com/user/logout";
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState(false);
  const handleLogout = async () => {
    try {
      const response = await fetch(LOGOUTURL, {
        method: "POST",
        credentials: "include",
      });

      if (response.status == 200) {
        console.log("User logged out successfully!");
        navigation("/");
      } else {
        console.log(`${response.status} -- Logout failed`);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  useEffect(() => {
    setIsDark(document.body.classList.contains("dark"));
  }, []);
  console.log(user);
  return (
    <Menu as="div" className="fixed top-4 right-4 z-50">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">{t("openUserMenu")}</span>
          <img
            alt="User"
            src={user?.photoURL || oldPerson}
            className="size-8 rounded-full"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <MenuItem>
          <Link
            to="/app/userProfile"
            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
          >
            {t("yourProfile")}
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to="/app/userSettings"
            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
          >
            {t("settings")}
          </Link>
        </MenuItem>
        <MenuItem>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
            onClick={handleLogout}
          >
            {t("signOut")}
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
