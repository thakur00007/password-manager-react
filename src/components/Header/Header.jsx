import React from "react";
import { HomeIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header() {
  const { status, loggedInUser } = useSelector((state) => state.auth);

  const navUrl = [
    { name: "Home", url: "/", auth: true },
    { name: "Generate Password", url: "/", auth: true },
    { name: "Save Password", url: "/save-password", auth: status },
    { name: "Dashboard", url: "/dashboard", auth: status },
    { name: "Privacy Policy", url: "/privacy-policy", auth: true },
  ];

  const location = useLocation();

  return (
    <Disclosure
      as="nav"
      className="relative bg-white border-b shadow-sm dark:bg-gray-900"
    >
      {({ open, close }) => (
        <>
          {/* HEADER */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Left - Mobile Menu Toggle */}
              <div className="flex items-center md:hidden">
                <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </DisclosureButton>
              </div>

              {/* Center - Logo */}
              <div className="hidden md:flex justify-center md:justify-start">
                <Link to="/" className="flex items-center">
                  <HomeIcon className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                </Link>
              </div>

              {/* Right - UserMenu / Login */}
              <div className="flex items-center md:hidden">
                {status ? (
                  <UserMenu userName={loggedInUser.username} />
                ) : (
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-100"
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex md:items-center md:space-x-6">
                {navUrl.map(
                  (item, index) =>
                    index !== 0 && // Skip Home link in desktop nav
                    item.auth && (
                      <NavLink
                        key={item.name}
                        to={item.url}
                        className={({ isActive }) =>
                          classNames(
                            "text-sm font-semibold",
                            isActive
                              ? "text-blue-500"
                              : "text-gray-700 dark:text-gray-300"
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    )
                )}
              </div>

              {/* Desktop Right */}
              <div className="hidden md:flex md:items-center">
                {status ? (
                  <UserMenu userName={loggedInUser.username} />
                ) : location.pathname === "/login" ? (
                  <Link
                    to="/register"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-100"
                  >
                    Signup <span aria-hidden="true">&rarr;</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-100"
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Nav Panel */}
          <DisclosurePanel className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900 z-50 shadow-md px-4 pb-3 space-y-2">
            {navUrl.map(
              (item) =>
                item.auth && (
                  <NavLink
                    onClick={close}
                    key={item.name}
                    to={item.url}
                    className={({ isActive }) =>
                      classNames(
                        "block text-sm font-medium py-2",
                        isActive
                          ? "text-blue-500"
                          : "text-gray-700 dark:text-gray-200"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                )
            )}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

export default Header;
