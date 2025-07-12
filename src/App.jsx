import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import UserService from "./services/userService";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/auth/authSlice";
import { Header, Loading } from "./components";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    setLoading(true);
    new UserService()
      .getCurrentUser()
      .then((res) => {
        if (res.data.loggedInUser) {
          dispatch(login(res.data.loggedInUser));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        // alert("err")
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [authStatus]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </>
  );
}

export default App;
