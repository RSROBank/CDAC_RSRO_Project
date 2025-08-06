import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const EmployeeManagement = () => {
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [performanceData] = useState({
    1: { processedFDs: 3, processedLoans: 2, rating: "A" },
    2: { processedFDs: 1, processedLoans: 5, rating: "B+" },
  });

  const employees = [
    {
      id: "1",
      name: "Omkar Telang",
      email: "omkar@example.com",
      phone: "1234567890",
      documents: ["Aadhar.pdf", "PanCard.pdf"],
    },
    {
      id: "2",
      name: "Ravi Ranjan",
      email: "ravi@example.com",
      phone: "9876543210",
      documents: ["Aadhar.pdf"],
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
  const navigate = useNavigate()

  const handleAddEmployee = () => {
    navigate("/employeeSignup");
  };
  return (
    <div className="bg-[#FDFCF9] min-h-screen p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#0B2E53] mb-6 text-center border-b pb-2">
          Employee Management
        </h2>

  {/* Centered Button */}
    <div className="flex justify-center items-center my-6">
      
      <button  className="bg-[#0B2E53] text-white px-6 py-2 rounded hover:bg-[#08213D]"
      onClick={handleAddEmployee}>
        Add Employee
      </button>
      </div>
    


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border border-[#C89D2A] rounded px-3 py-2 focus:ring-2 focus:ring-[#C89D2A] focus:outline-none"
          />
          <input
            type="text"
            placeholder="Search by Employee ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="border border-[#C89D2A] rounded px-3 py-2 focus:ring-2 focus:ring-[#C89D2A] focus:outline-none"
          />
        </div>

        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              className="p-4 mb-4 bg-[#F9F7F2] rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-[#0B2E53]">{emp.name}</p>
                <p className="text-sm text-gray-700">ID: {emp.id}</p>
              </div>
              <button
                onClick={() => setSelectedEmployee(emp)}
                className="bg-[#0B2E53] text-white px-4 py-1 rounded hover:bg-[#08213D]"
              >
                View
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-[#C89D2A] font-medium">
            No matching employees found.
          </p>
        )}


        {selectedEmployee && (
          <div className="mt-6 p-4 bg-[#F9F7F2] border border-[#C89D2A] rounded-lg shadow space-y-4">
            <h3 className="text-lg font-semibold text-[#0B2E53] mb-2">
              Profile: {selectedEmployee.name}
            </h3>
            <ul className="list-disc pl-5 text-[#0B2E53] space-y-1">
              <li>Email: {selectedEmployee.email}</li>
              <li>Phone: {selectedEmployee.phone}</li>
              <li>
                Documents:{" "}
                {selectedEmployee.documents.map((doc, idx) => (
                  <span key={idx} className="text-[#C89D2A] underline mr-2">
                    {doc}
                  </span>
                ))}
              </li>
            </ul>

            <div className="border-t pt-4 border-[#C89D2A]">
              <h4 className="text-md font-semibold mb-2 text-[#0B2E53]">
                Processed FD/Loan Summary
              </h4>
              <p className="text-sm text-gray-800">
                Processed FDs:{" "}
                {performanceData[selectedEmployee.id]?.processedFDs || 0}
              </p>
              <p className="text-sm text-gray-800">
                Processed Loans:{" "}
                {performanceData[selectedEmployee.id]?.processedLoans || 0}
              </p>
              <p className="text-sm text-gray-800">
                Performance Rating:{" "}
                {performanceData[selectedEmployee.id]?.rating || "N/A"}
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
