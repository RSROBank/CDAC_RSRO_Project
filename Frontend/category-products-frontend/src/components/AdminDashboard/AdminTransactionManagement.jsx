import React, { useState } from 'react';

const TransactionManagement = () => {
  const [filters, setFilters] = useState({ id: '', status: '', type: '', user: '' });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [summaryReport, setSummaryReport] = useState('');
  const [manualUpdate, setManualUpdate] = useState('');

  const transactions = [
    { id: 1, user: 'Rahul', type: 'Credit', amount: 1000, status: 'Success', date: '2025-07-23 07:00 PM' },
    { id: 2, user: 'Amit', type: 'Debit', amount: 2500, status: 'Failed', date: '2025-07-22 03:00 PM' },
    { id: 3, user: 'Priya', type: 'Credit', amount: 1500, status: 'Pending', date: '2025-07-23 06:30 PM' },
  ];

  const filteredTransactions = transactions.filter(t =>
    t.id.toString().includes(filters.id) &&
    t.status.toLowerCase().includes(filters.status.toLowerCase()) &&
    t.type.toLowerCase().includes(filters.type.toLowerCase()) &&
    t.user.toLowerCase().includes(filters.user.toLowerCase())
  );

  const generateSummary = () => {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    setSummaryReport(`Total: ${transactions.length} transactions | Total Amount: ₹${total}`);
  };

  const handleManualUpdate = () => {
    if (manualUpdate.trim()) {
      alert(`Manual Update: ${manualUpdate}`);
      setManualUpdate('');
    } else {
      alert('Enter details for manual update.');
    }
  };

  return (
    <div className="bg-[#FDFCF9] min-h-screen p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#0B2E53] mb-6 text-center border-b pb-2">
          Transaction Management Dashboard
        </h2>

        {/* Filter Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Transaction ID"
            value={filters.id}
            onChange={(e) => setFilters({ ...filters, id: e.target.value })}
            className="border border-[#C89D2A] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
          <input
            type="text"
            placeholder="Status (Success, Failed...)"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border border-[#C89D2A] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
          <input
            type="text"
            placeholder="Type (Credit / Debit)"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="border border-[#C89D2A] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
          <input
            type="text"
            placeholder="User Name"
            value={filters.user}
            onChange={(e) => setFilters({ ...filters, user: e.target.value })}
            className="border border-[#C89D2A] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t) => (
              <div
                key={t.id}
                className="p-4 mb-4 bg-[#F9F7F2] rounded shadow flex justify-between items-center"
              >
                <div className="text-[#0B2E53]">
                  <p className="font-semibold">#{t.id} - {t.user}</p>
                  <p className="text-sm text-gray-700">
                    ₹{t.amount} | {t.type} | {t.date} | {t.status}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTransaction(t)}
                  className="bg-[#0B2E53] text-white px-4 py-1 rounded hover:bg-[#08213D]"
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <p className="text-[#C89D2A] text-center font-medium">
              No matching transactions found.
            </p>
          )}
        </div>

        {/* Transaction Detail Modal */}
        {selectedTransaction && (
          <div className="mt-6 p-5 border border-[#C89D2A] bg-[#F9F7F2] rounded-lg shadow space-y-4">
            <h3 className="text-lg font-semibold text-[#0B2E53]">
              Transaction #{selectedTransaction.id} - {selectedTransaction.user}
            </h3>
            <ul className="list-disc list-inside text-[#0B2E53]">
              <li>Amount: ₹{selectedTransaction.amount}</li>
              <li>Type: {selectedTransaction.type}</li>
              <li>Status: {selectedTransaction.status}</li>
              <li>Date: {selectedTransaction.date}</li>
            </ul>

            <div className="flex flex-wrap gap-3 mt-3">
              <button
                onClick={generateSummary}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Generate Report
              </button>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>

            {summaryReport && (
              <p className="text-green-700 font-medium">{summaryReport}</p>
            )}
          </div>
        )}

        {/* Manual Update Section */}
        <div className="mt-8">
          <h3 className="text-md font-semibold text-[#0B2E53] mb-2">
            Manual Update
          </h3>
          <textarea
            value={manualUpdate}
            onChange={(e) => setManualUpdate(e.target.value)}
            placeholder="Enter transaction ID and update notes..."
            className="w-full p-3 border border-[#C89D2A] rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
          <button
            onClick={handleManualUpdate}
            className="mt-2 bg-[#C89D2A] text-white px-4 py-2 rounded hover:bg-[#A77E20]"
          >
            Submit Update
          </button>
        </div>
      </div>
    </div>

  );
};

export default TransactionManagement;
