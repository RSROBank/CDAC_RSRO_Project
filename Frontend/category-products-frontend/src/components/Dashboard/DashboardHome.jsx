// src/components/Dashboard/DashboardHome.js
import React, { useState } from 'react';
import ExpenditureCard from './ExpenditureCard';
import MiniStatement from './MiniStatement';
import CardComponent from '../Cardcomponant/carddetails';

const DashboardHome = () => {
  const [cardData] = useState({
      cardNumber: "1234 4568 1234 4568",
      cardHolder: "SUDHIR SINGH",
      expiry: "12/27",
      cardType: "Credit Card",
    });
  return (
    <div className="space-y-6">
      {/* User Info and Card Image */}
      <div className="flex gap-6">
        <div className="bg-white p-4 shadow-md rounded w-1/2">
          <h2 className="text-lg font-semibold mb-2">Full Name:</h2>
          <p>Sudhir Singh</p>
          <p>Account Number: 1234567890</p>
          <p>Mobile Number: +91-9876543210</p>
          <p>Email: s@example.com</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded w-1/2 flex items-center justify-center">
          {/* Card UI */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white rounded-2xl p-5 mb-6">
            <div className="text-sm mb-2">{cardData.cardType}</div>
            <div className="text-xl tracking-widest mb-6 font-mono">{cardData.cardNumber}</div>
            <div className="flex justify-between text-sm">
              <div>
                <div className="text-xs opacity-70">Card Holder</div>
                <div className="font-semibold">{cardData.cardHolder}</div>
              </div>
              <div>
                <div className="text-xs opacity-70">Valid Thru</div>
                <div className="font-semibold">{cardData.expiry}</div>
              </div>
            </div>
          </div>
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
