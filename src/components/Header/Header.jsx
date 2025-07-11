import React from "react";
import { HomeIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Disclosure, DisclosurePanel, DisclosureButton } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header() {
  const { status, loggedInUser } = useSelector((state) => state.auth);

  const navUrl = [
    {
      name: "Generate Password",
      url: "/",
      auth: true,
    },
    {
      name: "Save Password",
      url: "/save-password",
      auth: status,
    },
    {
      name: "Dashboard",
      url: "/dashboard",
      auth: status,
    },
  ];

  return (
    <Disclosure
      as="nav"
      className="bg-white border-b shadow-sm dark:bg-gray-900"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Left: Home Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <HomeIcon className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                </Link>
              </div>

              {/* Center: Navigation */}
              <div className="hidden md:flex md:space-x-6 md:items-center">
                {navUrl.map(
                  (item) =>
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

              {/* Right: User/Login */}
              <div className="flex items-center">
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

              {/* Mobile Menu Button */}
              <div className="flex items-center md:hidden">
                <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Mobile Menu Items */}
          <DisclosurePanel className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900 z-50 shadow-md px-4 pb-3 space-y-2">
            {navUrl.map(
              (item) =>
                item.auth && (
                  <NavLink
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
            {!status && (
              <Link
                to="/login"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Log in &rarr;
              </Link>
            )}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

export default Header;
