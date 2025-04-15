import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../tools/UserContext";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
interface User {
  photoURL?: string;
  name?: string;
  email?: string;
}
export default function Navigation() {
  // const [user, setUser] = useState<User>({});
  const { user, loading } = useUser();
  const navigation = useNavigate();
  const USERURL = "http://localhost:3000/user/getUser";
  const LOGOUTURL = "http://localhost:3000/user/logout";
  const handleLogout = async () => {
    try {
      const response = await fetch(LOGOUTURL, {
        method: "POST",
        credentials: "include", // Ensures cookies are sent
      });

      if (response.status == 200) {
        console.log("User logged out successfully!");
        navigation("/"); // Redirect to login page
      } else {
        console.log(`${response.status} -- Logout failed`);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  // useEffect(() => {
  //   const getUser = async () => {
  //     const loggedUser = await fetch(USERURL, {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     const userData = await loggedUser.json();
  //     setUser(userData);
  //   };
  //   getUser();
  // }, []);
  console.log(user);
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img
            alt="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            src={
              user?.photoURL ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
            className="size-8 rounded-full"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <MenuItem>
          <Link
            to="/app/userProfile"
            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
          >
            Your Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to="/app/userSettings"
            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
          >
            Settings
          </Link>
        </MenuItem>
        <MenuItem>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
            onClick={handleLogout}
          >
            Sign out
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
