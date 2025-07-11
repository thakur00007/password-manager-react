import React, { useEffect, useState } from "react";
import PasswordService from "../../services/password";
import ViewPassword from "./ViewPassword";
import { Button } from "../";
import { formateDate } from "../../util/utility";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Dashboard() {
  const [passList, setPassList] = useState([]);
  const [viewPassword, setViewPassword] = useState(null);

  useEffect(() => {
    new PasswordService()
      .fetchAllPasswords()
      .then((res) => {
        setPassList(res.data);
      })
      .catch((err) => {
        alert(err.message || "Something went wrong");
      });
  }, []);

  const deletePassword = (passwordId) => {
    new PasswordService()
      .deletePassword({ passwordId })
      .then(() => {
        setPassList((prev) => prev.filter((pass) => pass._id !== passwordId));
      })
      .catch((err) => {
        alert(err.message || "Something went wrong");
      });
  };

  const showPassword = (pass) => {
    setViewPassword(
      <ViewPassword pass={pass} close={() => setViewPassword(null)} />
    );
  };

  return (
    <>
      {viewPassword}

      <div className="min-h-[90vh] px-4 flex justify-center items-start mt-8 sm:mt-16">
        <div className="w-full max-w-2xl bg-white dark:bg-[#2e3345] rounded-xl shadow-lg p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Dashboard
          </h1>

          {passList.length > 0 ? (
            <div className="h-[30rem] overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700">
              {[...passList].reverse().map((pass) => (
                <div
                  key={pass._id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
                      {pass.about}
                    </h2>
                    <TrashIcon
                      onClick={() => deletePassword(pass._id)}
                      className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-600"
                      title="Delete this password"
                    />
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 text-right">
                    — {formateDate(pass.createdAt)}
                  </div>

                  <Button
                    onClick={() => showPassword(pass)}
                    className="w-full h-9 px-4 text-sm bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-400 dark:text-gray-900 dark:hover:bg-blue-300 rounded-md"
                  >
                    View Password
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-300 text-lg">
              No passwords found.
              <br />
              <Link to="/save-password" className="text-blue-500 underline">
                Add some passwords
              </Link>{" "}
              to view them here.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
