import React, { useState, useEffect } from "react";
import { createLoanQuery } from "../../services/userService";
import { toast } from "react-toastify";

const LoanSearchComponent = () => {
  const [loans, setLoans] = useState([]);
  const [filter, setFilter] = useState({ id: "", status: "", amount: "" });
  const [showQueryBox, setShowQueryBox] = useState(false);
  const [queryMessage, setQueryMessage] = useState('');
  const [queryTitle, setQueryTitle] = useState('');
  const [currentLoanId, setCurrentLoanId] = useState(null);
  const userId = 1;

  // Dummy Loan Data
  useEffect(() => {
    const dummyLoans = [
      {
        id: "L001",
        status: "Active",
        tenure: "12 months",
        amount: 50000,
        emi: 4167,
        emiLeft: 10,
        createdDate: "2025-06-01",
        interestRate: "8%",
      },
      {
        id: "L002",
        status: "Pending",
        tenure: "24 months",
        amount: 100000,
        emi: 4167,
        emiLeft: 24,
        createdDate: "2025-07-01",
        interestRate: "7.5%",
      },
      {
        id: "L003",
        status: "Rejected",
        tenure: "6 months",
        amount: 30000,
        emi: 5200,
        emiLeft: 6,
        createdDate: "2025-05-15",
        interestRate: "9%",
      },
    ];
    setLoans(dummyLoans);
  }, []);

  // Filter Logic
  const filteredLoans = loans.filter((loan) => {
    return (
      (filter.id === "" || loan.id.toLowerCase().includes(filter.id.toLowerCase())) &&
      (filter.status === "" || loan.status.toLowerCase().includes(filter.status.toLowerCase())) &&
      (filter.amount === "" || loan.amount.toString().includes(filter.amount))
    );
  });

  const handleLoan = () => {
    console.log("new loan created");
  }

  const handleSendQuery = async () => {

    const body = {
      userId : userId,
      email: "dummy@gmail.com",
      title : queryTitle,
      message : queryMessage,
      notificationType : "Loan"
    }

    try {
      const response = await createLoanQuery(body);
      console.log("response", response);
      if (response.status == 200) {
        toast.success('Query submitted successfully!');
        setShowQueryBox(false);
        setQueryMessage('');
        setCurrentLoanId(null);
      }
    } catch (error) {
      console.error('Error submitting query:', error);
      toast.error('Error submitting query. Please try again.');
    }
  };

  return (
    <div className="bg-[#FDFCF9] min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#0B2E53]">
          Search and Filter Loan
        </h2>

        {/* Filter Inputs */}
        <div className="bg-white shadow-md rounded-2xl p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Filter by Status"
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="w-full p-2 rounded-xl border border-[#0B2E53] focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
          <input
            type="text"
            placeholder="Filter by Amount"
            value={filter.amount}
            onChange={(e) => setFilter({ ...filter, amount: e.target.value })}
            className="w-full p-2 rounded-xl border border-[#0B2E53] focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
        </div>

        {/* Loan Cards */}
        <div className="space-y-4">
          {filteredLoans.length > 0 ? (
            filteredLoans.map((loan) => (
              <div
                key={loan.id}
                className="bg-white rounded-2xl shadow-lg p-4 border border-[#0B2E53]/20 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="text-[#0B2E53] space-y-1">
                  {/* <p><strong>Loan ID:</strong> {loan.id}</p> */}
                  <p><strong>Status:</strong> {loan.status}</p>
                  <p><strong>Tenure:</strong> {loan.tenure}</p>
                  <p><strong>Amount:</strong> ₹{loan.amount}</p>
                  <p><strong>EMI:</strong> ₹{loan.emi}</p>
                  <p><strong>EMIs Left:</strong> {loan.emiLeft}</p>
                  <p><strong>Start Date:</strong> {loan.createdDate}</p>
                  <p><strong>Interest Rate:</strong> {loan.interestRate}</p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-4">
                  <button
                    onClick={() => {
                      setCurrentLoanId(loan.id);
                      setShowQueryBox(!showQueryBox)}
                    }
                    className="bg-[#0B2E53] text-white px-4 py-2 rounded-lg hover:bg-[#0B2E53]/90 transition"
                  >
                    Request
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No matching loan records found.</p>
          )}
        </div>


        {showQueryBox && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#0B2E53] mb-4">
                  Ask about Loan #{currentLoanId}
                </h3>
                <input
                  value={queryTitle}
                  onChange={(e) => setQueryTitle(e.target.value)}
                  placeholder="Type your Title here..."
                  className="w-full p-3 rounded mb-4"
                />
                <textarea
                  value={queryMessage}
                  onChange={(e) => setQueryMessage(e.target.value)}
                  placeholder="Type your question here..."
                  className="w-full p-3 border-gray-300 rounded mb-4 h-32 focus:ring-2 focus:ring-[#0B2E53] focus:border-transparent"
                  autoFocus
                />
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowQueryBox(false);
                      setQueryMessage('');
                      setCurrentLoanId(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendQuery}
                    disabled={!queryMessage.trim()}
                    className={`px-4 py-2 rounded-lg text-white transition ${queryMessage.trim()
                      ? 'bg-[#0B2E53] hover:bg-[#0B2E53]/90'
                      : 'bg-gray-400 cursor-not-allowed'
                      }`}
                  >
                    Send Question
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Button */}
        <div className="text-center mt-6">
          <button
            className="bg-[#0B2E53] text-white px-6 py-2 rounded-xl hover:bg-[#C89D2A] transition"
            onClick={handleLoan}
          >
            Apply New Loan
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanSearchComponent;
