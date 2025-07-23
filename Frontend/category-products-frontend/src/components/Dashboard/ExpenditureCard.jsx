// src/components/Dashboard/ExpenditureCard.js
import React from 'react';

const ExpenditureCard = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded">
      <h2 className="text-lg font-semibold mb-4">Expenditure Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded text-center">
          <p className="text-sm">This Week</p>
          <p className="text-lg font-bold">₹2,500</p>
        </div>
        <div className="bg-green-100 p-4 rounded text-center">
          <p className="text-sm">This Month</p>
          <p className="text-lg font-bold">₹10,300</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded text-center">
          <p className="text-sm">This Year</p>
          <p className="text-lg font-bold">₹1,24,000</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenditureCard;
