import { useEffect, useState } from "react";

function LoanCard({ item }) {
  const [status, setStatus] = useState(""); // success or error message
  const [loading, setLoading] = useState(false); // for disabling button

  const handleApplyClick = async () => {
    try {
      setLoading(true);
      setStatus("Applying...");

      const response = await fetch("http://localhost:8080/user/deposit/savedeposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: item.principalamount,
          interest: item.interest,
          period: item.tenuremonths,
          date: item.startdate,
          empid: item.empreferenceid,
          createdat: item.createdat,
          modifiedat: item.modifiedat,
        }),
      });

      if (!response.ok) {
        throw new Error("Loan application failed");
      }

      const result = await response.json();
      console.log("Loan applied successfully:", result);

      setStatus(" Application submitted successfully!");
    } catch (error) {
      console.error("Apply error:", error);
      setStatus("Failed to apply. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDeposits = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8080/user/deposit/getdeposit/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch deposits");
    }

    const result = await response.json();
    console.log("Fetched deposit data:", result);
    return result;
  } catch (error) {
    console.error("Error fetching deposits:", error);
    return [];
  }
};

useEffect(()=>{
  fetchDeposits(userId);
}, [])

 return (
    <div className="text-[#0B2E53] space-y-1 p-4 border rounded-md shadow-md">
      <p><strong>Amount:</strong> ₹{item.amount}</p>
      <p><strong>Interest:</strong> {item.interest}</p>
      <p><strong>Time Period:</strong> {item.period}</p>
      <p><strong>Start Date:</strong> {item.date}</p>

      <button
        onClick={handleApplyClick}
        className="mt-4 bg-[#0B2E53] text-white py-2 px-5 rounded-lg hover:bg-[#C89D2A] transition-all disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Applying..." : "Apply"}
      </button>

      {/* Show status message */}
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}

export default LoanCard;
