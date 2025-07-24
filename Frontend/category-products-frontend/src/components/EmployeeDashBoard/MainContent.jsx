// src/components/Dashboard/MainContent.js
import React from 'react';
import CustomersManagement from './SearchFilterCustomers.jsx';
import SearchFilterRequests from './SearchFilterRequest.jsx';
import SearchFilterTransactions from './SearchFilterTransactions.jsx';
import SupportMaintenanceLoans from './SupportAndMaintainence.jsx';
import SearchFilterLoans from './SearchFiltersLoan.jsx';

const MainContent = ({ selected }) => {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      {selected === 'Customer Management' && <CustomersManagement />}
      {/* Add: `else if` for other options like Loan, Statements etc later */}
      {selected === 'Approval of Accounts, FD, Loans' && <SearchFilterRequests />}
      {selected === 'Transaction Management' && <SearchFilterTransactions />}
      {selected === 'Loan EMI Management' && <SearchFilterLoans />}
      {selected === 'Support and Maintenance' && <SupportMaintenanceLoans />}
    </div>
  );
};

export default MainContent;
