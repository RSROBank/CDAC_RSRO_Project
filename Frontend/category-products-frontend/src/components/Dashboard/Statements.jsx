import { useEffect, useState } from "react";
import { getCustomerStatement } from "../../services/userService"; // adjust path if needed


const dummyTransactions = [
  { date: '2025-07-21', type: 'Credit', amount: '+₹2,000', desc: 'Salary' },
  { date: '2025-07-20', type: 'Debit', amount: '-₹500', desc: 'Grocery' },
  { date: '2025-07-19', type: 'Debit', amount: '-₹300', desc: 'Mobile Recharge' },
  { date: '2025-07-18', type: 'Credit', amount: '+₹1,000', desc: 'Refund' },
  { date: '2025-07-17', type: 'Debit', amount: '-₹100', desc: 'ATM' },
  { date: '2025-07-16', type: 'Debit', amount: '-₹250', desc: 'Snacks' },
  { date: '2025-07-15', type: 'Credit', amount: '+₹5,000', desc: 'Bonus' },
  { date: '2025-07-14', type: 'Debit', amount: '-₹400', desc: 'Shopping' },
  { date: '2025-07-13', type: 'Debit', amount: '-₹150', desc: 'Tea' },
  { date: '2025-07-12', type: 'Debit', amount: '-₹600', desc: 'Internet Bill' },
  { date: '2025-07-11', type: 'Debit', amount: '-₹700', desc: 'Electricity' },
];

const Statements = () => {
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    transactionType: ''
  });



  const [showAll, setShowAll] = useState(false);
  const [statement, setStatement] = useState(null); // full response object
  const [accountNo, setAccountNo] = useState('502178621861');

  const handleChange = (e) => {t
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredTransactions = statement
    ? statement.transactions
      .filter(txn =>
        filters.transactionType
          ? txn.type.toLowerCase() === filters.transactionType.toLowerCase()
          : true
      )
      .slice(0, showAll ? statement.transactions.length : 10)
    : [];


  useEffect(() => {
    if (accountNo) {
      getCustomerStatement(accountNo, filters).then((data) => {
        if (data) setStatement(data);
      });
    }
  }, [filters]);


  return (
    <div className="space-y-6 text-[#0B2E53] bg-[#FDFCF9] p-4 min-h-screen">
      {/* Filters */}
      <div className="bg-white p-4 shadow-md rounded space-y-4 border border-[#0B2E53]/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">From Date</label>
            <input type="date" name="fromDate" value={filters.fromDate} onChange={handleChange}
              className="w-full border border-[#0B2E53] p-2 rounded focus:ring-2 focus:ring-[#C89D2A]" />
          </div>
          <div>
            <label className="block text-sm font-medium">To Date</label>
            <input type="date" name="toDate" value={filters.toDate} onChange={handleChange}
              className="w-full border border-[#0B2E53] p-2 rounded focus:ring-2 focus:ring-[#C89D2A]" />
          </div>
          {/* <div>
            <label className="block text-sm font-medium">Account No</label>
            <input type="text" name="accountNo" value={filters.accountNo} onChange={handleChange}
              placeholder="Enter Account No"
              className="w-full border border-[#0B2E53] p-2 rounded focus:ring-2 focus:ring-[#C89D2A]" />
          </div> */}
          <div>
            <label className="block text-sm font-medium">Transaction Type</label>
            <select name="transactionType" value={filters.transactionType} onChange={handleChange}
              className="w-full border border-[#0B2E53] p-2 rounded focus:ring-2 focus:ring-[#C89D2A]">
              <option value="">All</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
          </div>
        </div>
      </div>

      {/* User Info */}
      {statement && (
        <div className="bg-white p-4 shadow-md rounded border border-[#0B2E53]/10 space-y-2">
          <h2 className="text-lg font-semibold">Account Details</h2>
          <p><strong>Name: </strong> {accountNo}</p>
          <p><strong>Account No: </strong> {statement.customerName}</p>
          <p><strong>Address: </strong>
             {statement.address.city}, {statement.address.state}, {statement.address.country} - {statement.address.pinCode}
          </p>
          <p><strong>Current Balance: </strong> ₹{statement.currentBalance}</p>
        </div>
      )}


      {/* Transactions */}
      <div className="bg-white p-4 shadow-md rounded border border-[#0B2E53]/10">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        {statement && (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#0B2E53]/20">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Description</th>
                <th className="text-right p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {(showAll ? statement.transactions : statement.transactions.slice(0, 10)).map((txn, idx) => (
                <tr key={idx} className="border-b border-[#0B2E53]/10 hover:bg-[#FDFCF9]">
                  <td className="p-2">{txn.date}</td>
                  <td className="p-2">{txn.type}</td>
                  <td className="p-2">{txn.description}</td>
                  <td className="p-2 text-right">
                    {(txn.type === "CREDIT" ? "+" : "-") + "₹" + txn.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}


        {statement && !showAll && statement.transactions.length > 10 && (
          <div className="text-right mt-4">
            <button
              onClick={() => setShowAll(true)}
              className="text-[#C89D2A] underline text-sm hover:text-[#0B2E53]"
            >
              Show more transactions
            </button>
          </div>
        )}

      </div>

      {/* Future Download */}
      <div className="text-right">
        <button className="bg-[#C89D2A] text-white px-4 py-2 rounded opacity-60 cursor-not-allowed">
          Download PDF (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default Statements;
