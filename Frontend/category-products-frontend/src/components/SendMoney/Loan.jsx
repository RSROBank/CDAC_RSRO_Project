import React, { useState } from 'react';

const LoanSearch = () => {
  const [loanId, setLoanId] = useState('');
  const [filter, setFilter] = useState('');
  const [loanDetails, setLoanDetails] = useState(null);

  const sampleLoans = [
    { id: 'L001', status: 'Active', tenure: '12 months', amount: 50000, emi: 4167, emiLeft: 10, createdDate: '2025-06-01', interestRate: '8%' },
    { id: 'L002', status: 'Pending', tenure: '24 months', amount: 100000, emi: 4167, emiLeft: 24, createdDate: '2025-07-01', interestRate: '7.5%' },
  ];

  const handleSearch = () => {
    const filteredLoan = sampleLoans.find(loan => 
      loan.id.toLowerCase() === loanId.toLowerCase() && 
      (filter.toLowerCase() === '' || 
       loan.status.toLowerCase().includes(filter.toLowerCase()) || 
       loan.amount.toString().includes(filter) || 
       loan.createdDate.includes(filter))
    );
    setLoanDetails(filteredLoan || null);
  };

  return (
    <div className="bg-white p-5 border border-gray-300 max-w-md mx-auto font-sans">
      <div className="mb-5">
        <h2 className="bg-blue-700 text-white p-2 text-center -mx-5 -mt-5 mb-5">Search based on Loan Id and Filter like amount, date, Status</h2>
        <div className="mb-4">
          <label className="block text-blue-700 font-bold">Loan ID:</label>
          <input
            type="text"
            className="w-full p-2 border border-blue-700 rounded"
            value={loanId}
            onChange={(e) => setLoanId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 font-bold">Filter (Amount/Date/Status):</label>
          <input
            type="text"
            className="w-full p-2 border border-blue-700 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-5">
        <h2 className="bg-blue-700 text-white p-2 text-center -mx-5 mb-5">Loan Details</h2>
        {loanDetails ? (
          <ul className="list-disc pl-5 text-blue-700">
            <li>Status: {loanDetails.status}, Tenure: {loanDetails.tenure}, Amount: ${loanDetails.amount}, EMI: ${loanDetails.emi}, EMI Left: {loanDetails.emiLeft}</li>
            <li>Created Date: {loanDetails.createdDate}, Interest Rate: {loanDetails.interestRate}</li>
          </ul>
        ) : (
          <p className="text-blue-700">No loan details found. Try searching with a valid Loan ID.</p>
        )}
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-700 text-white px-5 py-2 rounded hover:opacity-80"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default LoanSearch;