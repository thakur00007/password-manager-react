import React, { useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Input, Overlay } from "../";
import { useForm } from "react-hook-form";
import PasswordService from "../../services/password";
import CryptoService from "../../services/cryptoService";

function ViewPassword({ pass, close }) {
  const viewPasswordRef = useRef(null);
  const { register, handleSubmit } = useForm();

  const showPassword = (data) => {
    data.passwordId = pass._id;
    new PasswordService()
      .showPassword(data)
      .then((res) => {
        alert(new CryptoService().decrypt(res.data.password));
      })
      .catch((err) => {
        alert(err.message || "Something went wrong");
      });
  };

  return (
    <>
      {/* Background Overlay */}
      <Overlay />

      {/* Centered Modal */}
      <div
        ref={viewPasswordRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="relative w-full max-w-sm md:max-w-md bg-white dark:bg-[#2e3345] rounded-lg shadow-xl ring-1 ring-gray-200 dark:ring-gray-700">
          {/* Close Button */}
          <button
            onClick={close}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Close"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {/* Modal Content */}
          <div className="p-6">
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">
              View Password
            </h2>

            <p className="text-md text-gray-700 dark:text-gray-300 text-center mb-4">
              <span className="font-medium">About:</span> {pass.about}
            </p>

            <form onSubmit={handleSubmit(showPassword)} className="space-y-4">
              <Input
                label={pass.securityQuestion}
                type="text"
                {...register("answer", { required: true })}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none py-2 bg-white dark:bg-gray-800 dark:text-white"
              />
              <Button
                type="submit"
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-300 text-white dark:text-gray-900 font-medium rounded-md transition"
              >
                Show Password
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewPassword;
