import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import userService from "./services/userService";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/auth/authSlice";
import { Header, Loading } from "./components";


function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    userService.getCurrentUser()
    .then((res) => {
      if(res) {
        dispatch(login(res));
      } else {
        dispatch(logout());
      }
    })
    .catch((err) => {
      // alert("err")
      dispatch(logout());
    })
    .finally(() => setLoading(false));
  }
  , []);
  return (
    <>
      {loading ? (<Loading />) : (
        <>
        {authStatus ? (<Header />) : ""}
        <Outlet />
        </>
      )}
      
    </>
  );
}

export default App;