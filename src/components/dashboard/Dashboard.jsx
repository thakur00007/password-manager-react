import React, { useEffect, useState, useId } from "react";
import PasswordService from "../../services/password";
import ViewPassword from "./ViewPassword";
import { Button } from "../";
import { formateDate } from "../../util/utility";

function Dashboard() {
  const [passList, setPassList] = useState([]);
  useEffect(() => {
    new PasswordService()
      .fetchAllPasswords()
      .then((res) => {
        console.log(res);
        setPassList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [viewPassword, setViewPassword] = useState(<></>);
  // const [viewPasswordContent, setViewPasswordContent] = useState("");
  const showPassword = (pass) => {
    setViewPassword(
      <ViewPassword pass={pass} close={() => setViewPassword(<></>)} />
    );
  };

  return (
    <>
      {viewPassword && viewPassword}
      <div className="container mx-auto flex justify-center items-center mt-20">
        <div className="dark:bg-[#2e3345] bg-[#c3d7ff] sm:w-[28rem] w-80  p-3 px-2 sm:px-8 sm:py-10 backdrop-blur-3xl rounded-xl shadow-[10px_10px_20px_8px_rgba(0,0,0,0.3)]">
          <h1 className="text-4xl text-center font-bold mb-8">Dashboard</h1>
          <div className="flex flex-col">
            {passList.map((pass) => {
              return (
                <div key={pass._id} className="flex flex-col mb-5">
                  <span className="text-lg font-semibold">{pass.about}</span>
                  <span className="text-sm">
                    Created At: {formateDate(pass.createdAt)}
                  </span>
                  {/* <ViewPassword /> */}
                  <Button
                    onClick={() => showPassword(pass)}
                    className="h-10 mb-2 py-2 px-6 hover:bg-[#5c93fd] active:ring-2  dark:active:ring-[#2e3345] ring-[#c3d7ff] bg-[#3f7fff] dark:bg-gray-100 dark:hover:bg-gray-300 dark:text-gray-900 text-gray-100"
                    label="View Password"
                  >
                    View Password
                  </Button>
                  <hr></hr>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
