import React, { useState } from 'react';

const SearchFilterTransactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [summaryReport, setSummaryReport] = useState('');
  const [failedAction, setFailedAction] = useState('');

  const transactions = [
    { id: 1, type: 'Real-time', amount: 100, status: 'Success', date: '2025-07-23 07:00 PM' },
    { id: 2, type: 'Historical', amount: 250, status: 'Failed', date: '2025-07-22 03:00 PM' },
    { id: 3, type: 'Real-time', amount: 150, status: 'Success', date: '2025-07-23 06:30 PM' },
  ];

  const filteredTransactions = transactions.filter(transaction =>
    transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.date.includes(searchTerm)
  );

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleView = (transaction) => setSelectedTransaction(transaction);

  const generateSummary = () => {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    setSummaryReport(`Total Transactions: ${transactions.length}, Total Amount: $${total}`);
  };

  const manageFailed = (transaction) => {
    if (transaction.status === 'Failed') {
      setFailedAction(`Managed failed transaction ${transaction.id} - Retrying or logging...`);
    } else {
      setFailedAction('No failed transaction selected.');
    }
  };

  return (
    <div className="p-5 font-sans">
      <h2 className="text-2xl font-bold mb-4">Search / Filter Transactions</h2>
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 mb-4 w-64 border rounded"
      />
      <ul className="list-none p-0">
        {filteredTransactions.map(transaction => (
          <li key={transaction.id} className="mb-2">
            {transaction.type} - ${transaction.amount} ({transaction.date}, {transaction.status})
            <button onClick={() => handleView(transaction)} className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View</button>
          </li>
        ))}
      </ul>
      {selectedTransaction && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h3 className="text-xl font-semibold">Details for Transaction {selectedTransaction.id}</h3>
          <p className="mt-2">Type: {selectedTransaction.type}, Amount: ${selectedTransaction.amount}, Date: {selectedTransaction.date}, Status: {selectedTransaction.status}</p>
          <button onClick={generateSummary} className="mr-2 mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Generate Summary Report</button>
          <button onClick={() => manageFailed(selectedTransaction)} className="ml-2 mt-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Manage Failed</button>
          <button onClick={() => setSelectedTransaction(null)} className="ml-2 mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Close</button>
          {summaryReport && <p className="mt-2">{summaryReport}</p>}
          {failedAction && <p className="mt-2">{failedAction}</p>}
        </div>
      )}
    </div>
  );
};

export default SearchFilterTransactions;