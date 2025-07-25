import React, { useState } from 'react';

const EmployeeManagement = () => {
  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [performanceData] = useState({
    '1': { processedFDs: 3, processedLoans: 2, rating: 'A' },
    '2': { processedFDs: 1, processedLoans: 5, rating: 'B+' },
  });

  const employees = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      documents: ['Aadhar.pdf', 'PanCard.pdf'],
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543210',
      documents: ['Aadhar.pdf'],
    },
  ];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchName.toLowerCase()) &&
      emp.id.includes(searchId)
  );

  const handleUpdate = (emp) => {
    alert(`Update profile for ${emp.name}`);
  };

  return (
    <div className="bg-blue-50 min-h-screen p-6 font-sans">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center border-b pb-2">
          Admin: Search / Filter Employee Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Search by Employee ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              className="p-4 mb-4 bg-blue-100 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-blue-900">{emp.name}</p>
                <p className="text-sm text-gray-700">ID: {emp.id}</p>
              </div>
              <button
                onClick={() => setSelectedEmployee(emp)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                View
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No matching employees found.</p>
        )}

        {selectedEmployee && (
          <div className="mt-6 p-5 bg-white border border-blue-300 rounded-lg shadow space-y-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Profile: {selectedEmployee.name}
            </h3>
            <ul className="list-disc pl-5 text-blue-900 space-y-1">
              <li>Email: {selectedEmployee.email}</li>
              <li>Phone: {selectedEmployee.phone}</li>
              <li>
                Documents:{' '}
                {selectedEmployee.documents.map((doc, idx) => (
                  <span key={idx} className="text-blue-700 underline mr-2">
                    {doc}
                  </span>
                ))}
              </li>
            </ul>

            <div className="border-t pt-4">
              <h4 className="text-md font-semibold mb-2 text-blue-700">
                Processed FD/Loan Summary
              </h4>
              <p className="text-sm text-gray-800">
                Processed FDs: {performanceData[selectedEmployee.id]?.processedFDs || 0}
              </p>
              <p className="text-sm text-gray-800">
                Processed Loans: {performanceData[selectedEmployee.id]?.processedLoans || 0}
              </p>
              <p className="text-sm text-gray-800">
                Performance Rating: {performanceData[selectedEmployee.id]?.rating || 'N/A'}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => handleUpdate(selectedEmployee)}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Update Profile
              </button>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
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

export default EmployeeManagement;
