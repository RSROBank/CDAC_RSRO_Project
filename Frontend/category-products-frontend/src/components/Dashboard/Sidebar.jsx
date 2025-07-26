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
    <div className="w-1/4 bg-[#F9F7F2] border-r border-[#D3E0EA] p-4 space-y-2 min-h-screen">
      {options.map((option) => (
        <button
          key={option}
          className={`w-full py-2 px-3 text-left border border-[#D3E0EA] rounded mt-4 transition-all duration-200
            ${
              selected === option
                ? "bg-[#0B2E53] text-white font-semibold shadow-md"
                : "bg-white text-[#0B2E53] hover:bg-[#E6F0FA]"
            }`}
          onClick={() => setSelected(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
