import React, { useState } from "react";
import { Alert, Button, Input } from "../index";
import { useForm } from "react-hook-form";
import UserService from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function SignupComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coppiedPassword } = useSelector((state) => state.coppiedPassword);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const password = watch("password");

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 6000);
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 6000);
  };

  const userSignup = async (data) => {
    new UserService()
      .userSignup(data)
      .then((res) => {
        dispatch(login(res.data.loggedInUser));
        coppiedPassword ? navigate("/save-password") : navigate("/");
        showMessage(res.message);
      })
      .catch((err) => showError(err.message));
  };

  return (
    <>
      {message && <Alert type="S" message={message} />}
      {error && <Alert type="E" message={error} />}

      <div className="flex justify-center items-start px-4 pt-16 sm:pt-24">
        <div className="w-full max-w-md bg-white dark:bg-[#2e3345] p-6 sm:p-8 rounded-xl shadow-xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Registration
          </h1>

          <form onSubmit={handleSubmit(userSignup)} className="space-y-5">
            {/* Username */}
            <div>
              <Input
                label="Username"
                placeholder="e.g. Your Name"
                {...register("username", { required: "Username is required" })}
                className="w-full h-10 px-3 bg-gray-100 text-gray-900 rounded-md"
              />
              {errors.username && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Input
                label="Email"
                placeholder="e.g. example@domain.com"
                {...register("email", {
                  required: "Email is required",
                  validate: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Enter a valid email address",
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
                placeholder="e.g. Abc@123456"
                {...register("password", {
                  required: "Password is required",
                  validate: (value) =>
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                      value
                    ) ||
                    "Password must contain at least 8 characters, a number, uppercase & lowercase letter",
                })}
                className="w-full h-10 px-3 bg-gray-100 text-gray-900 rounded-md"
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Retype password"
                {...register("cnfPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full h-10 px-3 bg-gray-100 text-gray-900 rounded-md"
              />
              {errors.cnfPassword && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.cnfPassword.message}
                </p>
              )}
            </div>
            {/* Privacy Policy */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="privacyPolicy"
                {...register("privacyPolicy", {
                  required: "You must accept the Privacy Policy",
                })}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="privacyPolicy"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                I accept the{" "}
                <Link
                  to="/privacy-policy"
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  Privacy Policy
                </Link>
              </label>
              {errors.privacyPolicy && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.privacyPolicy.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md dark:bg-blue-400 dark:text-gray-900 dark:hover:bg-blue-300 transition"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>

          <p className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 underline ml-1"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignupComponent;
