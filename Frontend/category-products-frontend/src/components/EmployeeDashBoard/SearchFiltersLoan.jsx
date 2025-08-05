import React, { useState, useEffect } from "react";
import axios from "axios";

const LoanFilterComponent = () => {
  const [filter, setFilter] = useState({ userId: "", status: "" });
  const [loanData, setLoanData] = useState([]); // must be an array
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [extendMessage, setExtendMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper to normalize backend response into an array
  const normalizeLoans = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    // common wrappers
    if (Array.isArray(data.content)) return data.content;
    if (Array.isArray(data.data)) return data.data;
    // sometimes paged object: { items: [...] }
    if (Array.isArray(data.items)) return data.items;
    // if it's a single object representing one loan
    if (typeof data === "object") return [data];
    return [];
  };

  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/user/loans/pending"); // adjust endpoint
        // Inspect response in console while developing:
        // console.log("raw response.data:", response.data);
        const normalized = normalizeLoans(response.data);
        setLoanData(normalized);
      } catch (err) {
        console.error("Failed to fetch loan data:", err);
        setError("Failed to load loans.");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  // Defensive filtering so `.filter` never runs on non-arrays
  const loansArray = Array.isArray(loanData) ? loanData : [];

  const filteredLoans = loansArray.filter((loan) => {
    // adjust property names depending on your backend (userId vs user_id etc)
    const loanUserId = loan.userId ?? loan.user_id ?? "";
    const loanStatus = (loan.status ?? "").toString();

    return (
      (filter.userId === "" ||
        loanUserId
          .toString()
          .toLowerCase()
          .includes(filter.userId.toLowerCase())) &&
      (filter.status === "" ||
        loanStatus.toLowerCase().includes(filter.status.toLowerCase()))
    );
  });

  const handleExtendLoan = () => {
    if (
      selectedLoan &&
      (selectedLoan.status ?? "").toString().toLowerCase() === "active"
    ) {
      setExtendMessage(
        `Loan extension requested for User ID ${selectedLoan.userId}.`
      );
    } else {
      setExtendMessage("Loan extension only allowed if status is Active.");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white border border-gray-300 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-center text-[#0B2E53] border-b pb-2 mb-4">
          Search / Filter Loans
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <input
            type="text"
            placeholder="Filter by User ID"
            value={filter.userId}
            onChange={(e) => setFilter({ ...filter, userId: e.target.value })}
            className="p-2 border border-[#C89D2A] rounded focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
          <input
            type="text"
            placeholder="Filter by Status"
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="p-2 border border-[#C89D2A] rounded focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
        </div>

        {loading && <p className="text-center text-sm">Loading loans...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        <div className="space-y-4">
          {filteredLoans.map((loan, index) => (
            <div
              key={loan.id ?? loan.userId ?? index}
              className="bg-[#F9F7F2] rounded-xl p-4 flex justify-between items-center shadow"
            >
              <div className="text-[#0B2E53] space-y-1 text-sm md:text-base">
                <p>
                  <strong>User ID:</strong> {loan.userId ?? loan.user_id}
                </p>
                <p>
                  <strong>Amount:</strong> ₹
                  {loan.amount?.toString() ?? loan.amount}
                </p>
                <p>
                  <strong>Status:</strong> {loan.status}
                </p>
                <p>
                  <strong>Tenure:</strong>{" "}
                  {loan.tenureMonths ?? loan.tenure_months} months
                </p>
                <p>
                  <strong>EMI:</strong> ₹{loan.emiAmount ?? loan.emi_amount}
                </p>
                <p>
                  <strong>Approved Date:</strong>{" "}
                  {loan.approvedDate
                    ? new Date(loan.approvedDate).toLocaleString()
                    : ""}
                </p>
              </div>
              <button
                className="mt-4 md:mt-0 bg-[#0B2E53] text-white px-5 py-2 rounded hover:bg-[#08213D]"
                onClick={() => setSelectedLoan(loan)}
              >
                View Details
              </button>
            </div>
          ))}

          {filteredLoans.length === 0 && !loading && (
            <p className="text-center text-[#C89D2A] font-medium">
              No loans found.
            </p>
          )}
        </div>

        {selectedLoan && (
          <div className="mt-6 bg-white p-5 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-[#0B2E53]">
              EMI Schedule for User ID: {selectedLoan.userId}
            </h3>
            <ul className="list-disc pl-6 text-[#0B2E53] text-sm space-y-1">
              <li>
                Total EMIs: {selectedLoan.totalEmis ?? selectedLoan.total_emis}
              </li>
              <li>
                EMI Amount: ₹{selectedLoan.emiAmount ?? selectedLoan.emi_amount}
              </li>
              <li>
                Tenure:{" "}
                {selectedLoan.tenureMonths ?? selectedLoan.tenure_months} months
              </li>
              <li>Status: {selectedLoan.status}</li>
            </ul>
            <button
              className="mt-4 bg-[#C89D2A] text-white px-5 py-2 rounded hover:bg-[#A77E20]"
              onClick={handleExtendLoan}
            >
              Request Loan Extension
            </button>
            {extendMessage && (
              <p className="mt-3 text-green-700 font-semibold">
                {extendMessage}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanFilterComponent;
