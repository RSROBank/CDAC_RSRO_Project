import React, { useState } from "react";

const UserDataManagement = () => {
  const [filters, setFilters] = useState({ name: "", userId: "", status: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [interestUpdate, setInterestUpdate] = useState("");

  const users = [
    {
      id: "U001",
      name: "Rahul Verma",
      status: "Active",
      email: "rahul@gmail.com",
      account: { balance: 12000, accountNo: "ACC1234" },
      loan: { amount: 50000, interest: "9.5%", tenure: "12 months" },
      fd: { amount: 20000, interest: "6.8%", tenure: "6 months" },
      card: { type: "Debit", limit: 5000 },
    },
    {
      id: "U002",
      name: "Verma Rahul",
      status: "Deactivated",
      email: "verma@gmail.com",
      account: { balance: 8000, accountNo: "ACC5678" },
      loan: { amount: 30000, interest: "10%", tenure: "24 months" },
      fd: { amount: 15000, interest: "6.5%", tenure: "9 months" },
      card: { type: "Credit", limit: 20000 },
    },
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      u.id.toLowerCase().includes(filters.userId.toLowerCase()) &&
      u.status.toLowerCase().includes(filters.status.toLowerCase())
  );

  const handleUpdateInterest = () => {
    alert(`Interest/Tenure updated: ${interestUpdate}`);
    setInterestUpdate("");
  };

  const handleSoftDelete = (id) => {
    alert(`User ${id} marked as Soft Deleted`);
  };

  const handleDeactivate = (id) => {
    alert(`User ${id} Deactivated`);
  };

  const handleViewLogs = () => {
    setAuditLogs([
      "User Rahul updated FD interest on 2025-07-23",
      "Loan tenure changed for U002",
    ]);
  };

  return (
    <div className="bg-[#FDFCF9] min-h-screen p-6 font-sans">
  <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-[#0B2E53] mb-6 text-center border-b pb-2">
      Admin: User Data Management
    </h2>

    {/* Filter Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <input
        type="text"
        placeholder="Filter by Name"
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        className="border border-[#C89D2A] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
      />
      <input
        type="text"
        placeholder="User ID"
        value={filters.userId}
        onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
        className="border border-[#C89D2A] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
      />
      <input
        type="text"
        placeholder="Status (Active/Deactivated)"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="border border-[#C89D2A] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
      />
    </div>

    {/* Filtered Users */}
    {filteredUsers.length > 0 ? (
      filteredUsers.map((user) => (
        <div
          key={user.id}
          className="p-4 mb-4 bg-[#F9F7F2] rounded shadow flex justify-between items-center"
        >
          <div>
            <p className="font-semibold text-[#0B2E53]">
              {user.name} ({user.id})
            </p>
            <p className="text-sm text-gray-700">{user.status}</p>
          </div>
          <button
            onClick={() => setSelectedUser(user)}
            className="bg-[#0B2E53] text-white px-4 py-1 rounded hover:bg-[#08213D]"
          >
            View
          </button>
        </div>
      ))
    ) : (
      <p className="text-[#C89D2A] text-center font-medium">
        No matching users found.
      </p>
    )}

    {/* User Details */}
    {selectedUser && (
      <div className="mt-6 bg-white border border-[#C89D2A] rounded-lg p-5 shadow space-y-3">
        <h3 className="text-xl font-semibold text-[#0B2E53] mb-2">
          Profile: {selectedUser.name} ({selectedUser.id})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#0B2E53]">
          <div>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Status:</strong> {selectedUser.status}</p>
            <p>
              <strong>Account:</strong> ₹{selectedUser.account.balance} (No:{" "}
              {selectedUser.account.accountNo})
            </p>
          </div>
          <div>
            <p>
              <strong>Card:</strong> {selectedUser.card.type}, Limit: ₹
              {selectedUser.card.limit}
            </p>
            <p>
              <strong>Loan:</strong> ₹{selectedUser.loan.amount},{" "}
              {selectedUser.loan.interest}, {selectedUser.loan.tenure}
            </p>
            <p>
              <strong>FD:</strong> ₹{selectedUser.fd.amount},{" "}
              {selectedUser.fd.interest}, {selectedUser.fd.tenure}
            </p>
          </div>
        </div>

        <textarea
          placeholder="Update Interest Rate or Tenure..."
          value={interestUpdate}
          onChange={(e) => setInterestUpdate(e.target.value)}
          className="w-full mt-3 p-2 border border-gray-300 rounded"
        />

        <div className="flex gap-3 mt-3 flex-wrap">
          <button
            onClick={handleUpdateInterest}
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
          >
            Update Interest/Tenure
          </button>
          <button
            onClick={() => handleSoftDelete(selectedUser.id)}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
          >
            Soft Delete
          </button>
          <button
            onClick={() => handleDeactivate(selectedUser.id)}
            className="bg-yellow-600 text-white px-4 py-1 rounded hover:bg-yellow-700"
          >
            Deactivate
          </button>
          <button
            onClick={handleViewLogs}
            className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
          >
            View Audit Logs
          </button>
          <button
            onClick={() => setSelectedUser(null)}
            className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>

        {/* Audit Logs */}
        {auditLogs.length > 0 && (
          <div className="mt-4">
            <h4 className="text-md font-semibold text-[#0B2E53] mb-1">
              Audit Logs:
            </h4>
            <ul className="list-disc pl-5 text-[#0B2E53]">
              {auditLogs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )}
  </div>
</div>

  );
};

export default UserDataManagement;
