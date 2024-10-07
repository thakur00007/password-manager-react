import React, { useEffect, useState, useId } from "react";
import PasswordService from "../../services/password";
import ViewPassword from "./ViewPassword";
import { Button } from "../";
import { formateDate } from "../../util/utility";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Dashboard() {
  const [passList, setPassList] = useState([]);
  useEffect(() => {
    new PasswordService()
      .fetchAllPasswords()
      .then((res) => {
        setPassList(res.data);
        console.log(res.data && true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deletePassword = (passwordId) => {
    new PasswordService()
      .deletePassword({ passwordId })
      .then((res) => {
        console.log(res);
        setPassList(passList.filter((pass) => pass._id !== passwordId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [viewPassword, setViewPassword] = useState(<></>);
  const showPassword = (pass) => {
    setViewPassword(
      <ViewPassword pass={pass} close={() => setViewPassword(<></>)} />
    );
  };

  return (
    <>
      {viewPassword && viewPassword}

      <div className="container mx-auto flex justify-center items-center mt-2">
        <div className="dark:bg-[#2e3345] bg-[#c3d7ff] sm:w-[28rem] w-80  p-3 px-2 sm:px-8 sm:py-10 backdrop-blur-3xl rounded-xl shadow-[10px_10px_20px_8px_rgba(0,0,0,0.3)]">
          <h1 className="text-4xl text-center font-bold mb-8">Dashboard</h1>
          {passList.length > 0 ? (
            <div className="flex flex-col h-96 overflow-y-auto p-2">
              {passList.map((pass) => {
                return (
                  <div key={pass._id} className="flex flex-col mb-7">
                    <div className="flex justify-between">
                      <div className="w-5/6 font-semibold">{pass.about}</div>
                      <div className="w-1/6">
                        <TrashIcon
                          onClick={() => deletePassword(pass._id)}
                          title="Delete this password"
                          className="h-6 w-6 m-auto cursor-pointer text-red-500"
                        />
                      </div>
                    </div>
                    <div className="text-sm flex justify-end py-2">
                      &mdash; {formateDate(pass.createdAt)}
                    </div>

                    <Button
                      onClick={() => showPassword(pass)}
                      className="h-8 mb-2 px-6 hover:bg-[#5c93fd] active:ring-2  dark:active:ring-[#2e3345] ring-[#c3d7ff] bg-[#3f7fff] dark:bg-gray-100 dark:hover:bg-gray-300 dark:text-gray-900 text-gray-100"
                      label="View Password"
                    >
                      View Password
                    </Button>
                    <hr></hr>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-xl">
              No Passwords to show.
              <br />{" "}
              <Link className="text-blue-500" to="/save-password">
                Add some passwords
              </Link>{" "}
              to view here.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
