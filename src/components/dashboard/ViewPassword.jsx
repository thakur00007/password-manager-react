import React, { useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "../";
import { useForm } from "react-hook-form";
import passwordService from "../../services/password";

function ViewPassword({ pass, close }) {
  const viewPasswordRef = useRef(null);

  const closeViewPassword = () => {
    close();
  };

  const { register, handleSubmit } = useForm();
  const showPassword = (data) => {
    data.passwordId = pass._id;
    passwordService.showPassword(data).then((res) => {  
      alert(res.password);
    }
    ).catch((err) => {
      alert(err.message);
    });
  };

  return (
    // pop up modal
    <div
      ref={viewPasswordRef}
      className="absolute z-20 bg-black bg-opacity-50 flex justify-center items-center"
    >
      {/* cross button */}
      <div className="absolute z-30 top-0 right-0">
        <button
          className="text-2xl font-semibold text-gray-900 dark:text-gra-100 cursor-pointer"
          onClick={() => closeViewPassword()}
        >
          <XMarkIcon className="h-6 w-6 text-gray-100" />
        </button>
      </div>

      <div className="dark:bg-[#2e3345] bg-[#c3d7ff] w-96 h-96 p-3 px-2 sm:px-8 sm:py-10 backdrop-blur-3xl rounded-xl shadow-[10px_10px_20px_8px_rgba(0,0,0,0.3)]">
        <h1 className="text-4xl text-center font-bold mb-8">View Password</h1>
        <div className="flex flex-col">
          <div className="flex flex-col mb-5">
            <span className="text-sm">{pass.about}</span>
            <span className="text-lg font-semibold">
              {pass.securityQuestion}
            </span>

            <form onSubmit={handleSubmit(showPassword)}>
              <Input
                label="Answer: "
                type="text"
                className="rounded-md w-full h-8 pointer-finger bg-gray-100 text-gray-900  font-semibold px-3"
                {...register("answer", {
                  required: true,
                })}
              />
              <Button
                type="submit"
                className="h-8 w-20 mb-2 py-1 px-6 hover:bg-[#5c93fd] active:ring-2  dark:active:ring-[
              #2e3345] ring-[#c3d7ff] bg-[#3f7fff] dark:bg-gray-100 dark:hover:bg-gray-300 dark:text-gray-900 text-gray-100"
              >
                Show
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPassword;
