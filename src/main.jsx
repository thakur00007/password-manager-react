import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/store.js";

import Errorpage from "./components/Error/Errorpage.jsx";
import Login from "./components/Login/Login.jsx";
import Loading from './components/Loading.jsx';
import GeneratePassword from "./components/GeneratePassword/GeneratePassword.jsx"
import { Dashboard, SavePassword, Signup } from './components/';

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
      <Route path="loading" element={<Loading />} />
      <Route path="register" element={<Signup />} />
      <Route path="save-password" element={<SavePassword />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
