import React, { useState } from "react";

const fdDataSample = [
  {
    fdId: "FD001",
    status: "Active",
    maturityDate: "2025-12-31",
    principalAmount: 10000,
    maturityAmount: 12000,
    createdDate: "2023-01-01",
    interestRate: 8,
  },
  {
    fdId: "FD002",
    status: "Matured",
    maturityDate: "2024-06-30",
    principalAmount: 5000,
    maturityAmount: 5500,
    createdDate: "2022-06-30",
    interestRate: 6,
  },
  // add more sample data here
];

const FDSearchFilterComponent = () => {
  const [searchFDId, setSearchFDId] = useState("");
  const [filterAmount, setFilterAmount] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Filter logic
  const filteredFDs = fdDataSample.filter((fd) => {
    const matchesFDId = fd.fdId.toLowerCase().includes(searchFDId.toLowerCase());
    const matchesAmount = filterAmount
      ? fd.principalAmount === Number(filterAmount) || fd.maturityAmount === Number(filterAmount)
      : true;
    const matchesDate = filterDate ? fd.maturityDate === filterDate || fd.createdDate === filterDate : true;
    const matchesStatus = filterStatus ? fd.status.toLowerCase().includes(filterStatus.toLowerCase()) : true;

    return matchesFDId && matchesAmount && matchesDate && matchesStatus;
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#FDFCF9] rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-[#0B2E53]">
        FD Search & Filter
      </h2>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* <input
          type="text"
          placeholder="Search by FD ID"
          value={searchFDId}
          onChange={(e) => setSearchFDId(e.target.value)}
          className="border border-[#0B2E53] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
        /> */}
        <input
          type="number"
          placeholder="Filter by Amount"
          value={filterAmount}
          onChange={(e) => setFilterAmount(e.target.value)}
          className="border border-[#0B2E53] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
        />
        <input
          type="date"
          placeholder="Filter by Date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border border-[#0B2E53] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
        />
        <input
          type="text"
          placeholder="Filter by Status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-[#0B2E53] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
        />
      </div>

      {/* Results */}
      {filteredFDs.length === 0 ? (
        <p className="text-center text-gray-500">No FD records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-[#0B2E53]">
            <thead>
              <tr className="bg-[#0B2E53] text-white">
                <th className="border border-[#0B2E53] px-4 py-2 text-left">FD ID</th>
                <th className="border border-[#0B2E53] px-4 py-2 text-left">Status</th>
                <th className="border border-[#0B2E53] px-4 py-2 text-left">Maturity Date</th>
                <th className="border border-[#0B2E53] px-4 py-2 text-left">Principal Amount</th>
                <th className="border border-[#0B2E53] px-4 py-2 text-left">Maturity Amount</th>
                <th className="border border-[#0B2E53] px-4 py-2 text-left">Created Date</th>
                <th className="border border-[#0B2E53] px-4 py-2 text-left">Interest Rate (%)</th>
              </tr>
            </thead>
            <tbody>
              {filteredFDs.map((fd) => (
                <tr key={fd.fdId} className="odd:bg-white even:bg-blue-50 text-[#0B2E53]">
                  <td className="border border-[#0B2E53] px-4 py-2">{fd.fdId}</td>
                  <td className="border border-[#0B2E53] px-4 py-2">{fd.status}</td>
                  <td className="border border-[#0B2E53] px-4 py-2">{fd.maturityDate}</td>
                  <td className="border border-[#0B2E53] px-4 py-2">₹{fd.principalAmount}</td>
                  <td className="border border-[#0B2E53] px-4 py-2">₹{fd.maturityAmount}</td>
                  <td className="border border-[#0B2E53] px-4 py-2">{fd.createdDate}</td>
                  <td className="border border-[#0B2E53] px-4 py-2">{fd.interestRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FDSearchFilterComponent;
