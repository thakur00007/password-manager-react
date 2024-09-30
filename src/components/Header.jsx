import React from "react";
import {
  ArrowRightStartOnRectangleIcon,
  UserCircleIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authSlice";

function Header() {
  const { status, loggedInUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      <div className="w-full flex py-4 border-b-2 border-gray-100">
        {status ? (
          <>
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
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-sm font-semibold leading-6 ${
                      isActive ? "text-blue-500" : ""
                    }`
                  }
                >
                  Generate Password
                </NavLink>
                <NavLink
                  to="/save-password"
                  className={({ isActive }) =>
                    `text-sm font-semibold leading-6 ms-5 ${
                      isActive ? "text-blue-500" : ""
                    }`
                  }
                >
                  Save Password
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-sm font-semibold leading-6 ms-5 ${
                      isActive ? "text-blue-500" : ""
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </nav>
            </div>

            <div className="w-1/5 flex justify-end">
              <div className="w-32 flex">
                <span className="text-base font-semibold leading-6">
                  {loggedInUser.username}
                </span>
                <span onClick={(e) => dispatch(logout())} title="logout">
                  <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-gray-900 dark:text-gray-100 cursor-pointer ms-5" />
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="w-32">
            <Link to="/login" className="text-sm font-semibold leading-6">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
