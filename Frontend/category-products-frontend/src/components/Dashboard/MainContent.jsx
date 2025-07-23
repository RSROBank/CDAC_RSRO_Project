// src/components/Dashboard/MainContent.js
import React from 'react';
import DashboardHome from './DashboardHome';
import Statements from './Statements';
import MoneyTransfer from '../SendMoney/MoneyTransfer';
import LoanSearch from '../SendMoney/Loan';
import FDLoanSearchComponent from '../FD/FDsearchAndApply';
import CardComponent from '../Cardcomponant/carddetails';
import FDSearchFilterComponent from '../CardDeposit/fdsearchfiltercomponent.jsx';

const MainContent = ({ selected }) => {
  return (
    <div className="flex-1 p-6 bg-gray-50">
      {selected === 'Dashboard' && <DashboardHome />}
      {/* Add: `else if` for other options like Loan, Statements etc later */}
      {selected === 'Statements' && <Statements />}
      {selected === 'Send Money' && <MoneyTransfer />}
      {selected === 'Loan' && <LoanSearch />}
      {selected === 'Apply for Loan/FD' && <FDLoanSearchComponent />}
      {selected === 'Manage Cards' && <CardComponent />}
      {selected === 'Deposit' && <FDSearchFilterComponent />}
    </div>
  );
};

export default MainContent;
