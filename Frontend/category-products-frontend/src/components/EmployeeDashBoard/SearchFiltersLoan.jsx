import React, { useState } from 'react';

const SearchFilterLoans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [adminApproval, setAdminApproval] = useState(false);

  const loans = [
    { id: 1, customer: 'John Doe', amount: 5000, emiSchedule: ['2025-08-23', '2025-09-23', '2025-10-23'], status: 'Active' },
    { id: 2, customer: 'Jane Smith', amount: 7500, emiSchedule: ['2025-08-23', '2025-09-23'], status: 'Active' },
  ];

  const filteredLoans = loans.filter(loan =>
    loan.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.id.toString().includes(searchTerm)
  );

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleView = (loan) => setSelectedLoan(loan);

  const handleExtend = (loan) => {
    if (adminApproval) {
      alert(`Loan for ${loan.customer} extended successfully!`);
      setSelectedLoan(null);
      setAdminApproval(false);
    } else {
      alert('Admin approval required to extend the loan.');
    }
  };

  return (
    <div className="p-5 font-sans">
      <h2 className="text-2xl font-bold mb-4">Search / Filter Loans</h2>
      <input
        type="text"
        placeholder="Search loans..."
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 mb-4 w-64 border rounded"
      />
      <ul className="list-none p-0">
        {filteredLoans.map(loan => (
          <li key={loan.id} className="mb-2">
            {loan.customer} - ${loan.amount} ({loan.status})
            <button onClick={() => handleView(loan)} className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View</button>
          </li>
        ))}
      </ul>
      {selectedLoan && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h3 className="text-xl font-semibold">Details for Loan {selectedLoan.id}</h3>
          <p className="mt-2">Customer: {selectedLoan.customer}, Amount: ${selectedLoan.amount}</p>
          <p className="mt-2">EMI Schedule: {selectedLoan.emiSchedule.join(', ')}</p>
          <div className="mt-2">
            <label className="mr-2">Admin Approval:</label>
            <input
              type="checkbox"
              checked={adminApproval}
              onChange={(e) => setAdminApproval(e.target.checked)}
              className="mr-2"
            />
          </div>
          <button onClick={() => handleExtend(selectedLoan)} className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Extend Loan</button>
          <button onClick={() => { setSelectedLoan(null); setAdminApproval(false); }} className="ml-2 mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Close</button>
        </div>
      )}
    </div>
  );
};

export default SearchFilterLoans;