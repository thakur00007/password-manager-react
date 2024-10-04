import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading } from "./";

function AuthLayout({ authenicated = true, children }) {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (authenicated && authStatus !== authenicated) {
      navigate("/login");
    }
    // else if (!authenicated && authStatus !== authenicated) {
    //   navigate("/");
    // }
    setLoading(false);
  }, [authenicated, authStatus, navigate]);

  return <>{loading ? <Loading /> : children}</>;
}

export default AuthLayout;
