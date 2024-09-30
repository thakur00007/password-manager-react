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
  SavePassword,
  Signup,
  Login,
  Errorpage,
  GeneratePassword,
} from "./components/";

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
      <Route path="" element={<GeneratePassword />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Signup />} />

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
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
