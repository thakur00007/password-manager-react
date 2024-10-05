import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/store.js";

import {
  AuthLayout,
  Dashboard,
  Errorpage,
  ChangePassword,
  UpdateProfile,
} from "./components/";
import { Home, Login, Signup, SavePassword, UserAccount } from "./pages/";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
      errorElement={
        <>
          <Errorpage />
        </>
      }
    >
      <Route
        path="/"
        element={
          <AuthLayout authenicated={false}>
            <Home />
          </AuthLayout>
        }
      />
      <Route
        path="login"
        element={
          <AuthLayout authenicated={false}>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="register"
        element={
          <AuthLayout authenicated={false}>
            <Signup />
          </AuthLayout>
        }
      />

      <Route
        path="save-password"
        element={
          <AuthLayout>
            <SavePassword />
          </AuthLayout>
        }
      />
      <Route
        path="dashboard"
        element={
          <AuthLayout>
            <Dashboard />
          </AuthLayout>
        }
      />
      <Route
        path="user"
        element={
          <AuthLayout>
            <UserAccount />
          </AuthLayout>
        }
      >
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="update-profile" element={<UpdateProfile />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
