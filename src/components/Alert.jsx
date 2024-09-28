import React, { useEffect, useRef, useState } from "react";
import { CheckCircleIcon, XMarkIcon, ExclamationCircleIcon, ExclamationTriangleIcon, BellAlertIcon } from "@heroicons/react/24/outline";
import { set } from "react-hook-form";

function Alert({
  message,
  type = "",
  duration = 5000,
}) {

  const [show, setShow] = useState(true);
  const [posR, setPosR] = useState("");

  
  const divRef = useRef()
  useEffect(() => {
    // show && divRef.current.classList.add("translate-x-[-420px]");
    if (show) {
      
      

      setTimeout(() => {
        setPosR("translate-x-[-420px]");
      }
      , 100);
      // divRef.current.classList.remove("translate-x-[420px]");
      // divRef.current.classList.add("translate-x-[-420px]");

    } else {
      setPosR("");
      // divRef.current.classList.remove("translate-x-[-420px]");
      // divRef.current.classList.remove("translate-x-[420px]");
    }

  }, [show, setShow]);

  setTimeout(() => {
    setShow(false);
  }
  , duration);

  const closeAlert = () => {
    setPosR("");
    setShow(false)
  }
  
  

  if (type === "S") {
    return (
      <div ref={divRef} className={`absolute w-auto ease-in-out duration-[500ms] rounded-md border-green-500 top-24 right-[-400px] ${posR} border bg-green-50  flex justify-center items-center shadow-md`}>
        <div className=" m-5 rounded-lg">
  
          <div className="flex justify-between">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mx-2 me-5" />
            <span className="text-base text-green-600 font-medium">{message}</span>
            {/* <XMarkIcon onClick={(e) => closeAlert()} className="h-5 w-5 text-gray-500 hover:text-gray-900 cursor-pointer mx-2 ms-5" /> */}
          </div>
          
        </div>
      </div>
    );
  } else if (type === "E") {
    return (
      <div ref={divRef} className={`absolute w-auto ease-in-out duration-[500ms] rounded-md border-red-500 top-24 right-[-400px] ${posR} border bg-red-50  flex justify-center items-center shadow-md`}>
        <div className=" m-5 rounded-lg">
  
          <div className="flex justify-between">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 mx-2 me-5" />
            <span className="text-base text-red-600 font-medium">{message}</span>
            {/* <XMarkIcon onClick={(e) => closeAlert()} className="h-5 w-5 text-gray-500 hover:text-gray-900 cursor-pointer mx-2 ms-5" /> */}
          </div>
          
        </div>
      </div>
    );
  } else if (type === "W") {
    return (
      <div ref={divRef} className={`absolute w-auto ease-in-out duration-[500ms] rounded-md border-yellow-500 top-24 right-[-400px] ${posR} border bg-yellow-50  flex justify-center items-center shadow-md`}>
        <div className=" m-5 rounded-lg">
  
          <div className="flex justify-between">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mx-2 me-5" />
            <span className="text-base text-yellow-600 font-medium">{message}</span>
            {/* <XMarkIcon onClick={(e) => closeAlert()} className="h-5 w-5 text-gray-500 hover:text-gray-900 cursor-pointer mx-2 ms-5" /> */}
          </div>
          
        </div>
      </div>
    );
  } 

  return (
    <div ref={divRef} className={`absolute w-auto ease-in-out duration-[500ms] rounded-md border-blue-500 top-24 right-[-400px] ${posR} border bg-blue-50  flex justify-center items-center shadow-md`}>
      <div className=" m-5 rounded-lg">

        <div className="flex justify-between">
          <BellAlertIcon className="h-5 w-5 text-blue-500 mx-2 me-5" />
          <span className="text-base text-blue-600 font-medium">{message}</span>
          {/* <XMarkIcon onClick={(e) => closeAlert()} className="h-5 w-5 text-gray-500 hover:text-gray-900 cursor-pointer mx-2 ms-5" /> */}
        </div>
        
      </div>
    </div>
  );
}

export default Alert;
