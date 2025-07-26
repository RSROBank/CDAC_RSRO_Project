import React, { useState, useEffect } from "react";

const LoanSearchComponent = () => {
  const [loans, setLoans] = useState([]);
  const [filter, setFilter] = useState({ id: "", status: "", amount: "" });

  // Dummy Loan Data
  useEffect(() => {
    const dummyLoans = [
      {
        id: "L001",
        status: "Active",
        tenure: "12 months",
        amount: 50000,
        emi: 4167,
        emiLeft: 10,
        createdDate: "2025-06-01",
        interestRate: "8%",
      },
      {
        id: "L002",
        status: "Pending",
        tenure: "24 months",
        amount: 100000,
        emi: 4167,
        emiLeft: 24,
        createdDate: "2025-07-01",
        interestRate: "7.5%",
      },
      {
        id: "L003",
        status: "Rejected",
        tenure: "6 months",
        amount: 30000,
        emi: 5200,
        emiLeft: 6,
        createdDate: "2025-05-15",
        interestRate: "9%",
      },
    ];
    setLoans(dummyLoans);
  }, []);

  // Filter Logic
  const filteredLoans = loans.filter((loan) => {
    return (
      (filter.id === "" || loan.id.toLowerCase().includes(filter.id.toLowerCase())) &&
      (filter.status === "" || loan.status.toLowerCase().includes(filter.status.toLowerCase())) &&
      (filter.amount === "" || loan.amount.toString().includes(filter.amount))
    );
  });

  const handleLoan = ()=> {
    console.log("new loan created");
  }

  return (
    <div className="bg-blue-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
          Search and Filter Loan
        </h2>

        {/* Filter Inputs */}
        <div className="bg-white shadow-md rounded-2xl p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* <input
            type="text"
            placeholder="Filter by Loan ID"
            value={filter.id}
            onChange={(e) => setFilter({ ...filter, id: e.target.value })}
            className="w-full p-2 rounded-xl border border-blue-300"
          /> */}
          <input
            type="text"
            placeholder="Filter by Status"
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="w-full p-2 rounded-xl border border-blue-300"
          />
          <input
            type="text"
            placeholder="Filter by Amount"
            value={filter.amount}
            onChange={(e) => setFilter({ ...filter, amount: e.target.value })}
            className="w-full p-2 rounded-xl border border-blue-300"
          />
        </div>

        {/* Loan Cards */}
        <div className="space-y-4">
          {filteredLoans.length > 0 ? (
            filteredLoans.map((loan) => (
              <div
                key={loan.id}
                className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="text-blue-900 space-y-1">
                  {/* <p><strong>Loan ID:</strong> {loan.id}</p> */}
                  <p><strong>Status:</strong> {loan.status}</p>
                  <p><strong>Tenure:</strong> {loan.tenure}</p>
                  <p><strong>Amount:</strong> ₹{loan.amount}</p>
                  <p><strong>EMI:</strong> ₹{loan.emi}</p>
                  <p><strong>EMIs Left:</strong> {loan.emiLeft}</p>
                  <p><strong>Start Date:</strong> {loan.createdDate}</p>
                  <p><strong>Interest Rate:</strong> {loan.interestRate}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No matching loan records found.</p>
          )}
        </div>

        {/* Button */}
        <div className="text-center mt-6">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
            onClick={handleLoan}
          >
            Apply new Loan
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanSearchComponent;
