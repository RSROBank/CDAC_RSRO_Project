import React, { useEffect, useState } from "react";

const FDLoanSearchComponent = () => {
  const [fdData, setFdData] = useState([]);
  const [filter, setFilter] = useState({ id: "", amount: "", date: "" });

  useEffect(() => {
    fetch("/api/fd")
      .then((res) => res.json())
      .then((data) => setFdData(data));
  }, []);

  const filteredFDs = fdData.filter((item) => {
    return (
      (filter.id === "" || item.id.toString().includes(filter.id)) &&
      (filter.amount === "" || item.amount.toString().includes(filter.amount)) &&
      (filter.date === "" || item.date.includes(filter.date))
    );
  });

  return (
    <div className="bg-blue-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-6 text-blue-800">
          Search and Filter FD
        </h2>

        {/* FD Filter */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Filter by FD ID"
            value={filter.id}
            onChange={(e) => setFilter({ ...filter, id: e.target.value })}
            className="w-full p-2 rounded-xl border border-blue-300"
          />
          <input
            type="text"
            placeholder="Filter by Amount"
            value={filter.amount}
            onChange={(e) => setFilter({ ...filter, amount: e.target.value })}
            className="w-full p-2 rounded-xl border border-blue-300"
          />
          <input
            type="text"
            placeholder="Filter by Date"
            value={filter.date}
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            className="w-full p-2 rounded-xl border border-blue-300"
          />
        </div>

        {/* FD Section */}
        <div className="bg-white shadow-md rounded-2xl p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Fixed Deposit (FD)</h3>
          <ul className="list-disc list-inside text-blue-900 mb-4">
            {filteredFDs.length > 0 ? (
              filteredFDs.map((item, index) => (
                <li key={index}>
                  ID: {item.id}, Amount: {item.amount}, Date: {item.date}
                </li>
              ))
            ) : (
              <li>No matching FD details found...</li>
            )}
          </ul>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700">
            Apply for FD
          </button>
        </div>
      </div>
    </div>
  );
};

export default FDLoanSearchComponent;
