import React, { useState } from "react";

const LoanFilterComponent = () => {
  const [filter, setFilter] = useState({ id: "", userId: "", status: "" });
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [extendMessage, setExtendMessage] = useState("");

  const loanData = [
    {
      Loan_Info_Id: 101,
      Review_Id: 1,
      Amount: 50000,
      Approved_Date: "2025-06-15",
      User_Id: "U123",
      Tenure_Months: 12,
      Status: "Active",
      EMI_Amount: 4500,
      Total_Emis: 12,
      Created_At: "2025-06-01",
      Modify_At: "2025-07-01",
    },
    {
      Loan_Info_Id: 102,
      Review_Id: 2,
      Amount: 80000,
      Approved_Date: "2025-07-01",
      User_Id: "U456",
      Tenure_Months: 24,
      Status: "Pending",
      EMI_Amount: 3800,
      Total_Emis: 24,
      Created_At: "2025-06-10",
      Modify_At: "2025-07-01",
    },
  ];

  // Filter logic
  const filteredLoans = loanData.filter(
    (loan) =>
      (filter.id === "" || loan.Loan_Info_Id.toString().includes(filter.id)) &&
      (filter.userId === "" ||
        loan.User_Id.toLowerCase().includes(filter.userId.toLowerCase())) &&
      (filter.status === "" ||
        loan.Status.toLowerCase().includes(filter.status.toLowerCase()))
  );

  const handleExtendLoan = () => {
    if (selectedLoan && selectedLoan.Status === "Active") {
      setExtendMessage(
        `Loan ID ${selectedLoan.Loan_Info_Id} extension requested.`
      );
    } else {
      setExtendMessage("Loan extension not allowed unless status is Active.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 font-sans">
      <h2 className="text-2xl text-center text-blue-800 font-bold mb-6">
        Search / Filter Loans
      </h2>

      {/* Filter Section */}
      <div className="grid md:grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow mb-6">
        <input
          type="text"
          placeholder="Filter by Loan ID"
          value={filter.id}
          onChange={(e) => setFilter({ ...filter, id: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Filter by User ID"
          value={filter.userId}
          onChange={(e) => setFilter({ ...filter, userId: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Filter by Status"
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="p-2 border rounded"
        />
      </div>

      {/* Loan Cards */}
      <div className="space-y-4">
        {filteredLoans.map((loan) => (
          <div
            key={loan.Loan_Info_Id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center"
          >
            <div className="text-blue-800 space-y-1 text-sm md:text-base">
              <p>
                <strong>Loan ID:</strong> {loan.Loan_Info_Id}
              </p>
              <p>
                <strong>User ID:</strong> {loan.User_Id}
              </p>
              <p>
                <strong>Amount:</strong> ₹{loan.Amount}
              </p>
              <p>
                <strong>Status:</strong> {loan.Status}
              </p>
              <p>
                <strong>Tenure:</strong> {loan.Tenure_Months} months
              </p>
              <p>
                <strong>EMI:</strong> ₹{loan.EMI_Amount}
              </p>
              <p>
                <strong>Approved Date:</strong> {loan.Approved_Date}
              </p>
            </div>
            <button
              className="mt-4 md:mt-0 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
              onClick={() => setSelectedLoan(loan)}
            >
              View Details
            </button>
          </div>
        ))}

        {filteredLoans.length === 0 && (
          <p className="text-center text-gray-500">No loans found.</p>
        )}
      </div>

      {/* Selected Loan Details */}
      {selectedLoan && (
        <div className="mt-6 bg-white p-5 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">
            EMI Schedule for Loan ID: {selectedLoan.Loan_Info_Id}
          </h3>
          <ul className="list-disc pl-6 text-blue-700 text-sm space-y-1">
            <li>Total EMIs: {selectedLoan.Total_Emis}</li>
            <li>EMI Amount: ₹{selectedLoan.EMI_Amount}</li>
            <li>Tenure: {selectedLoan.Tenure_Months} months</li>
            <li>Status: {selectedLoan.Status}</li>
          </ul>
          <button
            className="mt-4 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
            onClick={handleExtendLoan}
          >
            Request Loan Extension
          </button>
          {extendMessage && (
            <p className="mt-3 text-green-700 font-semibold">{extendMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LoanFilterComponent;
