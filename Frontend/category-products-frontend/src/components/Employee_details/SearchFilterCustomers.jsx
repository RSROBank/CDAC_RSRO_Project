import React, { useState } from 'react';

const SearchFilterCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = [
    { id: 1, name: 'John Doe', accounts: { cards: 2, loans: 1, fds: 1 } },
    { id: 2, name: 'Jane Smith', accounts: { cards: 1, loans: 0, fds: 2 } },
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleView = (customer) => setSelectedCustomer(customer);

  const handleUpdate = (customer) => {
    // Partial update logic here
    alert(`Updating ${customer.name}'s details`);
  };

  const handleAssist = (customer) => {
    // Assist customer logic here
    alert(`Assisting ${customer.name}`);
  };

  return (
    <div className="p-5 font-sans">
      <h2 className="text-2xl font-bold mb-4">Search / Filter Customers</h2>
      <input
        type="text"
        placeholder="Search customers..."
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 mb-4 w-64 border rounded"
      />
      <ul className="list-none p-0">
        {filteredCustomers.map(customer => (
          <li key={customer.id} className="mb-2">
            {customer.name}
            <button onClick={() => handleView(customer)} className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View</button>
            <button onClick={() => handleUpdate(customer)} className="ml-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Update</button>
            <button onClick={() => handleAssist(customer)} className="ml-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Assist</button>
          </li>
        ))}
      </ul>
      {selectedCustomer && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h3 className="text-xl font-semibold">Details for {selectedCustomer.name}</h3>
          <p className="mt-2">Linked Accounts: Cards: {selectedCustomer.accounts.cards}, Loans: {selectedCustomer.accounts.loans}, FDs: {selectedCustomer.accounts.fds}</p>
          <button onClick={() => setSelectedCustomer(null)} className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Close</button>
        </div>
      )}
    </div>
  );
};

export default SearchFilterCustomers;