import React, { forwardRef, useId } from "react";

function Input(
  { label, className = "", type = "text", placeholder = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="flex flex-col text-sm items-center justify-center my-2 px-5">
      <div className="w-full">
        <label htmlFor={id} className="text-base">
          {label}
        </label>
      </div>
      <div className="w-full">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          ref={ref}
          {...props}
          className={`rounded-md w-full h-8 pointer-finger bg-gray-100 text-gray-900  font-semibold px-3 ${className}`}
        />
      </div>
    </div>
  );
}

export default forwardRef(Input);