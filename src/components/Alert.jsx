import React, { useEffect, useRef, useState } from "react";
import {
  CheckCircleIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";

function Alert({ message, type = "", duration = 5000 }) {
  const [show, setShow] = useState(true);
  const [slideIn, setSlideIn] = useState(false);
  const divRef = useRef();

  // Handle slide-in animation
  useEffect(() => {
    if (show) {
      setTimeout(() => setSlideIn(true), 100); // Delay for slide-in
      setTimeout(() => setShow(false), duration); // Auto close
    }
  }, [show, duration]);

  const closeAlert = () => {
    setSlideIn(false);
    setTimeout(() => setShow(false), 300); // Wait for slide-out
  };

  if (!show) return null;

  // Icon based on alert type
  const iconMap = {
    S: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
    E: <ExclamationCircleIcon className="h-5 w-5 text-red-500" />,
    W: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />,
    default: <BellAlertIcon className="h-5 w-5 text-blue-500" />,
  };

  const bgMap = {
    S: "bg-green-50 border-green-500 text-green-600",
    E: "bg-red-50 border-red-500 text-red-600",
    W: "bg-yellow-50 border-yellow-500 text-yellow-600",
    default: "bg-blue-50 border-blue-500 text-blue-600",
  };

  const icon = iconMap[type] || iconMap.default;
  const styles = bgMap[type] || bgMap.default;

  return (
    <div
      ref={divRef}
      className={`fixed top-24 right-4 w-[calc(100%-2rem)] max-w-sm z-50 transition-all duration-500 ease-in-out transform ${
        slideIn ? "translate-x-0" : "translate-x-full"
      } rounded-md shadow-lg border ${styles}`}
    >
      <div className="flex items-start justify-between p-4">
        <div className="flex items-center space-x-3">
          {icon}
          <span className="text-sm font-medium">{message}</span>
        </div>
        <XMarkIcon
          onClick={closeAlert}
          className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Alert;
