import React, { useEffect, useState } from "react";

const FDLoanSearchComponent = () => {
  const [fdData, setFdData] = useState([]);
  const [filter, setFilter] = useState({ id: "", amount: "", interest: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState(1);

  // Dummy data
  useEffect(() => {
    const dummyFDs = [
      {
        id: 1,
        amount: 10000,
        startDate: "2025-07-01",
        interest: 6.5,
        tenureMonths: "12",
        status: "PENDING",
        empReferenceId: 1,

      },
      {
        id: 2,
        amount: 20000,
        startDate: "2025-06-15",
        interest: 7,
        tenureMonths: "24",
        status: "PENDING",
        empReferenceId: 1,

      },
      {
        id: 3,
        amount: 15000,
        startDate: "2025-05-10",
        interest: 6.75,
        tenureMonths: "18",
        status: "PENDING",
        empReferenceId: 1
      
      },
    ];
    setFdData(dummyFDs);
  }, []);

  // Filter logic
  const filteredFDs = fdData.filter((item) => {
    return (
      (filter.id === "" || item.id.toString().includes(filter.id)) &&
      (filter.amount === "" || item.amount.toString().includes(filter.amount)) &&
      (filter.interest === "" || item.interest.includes(filter.interest))
    );
  });

  // Apply button click handler
  const handleApplyClick = async (item) => {
    try {
      setLoading(true);
      setStatus("Applying...");

      const response = await fetch("http://localhost:8080/user/deposit/savedeposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          principalAmount: item.amount,
          interest: item.interest,
          tenureMonths: item.tenureMonths,
          startDate: `${item.startDate}T00:00:00`,
          status: "PENDING",
          empReferenceId: 1,
          userId: userId
        }),
      });

      if (!response.ok) {
        throw new Error("Loan application failed");
      }

      const result = await response.json();
      console.log("Loan applied successfully:", result);
      setStatus("Application submitted successfully!");
    } catch (error) {
      console.error("Apply error:", error);
      setStatus("Failed to apply. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FDFCF9] min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#0B2E53]">
          Search FD by Amount and Interest Rate
        </h2>

        {/* Filter Section */}
        <div className="bg-white shadow-md rounded-2xl p-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* Status Message */}
        {status && (
          <div className="text-center mb-4 text-[#0B2E53] font-medium">
             {status}
          </div>
        )}

        {/* FD List */}
        <div className="space-y-4">
          {filteredFDs.length > 0 ? (
            filteredFDs.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-4 border border-[#0B2E53]/10 flex flex-col md:flex-row justify-between items-center"
              >
                <div className="text-[#0B2E53] space-y-1">
                  <p><strong>Amount:</strong> ₹{item.amount}</p>
                  <p><strong>Interest:</strong> {item.interest}</p>
                  <p><strong>Time Period:</strong> {item.period}</p>
                  <p><strong>Start Date:</strong> {item.date}</p>
                  <p><strong>Status:</strong> {item.status}</p>
                  <p><strong>Emp Id:</strong> {item.empid}</p>
                </div>
                <button
                  className="mt-4 md:mt-0 bg-[#0B2E53] text-white py-2 px-5 rounded-lg hover:bg-[#C89D2A] transition-all"
                  onClick={() => handleApplyClick(item)}
                  disabled={loading}
                >
                  {loading ? "Applying..." : "Apply"}
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
