// src/components/Dashboard/MainContent.js
import React from 'react';
import DashboardHome from './DashboardHome';
import Statements from './Statements';

const MainContent = ({ selected }) => {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      {selected === 'Dashboard' && <DashboardHome />}
      {/* Add: `else if` for other options like Loan, Statements etc later */}
      {selected === 'Statements' && <Statements />}
    </div>
  );
};

export default MainContent;
