import React from "react";
import {
  ArrowRightStartOnRectangleIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authSlice";

function Header() {
  const { status, loggedInUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
    <>
      <div className="w-full flex py-4 border-b-2 border-gray-100">
        <div className="w-1/5">
          <Link
            to="/"
            className="text-sm font-semibold leading-6 flex justify-center"
          >
            <HomeIcon className="h-6 w-6 text-gray-900 dark:text-gray-100" />
          </Link>
        </div>

        <div className="w-3/5 flex justify-center">
          <nav className="flex justify-center">
            {navUrl.map((nav) =>
              nav.auth ? (
                <NavLink
                  to={nav.url}
                  className={({ isActive }) =>
                    `text-sm font-semibold leading-6 ms-5 ${
                      isActive ? "text-blue-500" : ""
                    }`
                  }
                >
                  {nav.name}
                </NavLink>
              ) : (
                ""
              )
            )}
          </nav>
        </div>

        <div className="w-1/5 flex justify-end">
          {status ? (
            <div className="w-32 flex">
              <span className="text-base font-semibold leading-6">
                {loggedInUser.username}
              </span>
              <span onClick={(e) => dispatch(logout())} title="logout">
                <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-gray-900 dark:text-gray-100 cursor-pointer ms-5" />
              </span>
            </div>
          ) : (
            <div className="w-32">
              <Link to="/login" className="text-sm font-semibold leading-6">
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
