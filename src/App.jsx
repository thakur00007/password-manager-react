import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import UserService from "./services/userService";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/auth/authSlice";
import { Header, Loading, Footer } from "./components";

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
          <div className="min-h-[calc(100vh-4rem-1px)] flex flex-col">
            <Outlet />
            <div className="flex-grow"></div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default App;
