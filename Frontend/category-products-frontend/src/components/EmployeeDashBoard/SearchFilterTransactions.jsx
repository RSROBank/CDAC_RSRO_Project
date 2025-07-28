import React, { useState } from 'react';

const SearchFilterTransactions = () => {
  const [filters, setFilters] = useState({ id: '', status: '', type: '' });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [summaryReport, setSummaryReport] = useState('');
  const [failedAction, setFailedAction] = useState('');

  const transactions = [
    { id: 1, type: 'Real-time', amount: 100, status: 'Success', date: '2025-07-23 07:00 PM' },
    { id: 2, type: 'Historical', amount: 250, status: 'Failed', date: '2025-07-22 03:00 PM' },
    { id: 3, type: 'Real-time', amount: 150, status: 'Success', date: '2025-07-23 06:30 PM' },
  ];

  const filteredTransactions = transactions.filter(t =>
    t.id.toString().includes(filters.id) &&
    t.status.toLowerCase().includes(filters.status.toLowerCase()) &&
    t.type.toLowerCase().includes(filters.type.toLowerCase())
  );

  const generateSummary = () => {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    setSummaryReport(`Total Transactions: ${transactions.length}, Total Amount: $${total}`);
  };

  const manageFailed = (t) => {
    if (t.status === 'Failed') {
      setFailedAction(` Managing failed transaction #${t.id} - Retry initiated or logged.`);
    } else {
      setFailedAction(' Selected transaction is not failed.');
    }
  };

  return (
    <div className="bg-[#FDFCF9] min-h-screen p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white border border-gray-300 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-center text-[#0B2E53] border-b pb-2 mb-4">
          Search / Filter Transactions
        </h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <input
            type="text"
            placeholder="Filter by ID"
            value={filters.id}
            onChange={(e) => setFilters({ ...filters, id: e.target.value })}
            className="p-2 border border-[#C89D2A] rounded focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
          <input
            type="text"
            placeholder="Filter by Status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="p-2 border border-[#C89D2A] rounded focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
          <input
            type="text"
            placeholder="Filter by Type"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="p-2 border border-[#C89D2A] rounded focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t) => (
              <div
                key={t.id}
                className="bg-[#F9F7F2] rounded-xl p-4 flex justify-between items-center shadow"
              >
                <div className="text-[#0B2E53]">
                  <p className="font-semibold">#{t.id} - {t.type}</p>
                  <p className="text-sm text-gray-700">${t.amount} | {t.date} | {t.status}</p>
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
            <p className="text-[#C89D2A] text-center">No matching transactions found.</p>
          )}
        </div>

        {/* Transaction Detail */}
        {selectedTransaction && (
          <div className="mt-6 p-4 border border-[#C89D2A] rounded-lg bg-white shadow">
            <h3 className="text-lg font-semibold text-[#0B2E53] mb-2">
              Transaction #{selectedTransaction.id}
            </h3>
            <ul className="list-disc list-inside text-[#0B2E53] mb-3">
              <li>Type: {selectedTransaction.type}</li>
              <li>Amount: ${selectedTransaction.amount}</li>
              <li>Date: {selectedTransaction.date}</li>
              <li>Status: {selectedTransaction.status}</li>
            </ul>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mb-2">
              <button
                onClick={generateSummary}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Generate Summary
              </button>
              <button
                onClick={() => manageFailed(selectedTransaction)}
                className="bg-[#C89D2A] text-white px-4 py-2 rounded hover:bg-[#A77E20]"
              >
                Manage Failed
              </button>
              <button
                onClick={() => {
                  setSelectedTransaction(null);
                  setSummaryReport('');
                  setFailedAction('');
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>

            {/* Messages */}
            {summaryReport && (
              <p className="text-green-700 font-medium mt-2">{summaryReport}</p>
            )}
            {failedAction && (
              <p className="text-yellow-700 font-medium mt-2">{failedAction}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilterTransactions;
