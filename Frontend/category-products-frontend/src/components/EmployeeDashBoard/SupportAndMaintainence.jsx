import React, { useState } from 'react';

const SupportMaintenanceLoans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [response, setResponse] = useState('');
  const [notifications, setNotifications] = useState(['New ticket from John Doe', 'Audit log updated']);

  const loans = [
    { id: 1, customer: 'John Doe', amount: 5000, status: 'Active' },
    { id: 2, customer: 'Jane Smith', amount: 7500, status: 'Active' },
  ];

  const filteredLoans = loans.filter(loan =>
    loan.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.id.toString().includes(searchTerm)
  );

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleView = (loan) => setSelectedLoan(loan);

  const handleRespond = (loan) => {
    if (response) {
      alert(`Responded to ${loan.customer} with: ${response}`);
      setResponse('');
      setSelectedLoan(null);
    } else {
      alert('Please enter a response before submitting.');
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
          <h3 className="text-xl font-semibold">Support for {selectedLoan.customer}</h3>
          <div className="mt-2">
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Respond to customer query/ticket..."
              className="mt-2 p-2 w-full border rounded"
            />
            <button onClick={() => handleRespond(selectedLoan)} className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Submit Response</button>
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-medium">Notifications & Audit Log</h4>
            <ul className="list-disc pl-5 mt-2">
              {notifications.map((note, index) => (
                <li key={index} className="mt-1">{note}</li>
              ))}
            </ul>
          </div>
          <button onClick={() => { setSelectedLoan(null); setResponse(''); }} className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Close</button>
        </div>
      )}
    </div>
  );
};

export default SupportMaintenanceLoans;