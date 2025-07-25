import React, { useState } from "react";

const SupportMaintenanceLoans = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [notifications] = useState([
    "New ticket from Rahul Verma",
    "Loan ID 101 marked for review",
    "Audit log: Verma Rahul updated loan status",
  ]);

  const loanTickets = [
    {
      id: 101,
      customer: "Rahul Verma",
      amount: 5000,
      status: "Active",
      query: "Need EMI date change",
    },
    {
      id: 102,
      customer: "Verma Rahul",
      amount: 7500,
      status: "Pending",
      query: "EMI auto-debit failed",
    },
  ];

  const filtered = loanTickets.filter(
    (loan) =>
      loan.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.id.toString().includes(searchTerm)
  );

  const handleRespond = () => {
    if (!responseText) {
      alert("Please write a response before submitting.");
      return;
    }
    alert(`Response submitted for ${selectedLoan.customer}: ${responseText}`);
    setSelectedLoan(null);
    setResponseText("");
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 font-sans">
      <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
        Search / Filter Loans - Support & Maintenance
      </h2>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or loan ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Loan List */}
      <div className="space-y-4">
        {filtered.map((loan) => (
          <div
            key={loan.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Loan ID:</strong> {loan.id}
              </p>
              <p>
                <strong>Customer:</strong> {loan.customer}
              </p>
              <p>
                <strong>Status:</strong> {loan.status}
              </p>
            </div>
            <button
              onClick={() => setSelectedLoan(loan)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Respond
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500">No tickets found.</p>
        )}
      </div>

      {/* Response Modal */}
      {selectedLoan && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-blue-700 mb-3">
            Respond to Query - {selectedLoan.customer}
          </h3>
          <p className="mb-2">
            <strong>Loan ID:</strong> {selectedLoan.id}
          </p>
          <p className="mb-2">
            <strong>Query:</strong> {selectedLoan.query}
          </p>
          <textarea
            className="w-full mt-3 p-2 border border-gray-300 rounded"
            rows={3}
            placeholder="Type your response here..."
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
          ></textarea>
          <div className="flex gap-4 mt-4">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleRespond}
            >
              Submit Response
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => {
                setSelectedLoan(null);
                setResponseText("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notification Panel */}
      <div className="mt-8 bg-white p-4 rounded-lg shadow">
        <h4 className="text-lg font-semibold text-blue-700 mb-2">
          Notifications & Audit Logs
        </h4>
        <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
          {notifications.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SupportMaintenanceLoans;
