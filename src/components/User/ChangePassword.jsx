import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../";
import { useSelector } from "react-redux";
import UserService from "../../services/userService";
import { Alert } from "../";

function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const { loggedInUser } = useSelector((state) => state.auth);
  const newPassword = watch("newPassword", "");
  const email = watch("email", loggedInUser?.email);

  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const changePassword = (data) => {
    new UserService()
      .changePassword(data)
      .then((res) => {
        reset();
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
          <h1 className="text-4xl text-center font-bold mb-8">
            Change Password
          </h1>
          <form onSubmit={handleSubmit(changePassword)}>
            <Input
              label="Email: "
              type="text"
              readOnly={true}
              disabled={true}
              value={email}
              placeholder="eg: example@company.com"
              className="mb-2 focus-visible:outline-0 ring-inset focus-visible:border-1 focus-visible:border-[#c3d7ff] dark:focus-visible:border-[#2e3345] border border-gray-500 focus-visible:ring-2 ring-gray-500 dark:ring-[#c3d7ff]"
            />
            <Input
              label="Old password: "
              type="password"
              placeholder="eg: Old Password"
              className="mb-2 focus-visible:outline-0 ring-inset focus-visible:border-1 focus-visible:border-[#c3d7ff] dark:focus-visible:border-[#2e3345] border border-gray-500 focus-visible:ring-2 ring-gray-500 dark:ring-[#c3d7ff]"
              {...register("oldPassword", {
                required: true,
              })}
            />
            <Input
              label="New password: "
              type="password"
              placeholder="eg: Abcdefg@12345678"
              className="mb-2 focus-visible:outline-0 ring-inset focus-visible:border-1 focus-visible:border-[#c3d7ff] dark:focus-visible:border-[#2e3345] border border-gray-500 focus-visible:ring-2 ring-gray-500 dark:ring-[#c3d7ff]"
              error={errors.newPassword && errors.newPassword.message}
              {...register("newPassword", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(
                      value
                    ) ||
                    "Password must contain at least 8 characters and one uppercase letter, one lowercase letter, one number and one special character",
                },
              })}
            />
            <Input
              label="Confirm new password: "
              type="password"
              placeholder="eg: retype password"
              className="mb-2 focus-visible:outline-0 ring-inset focus-visible:border-1 focus-visible:border-[#c3d7ff] dark:focus-visible:border-[#2e3345] border border-gray-500 focus-visible:ring-2 ring-gray-500 dark:ring-[#c3d7ff]"
              error={errors.cnfPassword && errors.cnfPassword.message}
              {...register("cnfPassword", {
                required: true,
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
            />
            <div className="flex justify-center mb-5">
              <Button
                type="submit"
                className="h-10 py-2 px-6 hover:bg-[#5c93fd] active:ring-2  dark:active:ring-[#2e3345] ring-[#c3d7ff] bg-[#3f7fff] dark:bg-gray-100 dark:hover:bg-gray-300 dark:text-gray-900 text-gray-100"
              >
                Change
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
