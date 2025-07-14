import React, { useState } from "react";
import { Alert, Button, Input } from "../index";
import { useForm } from "react-hook-form";
import UserService from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

function LoginComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coppiedPassword } = useSelector((state) => state.coppiedPassword);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (data) => {
    if (!executeRecaptcha) {
      setError("Recaptcha not ready");
      return;
    }
    const recaptchaToken = await executeRecaptcha("login");
    new UserService()
      .userLogin(data, recaptchaToken)
      .then((res) => {
        dispatch(login(res.data.loggedInUser));
        coppiedPassword ? navigate("/save-password") : navigate("/");
        setMessage(res.message);
        setTimeout(() => setMessage(""), 6000);
      })
      .catch((err) => {
        setError(err.message);
        setTimeout(() => setError(""), 6000);
      });
  };

  return (
    <>
      {message && <Alert type="S" message={message} />}
      {error && <Alert type="E" message={error} />}

      <div className="flex justify-center items-start px-4 pt-24">
        <div className="w-full max-w-md bg-white dark:bg-[#2e3345] p-6 sm:p-8 rounded-xl shadow-xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Login
          </h1>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            {/* Email */}
            <div>
              <Input
                label="Email"
                type="email"
                placeholder="e.g. user@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full h-10 px-3 bg-gray-100 text-gray-900 rounded-md"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Your secure password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full h-10 px-3 bg-gray-100 text-gray-900 rounded-md"
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md dark:bg-blue-400 dark:text-gray-900 dark:hover:bg-blue-300 transition"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>

          <p className="text-center mt-6 text-sm text-gray-700 dark:text-gray-300">
            Don’t have an account?
            <Link
              to="/register"
              className="ml-1 text-blue-600 dark:text-blue-400 underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
