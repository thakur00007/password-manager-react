import React, { forwardRef, useId } from "react";

function Input(
  {
    label,
    className = "",
    type = "text",
    placeholder = "",
    error = "",
    message = "",
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <div className="flex flex-col text-sm items-center justify-center my-2 px-5">
      <div className="w-full">
        <label htmlFor={id} className="text-base">
          {label}
        </label>{" "}
        {error && <span className="text-red-600 text-xs">{error}</span>}
        {message && <span className="text-green-500 text-xs">{message}</span>}
      </div>
      <div className="w-full">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          ref={ref}
          {...props}
          className={`rounded-md w-full h-8 pointer-finger bg-gray-100 text-gray-900  font-semibold px-3 ${className} ${
            error ? "border-red-500 focus-visible:ring-red-500" : ""
          }`}
        />
      </div>
    </div>
  );
}

export default forwardRef(Input);
