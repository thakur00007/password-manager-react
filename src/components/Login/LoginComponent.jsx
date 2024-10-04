import React, { useState } from "react";
import { Alert, Button, Input } from "../index";
import { set, useForm } from "react-hook-form";
import UserService from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { login, logout } from "../../store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function LoginComponent() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const { coppiedPassword } = useSelector((state) => state.coppiedPassword);
  const navigate = useNavigate();

  const userLogin = async (data) => {
    new UserService()
      .userLogin(data)
      .then((res) => {
        dispatch(login(res.data.loggedInUser));
        coppiedPassword ? navigate("/save-password") : navigate("/");
        setMessage(res.message);
        setTimeout(() => {
          setMessage("");
        }, 6000);
      })
      .catch((err) => {
        setError(err.message);
        setTimeout(() => {
          setError("");
        }, 6000);
      });
  };

  return (
    <>
      {/* <Alert /> */}
      {message && <Alert type="S" message={message} />}
      {error && <Alert type="E" message={error} />}
      <div className="container mx-auto flex justify-center items-center mt-20">
        <div className="dark:bg-[#2e3345] bg-[#c3d7ff] sm:w-[28rem] w-80  p-3 px-2 sm:px-8 sm:py-10 backdrop-blur-3xl rounded-xl shadow-[10px_10px_20px_8px_rgba(0,0,0,0.3)]">
          {/* {error && (
            <div className="bg-red-500 text-white p-2 mb-3 rounded-lg">
              {error}
            </div>
          )} */}
          <h1 className="text-4xl text-center font-bold mb-8">Login</h1>
          <form onSubmit={handleSubmit(userLogin)}>
            <Input
              label="Email: "
              type="text"
              placeholder="eg: example@company.com"
              className="mb-2 focus-visible:outline-0 ring-inset focus-visible:border-1 focus-visible:border-[#c3d7ff] dark:focus-visible:border-[#2e3345] border border-gray-500 focus-visible:ring-2 ring-gray-500 dark:ring-[#c3d7ff]"
              {...register("email", {
                required: true,
                // validate: {
                //   matchPatern: (value) =>
                //     !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                //     "Email address must be a valid address",
                // },
                // pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              })}
            />
            <Input
              label="password: "
              type="password"
              placeholder="eg: Abcdefg@12345678"
              className="mb-2 focus-visible:outline-0 ring-inset focus-visible:border-1 focus-visible:border-[#c3d7ff] dark:focus-visible:border-[#2e3345] border border-gray-500 focus-visible:ring-2 ring-gray-500 dark:ring-[#c3d7ff]"
              {...register("password", {
                required: true,
                // validate: {
                //   matchPatern: (value) =>
                //     !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{14,}$/.test(
                //       value
                //     ) | !"Email address must be a valid address",
                // },
                // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{14,}$/,
              })}
            />
            <div className="flex justify-center mb-5">
              <Button
                type="submit"
                className="h-10 py-2 px-6 hover:bg-[#5c93fd] active:ring-2  dark:active:ring-[#2e3345] ring-[#c3d7ff] bg-[#3f7fff] dark:bg-gray-100 dark:hover:bg-gray-300 dark:text-gray-900 text-gray-100"
              >
                Login
              </Button>
            </div>
          </form>
          <Link className="px-5" to="/register">
            Create an account
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
