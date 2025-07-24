// src/components/Dashboard/MainContent.js
import React from "react";

const MainContent = ({ selected }) => {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      {selected === "Transaction Status & Management" && (
        <TransactionStatusAndManagement />
      )}
      {/* Add: `else if` for other options like Loan, Statements etc later */}
      {selected === "Customer Management" && <CustomerManagement />}
      {selected === "Transaction Management" && <SearchFilterTransactions />}
      {selected === "Employee Management" && <EmployeeManagement />}
      {selected === "Data Updation and Maintenance" && (
        <DataUpdationAndMaintenance />
      )}
    </div>
  );
};

export default MainContent;
