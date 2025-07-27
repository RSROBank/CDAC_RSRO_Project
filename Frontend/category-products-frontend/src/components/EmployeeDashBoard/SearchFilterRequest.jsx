import React, { useState } from 'react';

const SearchFilterRequests = () => {
  const [filters, setFilters] = useState({ name: '', id: '', status: '' });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [remarks, setRemarks] = useState('');

  const requests = [
    { id: 1, type: 'Application', name: 'App Request 1', status: 'Pending' },
    { id: 2, type: 'Loan', name: 'Loan Request 1', status: 'Pending' },
    { id: 3, type: 'FD', name: 'FD Request 1', status: 'Approved' },
    { id: 4, type: 'Loan', name: 'Loan Request 2', status: 'Rejected' },
  ];

  const filteredRequests = requests.filter((req) =>
    req.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    req.id.toString().includes(filters.id) &&
    req.status.toLowerCase().includes(filters.status.toLowerCase())
  );

  const handleApprove = () => {
    if (!remarks) return alert('Please enter remarks.');
    alert(` Approved ${selectedRequest.type} (${selectedRequest.name}) with remarks: "${remarks}"`);
    setSelectedRequest(null);
    setRemarks('');
  };

  const handleReject = () => {
    if (!remarks) return alert('Please enter remarks.');
    alert(` Rejected ${selectedRequest.type} (${selectedRequest.name}) with remarks: "${remarks}"`);
    setSelectedRequest(null);
    setRemarks('');
  };

  return (
    <div className="bg-[#FDFCF9] min-h-screen p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white border border-gray-300 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-center text-[#0B2E53] border-b pb-2 mb-4">
          Search / Filter Requests
        </h2>

        {/* Filter Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <input
            type="text"
            placeholder="Search by Name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="p-2 border border-[#C89D2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
          <input
            type="text"
            placeholder="Filter by ID"
            value={filters.id}
            onChange={(e) => setFilters({ ...filters, id: e.target.value })}
            className="p-2 border border-[#C89D2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
          <input
            type="text"
            placeholder="Filter by Status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="p-2 border border-[#C89D2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
        </div>

        {/* Request List */}
        <div className="space-y-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 bg-[#F9F7F2] rounded-xl flex justify-between items-center shadow"
              >
                <div>
                  <p className="font-medium text-[#0B2E53]">{req.name}</p>
                  <p className="text-sm text-gray-700">
                    Type: {req.type} | Status: {req.status}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRequest(req)}
                  className="bg-[#0B2E53] text-white px-4 py-1 rounded hover:bg-[#08213D]"
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-200">No matching requests found.</p>
          )}
        </div>

        {/* Request Details View */}
        {selectedRequest && (
          <div className="mt-6 bg-white border border-[#C89D2A] rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold text-[#0B2E53] mb-2">
              {selectedRequest.type} Request - {selectedRequest.name}
            </h3>
            <ul className="list-disc list-inside text-[#0B2E53] mb-3">
              <li>ID: {selectedRequest.id}</li>
              <li>Status: {selectedRequest.status}</li>
              <li>Type: {selectedRequest.type}</li>
            </ul>

            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks here..."
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleApprove}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={handleReject}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  setSelectedRequest(null);
                  setRemarks('');
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default SearchFilterRequests;
