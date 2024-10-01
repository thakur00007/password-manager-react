import React, { useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Input, Overlay } from "../";
import { useForm } from "react-hook-form";
import PasswordService from "../../services/password";

function ViewPassword({ pass, close }) {
  const viewPasswordRef = useRef(null);

  const { register, handleSubmit } = useForm();
  const showPassword = (data) => {
    data.passwordId = pass._id;
    new PasswordService()
      .showPassword(data)
      .then((res) => {
        alert(res.data.password);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    // pop up modal
    <>
      <Overlay />
      <div
        ref={viewPasswordRef}
        className="absolute z-20 bg-opacity-50 flex justify-center items-center"
      >
        <div className="absolute z-30 top-0 right-0">
          <button
            className="flex justify-center items-center text-2xl h-7 w-7 bg-red-600 rounded-tr-xl rounded-bl-xl font-semibold text-gray-900 dark:text-gra-100 cursor-pointer "
            onClick={() => close()}
          >
            <XMarkIcon className="h-6 w-6 text-gray-100" />
          </button>
        </div>

        <div className="dark:bg-[#2e3345] bg-[#c3d7ff] w-96 rounded-xl shadow-[0_0_30px_5px_rgba(255,255,255,0.4)]">
          <div className="w-full py-1 flex justify-center items-center border-b-2 border-gray-100">
            <div className="w-5/6">
              <h2 className="text-2xl mb-0 text-center font-bold">
                View Password
              </h2>
            </div>
          </div>
          {/* <h1 className="text-4xl text-center font-bold mb-8">View Password</h1> */}
          <div className="flex flex-col">
            <div className="flex flex-col py-10 px-3">
              <span className="px-5">About: {pass.about}</span>
              <form onSubmit={handleSubmit(showPassword)}>
                <Input
                  label={pass.securityQuestion}
                  type="text"
                  className="my-2 focus-visible:outline-0 ring-inset focus-visible:border-1 focus-visible:border-[#c3d7ff] dark:focus-visible:border-[#2e3345] border border-gray-500 focus-visible:ring-2 ring-gray-500 dark:ring-[#c3d7ff]"
                  {...register("answer", {
                    required: true,
                  })}
                />
                <div className="px-5">
                  <Button
                    type="submit"
                    className="h-8 px-6 hover:bg-[#5c93fd] active:ring-2  dark:active:ring-[#2e3345] ring-[#c3d7ff] bg-[#3f7fff] dark:bg-gray-100 dark:hover:bg-gray-300 dark:text-gray-900 text-gray-100"
                  >
                    Show Password
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewPassword;
