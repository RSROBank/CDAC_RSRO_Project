import React, { useEffect, useState } from "react";

const FDLoanSearchComponent = () => {
  const [fdData, setFdData] = useState([]);
  const [filter, setFilter] = useState({ id: "", amount: "", interest: "" });

  // Dummy data fallback
  useEffect(() => {
    const dummyFDs = [
      {
        id: 1,
        amount: 10000,
        date: "2025-07-01",
        interest: "6.5%",
        period: "12 months",
      },
      {
        id: 2,
        amount: 20000,
        date: "2025-06-15",
        interest: "7%",
        period: "24 months",
      },
      {
        id: 3,
        amount: 15000,
        date: "2025-05-10",
        interest: "6.75%",
        period: "18 months",
      },
    ];
    setFdData(dummyFDs);
  }, []);

  const filteredFDs = fdData.filter((item) => {
    return (
      (filter.id === "" || item.id.toString().includes(filter.id)) &&
      (filter.amount === "" ||
        item.amount.toString().includes(filter.amount)) &&
      (filter.interest === "" || item.interest.includes(filter.interest))
    );
  });

  return (
    <div className="bg-[#FDFCF9] min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#0B2E53]">
          Search FD by Amount and Interest Rate
        </h2>

        {/* Filter Section */}
        <div className="bg-white shadow-md rounded-2xl p-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <input
            type="text"
            placeholder="Filter by FD ID"
            value={filter.id}
            onChange={(e) => setFilter({ ...filter, id: e.target.value })}
            className="w-full p-2 rounded-xl border border-[#0B2E53]"
          /> */}
          <input
            type="text"
            placeholder="Filter by Amount"
            value={filter.amount}
            onChange={(e) => setFilter({ ...filter, amount: e.target.value })}
            className="w-full p-2 rounded-xl border border-[#0B2E53] focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
          <input
            type="text"
            placeholder="Filter by Interest Rate"
            value={filter.interest}
            onChange={(e) => setFilter({ ...filter, interest: e.target.value })}
            className="w-full p-2 rounded-xl border border-[#0B2E53] focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
        </div>

        {/* FD List */}
        <div className="space-y-4">
          {filteredFDs.length > 0 ? (
            filteredFDs.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-4 border border-[#0B2E53]/10 flex flex-col md:flex-row justify-between items-center"
              >
                <div className="text-[#0B2E53] space-y-1">
                  {/* <p><strong>ID:</strong> {item.id}</p> */}
                  <p>
                    <strong>Amount:</strong> ₹{item.amount}
                  </p>
                  <p>
                    <strong>Interest:</strong> {item.interest}
                  </p>
                  <p>
                    <strong>Time Period:</strong> {item.period}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {item.date}
                  </p>
                </div>
                <button className="mt-4 md:mt-0 bg-[#0B2E53] text-white py-2 px-5 rounded-lg hover:bg-[#C89D2A] transition-all">
                  Apply
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              No matching FD records found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FDLoanSearchComponent;
