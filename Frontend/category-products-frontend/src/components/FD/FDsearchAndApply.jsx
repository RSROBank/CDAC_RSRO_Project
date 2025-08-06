import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { saveLoanByUserId, createLoanQuery } from "../../services/userService";

const FDLoanSearchComponent = () => {
  const [viewType, setViewType] = useState("FD");
  const [userId, setUserId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [filter, setFilter] = useState({ amount: "", interest: "", status: "" });

  const [fdData, setFdData] = useState([]);
  const [loanData, setLoanData] = useState([]);

  useEffect(() => {
    setFdData([
      {
        id: 1,
        amount: 10000,
        startDate: "2025-07-01",
        interest: 6.5,
        tenureMonths: 12,
        status: "PENDING",
        empReferenceId: 1,
      },
      {
        id: 2,
        amount: 20000,
        startDate: "2025-06-15",
        interest: 7,
        tenureMonths: 24,
        status: "PENDING",
        empReferenceId: 1,
      },
    ]);

    setLoanData([
      {
        id: "L001",
        tenure: "12",
        amount: 50000,
        emi: 4167,
        emiLeft: 10,
        createdDate: "2025-06-01",
        interestRate: 8,
      },
      {
        id: "L002",
        tenure: "24",
        amount: 100000,
        emi: 4167,
        emiLeft: 24,
        createdDate: "2025-07-01",
        interestRate: 7.5,
      },
    ]);
  }, []);

  // Filtering logic
  const filteredFDs = fdData.filter((fd) => {
    return (
      (filter.amount === "" || fd.amount.toString().includes(filter.amount)) &&
      (filter.interest === "" || fd.interest.toString().includes(filter.interest))
    );
  });

  const filteredLoans = loanData.filter((loan) => {
    return (
      (filter.amount === "" || loan.amount.toString().includes(filter.amount)) &&
      (filter.status === "" || loan.status?.toLowerCase().includes(filter.status.toLowerCase()))
    );
  });

  const handleApplyClick = async (item) => {
    const token = sessionStorage.getItem("jwt");
    try {
      setLoading(true);
      setStatus("Applying...");

      if (viewType === "FD") {
        const response = await fetch("http://localhost:8080/user/deposit/savedeposit", {
          method: "POST",
          headers: { "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
           },
          body: JSON.stringify({
            principalAmount: item.amount,
            interest: item.interest,
            tenureMonths: item.tenureMonths,
            startDate: `${item.startDate}T00:00:00`,
            status: "PENDING",
            empReferenceId: item.empReferenceId,
            userId: userId,
            type: "FD"
          }),
        });

        const result = await response.json();
        console.log("FD Applied:", result);
        setStatus("FD Application submitted successfully!");
      } else {
        const response = await saveLoanByUserId( item);
        console.log("Loan Applied:", response);
        toast.success("Loan application submitted successfully!");
        setStatus("Loan Application submitted successfully!");
      }
    } catch (error) {
      console.error("Error during apply:", error);
      setStatus("Failed to apply. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FDFCF9] min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#0B2E53]">
          {viewType === "FD" ? "Fixed Deposit" : "Loan"} Search and Apply
        </h2>

        {/* Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            className="bg-[#0B2E53] text-white px-4 py-2 rounded-xl hover:bg-[#C89D2A] transition-all"
            onClick={() => {
              setViewType(viewType === "FD" ? "LOAN" : "FD");
              setStatus("");
              setFilter({ amount: "", interest: "", status: "" });
            }}
          >
            Switch to {viewType === "FD" ? "Loan" : "FD"} View
          </button>
        </div>

        {/* Filter Inputs */}
        <div className="bg-white shadow-md rounded-2xl p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Filter by Amount"
            value={filter.amount}
            onChange={(e) => setFilter({ ...filter, amount: e.target.value })}
            className="w-full p-2 rounded-xl border border-[#0B2E53] focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
          {viewType === "FD" ? (
            <input
              type="text"
              placeholder="Filter by Interest Rate"
              value={filter.interest}
              onChange={(e) => setFilter({ ...filter, interest: e.target.value })}
              className="w-full p-2 rounded-xl border border-[#0B2E53] focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
            />
          ) : (
            <input
              type="text"
              placeholder="Filter by Status"
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="w-full p-2 rounded-xl border border-[#0B2E53] focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
            />
          )}
        </div>

        {/* Status Message */}
        {status && (
          <div className="text-center mb-4 text-[#0B2E53] font-medium">{status}</div>
        )}

        {/* Card Display in Grid (Square Banking Style) */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {(viewType === "FD" ? filteredFDs : filteredLoans).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-5 border border-[#0B2E53]/10 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex flex-col justify-between"
            >
              <div className="text-[#0B2E53] text-sm space-y-2">
                <h4 className="text-lg font-semibold text-[#0B2E53] mb-2">
                  {viewType === "FD" ? "Fixed Deposit" : "Loan"} #{item.id}
                </h4>

                <p><strong>Amount:</strong> ₹{item.amount}</p>
                {viewType === "FD" ? (
                  <>
                    <p><strong>Interest:</strong> {item.interest}%</p>
                    <p><strong>Tenure:</strong> {item.tenureMonths} months</p>
                    <p><strong>Start Date:</strong> {item.startDate}</p>
                    <p><strong>Status:</strong> {item.status}</p>
                    <p><strong>Emp ID:</strong> {item.empReferenceId}</p>
                  </>
                ) : (
                  <>
                    <p><strong>Tenure:</strong> {item.tenure} months</p>
                    <p><strong>EMI:</strong> ₹{item.emi}</p>
                    <p><strong>EMIs Left:</strong> {item.emiLeft}</p>
                    <p><strong>Interest Rate:</strong> {item.interestRate}%</p>
                    <p><strong>Start Date:</strong> {item.createdDate}</p>
                  </>
                )}
              </div>

              <button
                className="mt-4 bg-[#0B2E53] text-white py-2 rounded-lg hover:bg-[#C89D2A] transition-all"
                onClick={() => handleApplyClick(item)}
                disabled={loading}
              >
                {loading ? "Applying..." : `Apply for ${viewType}`}
              </button>
            </div>
          ))}

          {(viewType === "FD" ? filteredFDs.length === 0 : filteredLoans.length === 0) && (
            <p className="col-span-full text-center text-gray-600">
              No matching records found.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default FDLoanSearchComponent;
