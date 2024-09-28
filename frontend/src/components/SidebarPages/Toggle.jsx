import React from "react";

const Toggle = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
        id={label}
      />
      <label
        htmlFor={label}
        className={`flex items-center cursor-pointer text-gray-700 ${
          checked ? "font-semibold" : ""
        }`}
      >
        <div className="relative">
          <div
            className={`block w-10 h-6 rounded-full ${
              checked ? "bg-blue-600" : "bg-gray-400"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
              checked ? "translate-x-4" : ""
            }`}
          ></div>
        </div>
        <span className="ml-2">{label}</span>
      </label>
    </div>
  );
};

export default Toggle;
