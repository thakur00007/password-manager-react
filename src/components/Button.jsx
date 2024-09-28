import React from "react";

function Button({ children, type = "button", className = "", ...props }) {
  return (
    <button 
      className={`rounded-md ring-inset focus-visible:outline-1 focus-visible:ring-0 ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
