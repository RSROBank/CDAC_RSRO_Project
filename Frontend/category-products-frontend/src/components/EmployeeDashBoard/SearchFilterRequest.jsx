import React, { useState } from 'react';

const SearchFilterRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [remarks, setRemarks] = useState('');

  const requests = [
    { id: 1, type: 'Application', name: 'App Request 1', status: 'Pending' },
    { id: 2, type: 'Loan', name: 'Loan Request 1', status: 'Pending' },
    { id: 3, type: 'FD', name: 'FD Request 1', status: 'Pending' },
  ];

  const filteredRequests = requests.filter(request =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleView = (request) => setSelectedRequest(request);

  const handleApprove = (request) => {
    if (remarks) {
      alert(`Approved ${request.type}: ${request.name} with remarks: ${remarks}`);
      setSelectedRequest(null);
      setRemarks('');
    } else {
      alert('Please add remarks before approving.');
    }
  };

  const handleReject = (request) => {
    if (remarks) {
      alert(`Rejected ${request.type}: ${request.name} with remarks: ${remarks}`);
      setSelectedRequest(null);
      setRemarks('');
    } else {
      alert('Please add remarks before rejecting.');
    }
  };

  return (
    <div className="p-5 font-sans">
      <h2 className="text-2xl font-bold mb-4">Search / Filter Requests</h2>
      <input
        type="text"
        placeholder="Search requests..."
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 mb-4 w-64 border rounded"
      />
      <ul className="list-none p-0">
        {filteredRequests.map(request => (
          <li key={request.id} className="mb-2">
            {request.name} ({request.type} - {request.status})
            <button onClick={() => handleView(request)} className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View</button>
          </li>
        ))}
      </ul>
      {selectedRequest && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h3 className="text-xl font-semibold">Details for {selectedRequest.name}</h3>
          <p className="mt-2">Type: {selectedRequest.type}, Status: {selectedRequest.status}</p>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Add remarks..."
            className="mt-2 p-2 w-full border rounded"
          />
          <div className="mt-2">
            <button onClick={() => handleApprove(selectedRequest)} className="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
            <button onClick={() => handleReject(selectedRequest)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
            <button onClick={() => { setSelectedRequest(null); setRemarks(''); }} className="ml-2 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilterRequests;