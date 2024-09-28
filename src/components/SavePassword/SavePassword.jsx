import React, { useEffect, useState } from "react";
import { Input, Select, Button } from "../";
import securityQuestion from "../../services/securityQuestion";
import { useForm } from "react-hook-form";
import passwordService from "../../services/password";
function SavePassword() {
  const [questions, setQuestions] = useState([]);
  const { register, handleSubmit } = useForm();

  const savePasswordSubmit = () => (data) => {
    console.log(data);
    passwordService
      .savePassword(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    securityQuestion
      .getSecurityQuestions()
      .then((res) => {
        setQuestions(
          res.map((question) => {
            return {
              key: question._id,
              name: question.question,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    /** save password form
     * fields
     * 1. coppied password
     * 2. About the password
     * 3. select security question
     * 4. answer to the security question
     */

    <div className="container mx-auto flex justify-center items-center mt-20">
      <div className="dark:bg-[#2e3345] bg-[#c3d7ff] sm:w-[28rem] w-80  p-3 px-2 sm:px-8 sm:py-10 backdrop-blur-3xl rounded-xl shadow-[10px_10px_20px_8px_rgba(0,0,0,0.3)]">
        <h1 className="text-4xl text-center font-bold mb-8">Save Password</h1>
        <form onSubmit={handleSubmit(savePasswordSubmit())}>
          <Input
            label="Password: "
            placeholder="your password"
            autoComplete="off"
            className={`rounded-md w-full h-8 pointer-finger bg-gray-100 text-gray-900  font-semibold px-3`}
            {...register("password", {
              required: true,
            })}
          />

          <Input
            label="About Password: "
            placeholder="eg: facebook password"
            autoComplete="off"
            className={`rounded-md w-full h-8 pointer-finger bg-gray-100 text-gray-900  font-semibold px-3`}
            {...register("about", {
              required: true,
            })}
          />
          <Select
            label="Security Question: "
            className="rounded-md w-full h-8 pointer-finger bg-gray-100 text-gray-900  font-semibold px-3"
            options={questions}
            {...register("questionId", {
              required: true,
            })}
          />
          <Input
            label="Answer: "
            placeholder="eg: blue"
            autoComplete="off"
            className={`rounded-md w-full h-8 pointer-finger bg-gray-100 text-gray-900  font-semibold px-3`}
            {...register("answer", {
              required: true,
            })}
          />
          <div className="flex justify-center mb-5">
            <Button
              type="submit"
              className="h-10 py-2 px-6 hover:bg-[#5c93fd] active:ring-2  dark:active:ring-[#2e3345] ring-[#c3d7ff] bg-[#3f7fff] dark:bg-gray-100 dark:hover:bg-gray-300 dark:text-gray-900 text-gray-100"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SavePassword;
