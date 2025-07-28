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
    <div className="min-h-screen bg-[#FDFCF9] p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white border border-gray-300 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-center text-[#0B2E53] border-b pb-2 mb-4">
          Search / Filter Loans - Support & Maintenance
        </h2>

        {/* Search Input */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by name or loan ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-[#C89D2A] rounded focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
        </div>

        {/* Loan List */}
        <div className="space-y-4">
          {filtered.map((loan) => (
            <div
              key={loan.id}
              className="bg-[#F9F7F2] rounded-xl p-4 flex justify-between items-center shadow"
            >
              <div className="text-[#0B2E53]">
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
                className="px-4 py-2 bg-[#0B2E53] text-white rounded hover:bg-[#08213D]"
              >
                Respond
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-[#C89D2A] font-medium">No tickets found.</p>
          )}
        </div>

        {/* Response Modal */}
        {selectedLoan && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-[#0B2E53] mb-3">
              Respond to Query - {selectedLoan.customer}
            </h3>
            <p className="mb-2">
              <strong>Loan ID:</strong> {selectedLoan.id}
            </p>
            <p className="mb-2">
              <strong>Query:</strong> {selectedLoan.query}
            </p>
            <textarea
              className="w-full mt-3 p-2 border border-[#C89D2A] rounded focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
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
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
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
          <h4 className="text-lg font-semibold text-[#0B2E53] mb-2">
            Notifications & Audit Logs
          </h4>
          <ul className="list-disc list-inside text-sm text-[#0B2E53] space-y-1">
            {notifications.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SupportMaintenanceLoans;
