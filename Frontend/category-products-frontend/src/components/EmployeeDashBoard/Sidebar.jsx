// src/components/Dashboard/Sidebar.js
import React from "react";

const options = [
  "Customer Management",
  "Approval of Accounts, FD, Loans",
  "Transaction Management",
  "Loan EMI Management",
  "Support and Maintenance",
];

const Sidebar = ({ selected, setSelected }) => {
  return (
    <div className="w-1/4 bg-white border-r p-4 space-y-2">
      {options.map((option) => (
        <button
          key={option}
          className={`w-full py-2 px-3 text-left border rounded mt-4
             hover:bg-blue-100 ${selected === option ? "bg-blue-200" : ""}`}
          onClick={() => setSelected(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
