// src/components/Dashboard/Sidebar.js
import React from "react";

const options = [
  "Dashboard",
  "Statements",
  "Send Money",
  "Apply for Loan/FD",
  "Loan",
  "Manage Cards",
  "Deposit",
];

const Sidebar = ({ selected, setSelected }) => {
  return (
    <div
      className=" w-1/4 bg-white border-r p-4 space-y-2"
      style={{ minHeight: "100vh" }}
    >
      {options.map((option) => (
        <button
          key={option}
          className={`w-full py-2 px-3 text-left border rounded mt-4
              ${selected === option ? "bg-[#C89D2A]" : ""}`}
          onClick={() => setSelected(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
