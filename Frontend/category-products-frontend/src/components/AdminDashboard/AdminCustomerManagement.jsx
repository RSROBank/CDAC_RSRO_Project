import React, { useState } from "react";

const CustomersManagement = () => {
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState("");

  const customers = [
    {
      id: "1",
      name: "Rahul Verma",
      email: "rahul@gmail.com",
      phone: "1234567890",
      documents: ["Aadhar.pdf", "PanCard.pdf"],
      accounts: { cards: 2, loans: 1, fds: 1 },
    },
    {
      id: "2",
      name: "Verma Rahul",
      email: "verma@example.com",
      phone: "9876543210",
      documents: ["Aadhar.pdf"],
      accounts: { cards: 1, loans: 0, fds: 2 },
    },
  ];

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchName.toLowerCase()) &&
      c.id.toLowerCase().includes(searchId.toLowerCase())
  );

  const handleDelete = (customerId) => {
    alert(`Customer ID ${customerId} deleted (mock action).`);
  };

  const handleUpdate = (customerId) => {
    alert(`Customer ID ${customerId} deleted (mock action).`);
  };

  const handleSendNotification = () => {
    alert(`Notification sent: "${notificationMsg}"`);
    setNotificationMsg("");
  };

  return (
    <div className="bg-[#FDFCF9] min-h-screen p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#0B2E53] mb-6 text-center border-b pb-2">
          Admin: Customer Management
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border border-[#C89D2A] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
          <input
            type="text"
            placeholder="Search by Customer ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="border border-[#C89D2A] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
        </div>

        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="p-4 mb-4 bg-[#F9F7F2] rounded shadow flex justify-between items-center"
            >
              <div className="text-[#0B2E53]">
                <p className="font-semibold">{customer.name}</p>
                <p className="text-sm text-gray-700">ID: {customer.id}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCustomer(customer)}
                  className="bg-[#0B2E53] text-white px-4 py-1 rounded hover:bg-[#08213D]"
                >
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-[#C89D2A]">No matching customers found.</p>
        )}

        {selectedCustomer && (
          <div className="mt-6 p-4 bg-[#F9F7F2] border border-[#C89D2A] rounded-lg shadow space-y-4">
            <h3 className="text-lg font-semibold text-[#0B2E53] mb-2">
              Full Profile for {selectedCustomer.name}
            </h3>

            <ul className="list-disc pl-5 text-[#0B2E53] space-y-1">
              <li>Cards Linked: {selectedCustomer.accounts.cards}</li>
              <li>Loans: {selectedCustomer.accounts.loans}</li>
              <li>FDs: {selectedCustomer.accounts.fds}</li>
              <li>Email: johndoe@example.com</li>
              <li>Phone: +91-9876543210</li>
            </ul>

            {/* Document Photo Preview */}
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-1 text-[#0B2E53]">
                Uploaded Document Preview
              </h4>
              <img
                src="src/assets/Images/Cardsampleimage.png"
                alt="Document Preview"
                className="w-60 border border-gray-300 rounded-lg shadow-md"
              />
            </div>

            {/* Admin Actions */}
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={handleSendNotification}
                className="bg-[#C89D2A] text-white px-4 py-1 rounded hover:bg-[#A77E20]"
              >
                Notify
              </button>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
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

export default CustomersManagement;
