import React, { useEffect, useState } from "react";
import { Input, Select, Button, Alert } from "../";
import SecurityQuestion from "../../services/securityQuestion";
import { useForm } from "react-hook-form";
import PasswordService from "../../services/password";
import { useSelector, useDispatch } from "react-redux";
import { unsetCoppiedPasswordSlice } from "../../store/password/coppiedPasswordSlice";
import CryptoService from "../../services/cryptoService";

function SavePasswordComponent() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { coppiedPassword } = useSelector((state) => state.coppiedPassword);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    new SecurityQuestion()
      .getSecurityQuestions()
      .then((res) => {
        setQuestions(
          res.map((question) => ({
            key: question._id,
            name: question.question,
          }))
        );
      })
      .catch((err) => showError(err.message));
  }, []);

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 6000);
  };

  const showSuccess = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 6000);
  };

  const savePasswordSubmit = (data) => {
    data.password = new CryptoService().encrypt(data.password);
    new PasswordService()
      .savePassword(data)
      .then((res) => {
        reset();
        dispatch(unsetCoppiedPasswordSlice());
        showSuccess(res.message);
      })
      .catch((err) => showError(err.message));
  };

  // If password was copied externally, inject it into the form
  useEffect(() => {
    if (coppiedPassword) setValue("password", coppiedPassword);
  }, [coppiedPassword, setValue]);

  return (
    <>
      {message && <Alert type="S" message={message} />}
      {error && <Alert type="E" message={error} />}

      <div className="min-h-[90vh] flex justify-center items-start px-4 py-10 sm:py-16">
        <div className="w-full max-w-md bg-white dark:bg-[#2e3345] rounded-xl shadow-lg p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Save Password
          </h1>

          <form onSubmit={handleSubmit(savePasswordSubmit)} className="space-y-6">
            <Input
              label="Password"
              placeholder="Your password"
              autoComplete="off"
              className="w-full h-10 bg-gray-100 text-gray-900 font-semibold px-3 rounded-md"
              {...register("password", { required: true })}
            />

            <Input
              label="About"
              placeholder="e.g. Facebook password"
              autoComplete="off"
              className="w-full h-10 bg-gray-100 text-gray-900 font-semibold px-3 rounded-md"
              {...register("about", { required: true })}
            />

            <Select
              label="Security Question"
              className="w-full h-10 bg-gray-100 text-gray-900 font-semibold px-3 rounded-md"
              options={questions}
              {...register("questionId", { required: true })}
            />

            <Input
              label="Answer"
              placeholder="e.g. Blue"
              autoComplete="off"
              className="w-full h-10 bg-gray-100 text-gray-900 font-semibold px-3 rounded-md"
              {...register("answer", { required: true })}
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md dark:bg-blue-400 dark:text-gray-900 dark:hover:bg-blue-300 transition"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SavePasswordComponent;
