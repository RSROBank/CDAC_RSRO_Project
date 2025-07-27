import React, { useState } from "react";

const CustomersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCustomerId, setSearchCustomerId] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = [
    { Accid: "1", name: "Rahul Verma", accounts: { cards: 2, loans: 1, fds: 1 } },
    { Accid: "2", name: "Verma Rahul", accounts: { cards: 1, loans: 0, fds: 2 } },
  ];

  const filteredCustomers = customers.filter((customer) => {
    const customername = customer.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchescustId = customer.Accid
      .toLowerCase()
      .includes(searchCustomerId.toLowerCase());
    return customername && matchescustId;
  });

  return (
    <div className="bg-[#FDFCF9] min-h-screen p-6 font-sans">
      <div className="max-w-xl mx-auto bg-white border border-gray-300 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-center mb-4 text-[#0B2E53] border-b pb-2">
          Search / Filter Customers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by Acc. ID"
            value={searchCustomerId}
            onChange={(e) => setSearchCustomerId(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />

          <input
            type="text"
            placeholder="Search customers by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
        </div>

        <div className="space-y-4">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <div
                key={customer.Accid}
                className="p-4 border rounded-lg shadow-sm bg-[#F9F7F2]"
              >
                <div className="text-lg font-medium text-[#0B2E53] mb-2">
                  Account id : {customer.Accid}
                </div>
                <div className="text-lg font-medium text-[#0B2E53] mb-2">
                  Customer Name : {customer.name}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCustomer(customer)}
                    className="bg-[#0B2E53] text-white px-4 py-1 rounded hover:bg-[#08213D]"
                  >
                    View
                  </button>
                  <button
                    onClick={() => alert(`Updating ${customer.name}'s details`)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => alert(`Assisting ${customer.name}`)}
                    className="bg-[#C89D2A] text-white px-4 py-1 rounded hover:bg-[#A77E20]"
                  >
                    Assist
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No customers found.</p>
          )}
        </div>

        {/* Details View */}
        {selectedCustomer && (
          <div className="mt-6 p-4 bg-[#F9F7F2] border border-[#C89D2A] rounded-lg shadow">
            <h3 className="text-lg font-semibold text-[#0B2E53] mb-2">
              Details for {selectedCustomer.name}
            </h3>
            <ul className="list-disc pl-5 text-[#0B2E53]">
              <li>Cards Linked: {selectedCustomer.accounts.cards}</li>
              <li>Loans: {selectedCustomer.accounts.loans}</li>
              <li>FDs: {selectedCustomer.accounts.fds}</li>
            </ul>
            <button
              onClick={() => setSelectedCustomer(null)}
              className="mt-4 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersManagement;
