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
    <div className="bg-blue-50 min-h-screen p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center border-b pb-2">
          Admin: Customer Management
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
            placeholder="Search by Customer ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="p-4 mb-4 bg-blue-100 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-blue-900">{customer.name}</p>
                <p className="text-sm text-gray-700">ID: {customer.id}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCustomer(customer)}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No matching customers found.
          </p>
        )}

        {selectedCustomer && (
          <div className="mt-6 p-4 bg-white border border-blue-300 rounded-lg shadow space-y-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Full Profile for {selectedCustomer.name}
            </h3>

            <ul className="list-disc pl-5 text-blue-900 space-y-1">
              <li>Cards Linked: {selectedCustomer.accounts.cards}</li>
              <li>Loans: {selectedCustomer.accounts.loans}</li>
              <li>FDs: {selectedCustomer.accounts.fds}</li>
              <li>Email: johndoe@example.com</li>
              <li>Phone: +91-9876543210</li>
            </ul>

            {/* Document Photo Preview */}
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-1">
                Uploaded Document Preview
              </h4>
              <img
                src="src\assets\Images\Cardsampleimage.png"
                alt="Document Preview"
                className="w-60 border rounded-lg shadow-md"
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
                className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
              >
                Notify
              </button>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
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
