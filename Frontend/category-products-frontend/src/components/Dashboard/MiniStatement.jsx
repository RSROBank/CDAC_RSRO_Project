// src/components/Dashboard/MiniStatement.js
import React from 'react';

const transactions = [
  { date: '2025-07-21', desc: 'ATM Withdrawal', amount: '-₹500' },
  { date: '2025-07-20', desc: 'Electricity Bill', amount: '-₹1200' },
  { date: '2025-07-19', desc: 'Salary Credit', amount: '+₹40,000' },
  { date: '2025-07-18', desc: 'Grocery Store', amount: '-₹900' },
  { date: '2025-07-17', desc: 'UPI to John', amount: '-₹300' },
];

const MiniStatement = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded">
      <h2 className="text-lg font-semibold mb-4">Mini Statement</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Date</th>
            <th className="text-left p-2">Description</th>
            <th className="text-right p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-100">
              <td className="p-2">{txn.date}</td>
              <td className="p-2">{txn.desc}</td>
              <td className="p-2 text-right">{txn.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MiniStatement;
