// src/components/Dashboard/DashboardHome.js
import React from 'react';
import ExpenditureCard from './ExpenditureCard';
import MiniStatement from './MiniStatement';

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      {/* User Info and Card Image */}
      <div className="flex gap-6">
        <div className="bg-white p-4 shadow-md rounded w-1/2">
          <h2 className="text-lg font-semibold mb-2">Full Name:</h2>
          <p>Rahul Verma</p>
          <p>Account Number: 1234567890</p>
          <p>Mobile Number: +91-9876543210</p>
          <p>Email: rahul@example.com</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded w-1/2 flex items-center justify-center">
          <img src="https://via.placeholder.com/200x120.png?text=Bank+Card" alt="Card" className="rounded" />
        </div>
      </div>

      {/* Expenditure Card */}
      <ExpenditureCard />

      {/* Mini Statement */}
      <MiniStatement />
    </div>
  );
};

export default DashboardHome;
