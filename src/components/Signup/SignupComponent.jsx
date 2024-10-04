import React, { useState } from "react";
import { Alert, Button, Input } from "../index";
import { useForm } from "react-hook-form";
import UserService from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function SignupComponent() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const { coppiedPassword } = useSelector((state) => state.coppiedPassword);

  const password = watch("password", "");

  const navigate = useNavigate();
  const userSignup = async (data) => {
    new UserService()
      .userSignup(data)
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
      {message && <Alert type="S" message={message} />}
      {error && <Alert type="E" message={error} />}
      <div className="container mx-auto flex justify-center items-center">
        <div className="dark:bg-[#2e3345] bg-[#c3d7ff] sm:w-[28rem] w-80  p-3 px-2 sm:px-8 sm:py-10 backdrop-blur-3xl rounded-xl shadow-[10px_10px_20px_8px_rgba(0,0,0,0.3)]">
          <h1 className="text-4xl text-center font-bold mb-8">Registration</h1>
          <form onSubmit={handleSubmit(userSignup)}>
            <Input
              label="Username: "
              type="text"
              placeholder="eg: Your Name"
              className="mb-2 focus-visible:outline-0 ring-inset focus-visible:border-1 focus-visible:border-[#c3d7ff] dark:focus-visible:border-[#2e3345] border border-gray-500 focus-visible:ring-2 ring-gray-500 dark:ring-[#c3d7ff]"
              {...register("username", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              type="text"
              placeholder="eg: example@company.com"
              className="mb-2 focus-visible:outline-0 ring-inset focus-visible:border-1 focus-visible:border-[#c3d7ff] dark:focus-visible:border-[#2e3345] border border-gray-500 focus-visible:ring-2 ring-gray-500 dark:ring-[#c3d7ff]"
              error={errors.email && errors.email.message}
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="password: "
              type="password"
              placeholder="eg: Abcdefg@12345678"
              className="mb-2 focus-visible:outline-0 ring-inset focus-visible:border-1 focus-visible:border-[#c3d7ff] dark:focus-visible:border-[#2e3345] border border-gray-500 focus-visible:ring-2 ring-gray-500 dark:ring-[#c3d7ff]"
              error={errors.password && errors.password.message}
              {...register("password", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(
                      value
                    ) || "Password must be a valid password",
                },
              })}
            />
            <Input
              label="Confirm Password: "
              type="password"
              placeholder="eg: retype password"
              className="mb-2 focus-visible:outline-0 ring-inset focus-visible:border-1 focus-visible:border-[#c3d7ff] dark:focus-visible:border-[#2e3345] border border-gray-500 focus-visible:ring-2 ring-gray-500 dark:ring-[#c3d7ff]"
              error={errors.cnfPassword && errors.cnfPassword.message}
              {...register("cnfPassword", {
                required: true,
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <div className="flex justify-center mb-5">
              <Button
                type="submit"
                className="h-10 py-2 px-6 hover:bg-[#5c93fd] active:ring-2  dark:active:ring-[#2e3345] ring-[#c3d7ff] bg-[#3f7fff] dark:bg-gray-100 dark:hover:bg-gray-300 dark:text-gray-900 text-gray-100"
              >
                Register
              </Button>
            </div>
          </form>
          Already have an account?{" "}
          <Link className="ps-1" to="/login">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignupComponent;
