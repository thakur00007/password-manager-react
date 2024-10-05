import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "../";
import { useSelector, useDispatch } from "react-redux";
import UserService from "../../services/userService";
import { Alert } from "../";
import { login } from "../../store/auth/authSlice";

function UpdateProfile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const { loggedInUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const username = watch("username", loggedInUser?.username);
  const email = watch("email", loggedInUser?.email);

  const updateUserDetails = (data) => {
    if (
      data.username === loggedInUser.username &&
      data.email === loggedInUser.email
    ) {
      setError("No changes made");

      setTimeout(() => {
        setError("");
      }, 6000);

      return;
    }
    new UserService()
      .updateProfile(data)
      .then((res) => {
        dispatch(login(res.data.user));
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
          <h1 className="text-4xl text-center font-bold mb-8">Update Profile</h1>
          <form onSubmit={handleSubmit(updateUserDetails)}>
            <Input
              label="Username: "
              type="text"
              value={username}
              placeholder="eg: Your Name"
              className="mb-2 focus-visible:outline-0 ring-inset focus-visible:border-1 focus-visible:border-[#c3d7ff] dark:focus-visible:border-[#2e3345] border border-gray-500 focus-visible:ring-2 ring-gray-500 dark:ring-[#c3d7ff]"
              {...register("username", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              type="text"
              value={email}
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
            <div className="flex justify-center mb-5">
              <Button
                type="submit"
                className="h-10 py-2 px-6 hover:bg-[#5c93fd] active:ring-2  dark:active:ring-[#2e3345] ring-[#c3d7ff] bg-[#3f7fff] dark:bg-gray-100 dark:hover:bg-gray-300 dark:text-gray-900 text-gray-100"
              >
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
