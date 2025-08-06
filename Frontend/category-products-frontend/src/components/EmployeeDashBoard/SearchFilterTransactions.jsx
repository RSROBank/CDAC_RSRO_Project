import React, { useEffect, useState } from 'react';
import { getAllTransactions } from '../../services/userService';
import { toast } from 'react-toastify';

const SearchFilterTransactions = () => {
  const [filters, setFilters] = useState({ status: '', type: '' });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [summaryReport, setSummaryReport] = useState('');
  const [failedAction, setFailedAction] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTransactions = transactions.filter(t => {
    const statusMatch = filters.status 
      ? (t.status || '').toLowerCase().includes(filters.status.toLowerCase())
      : true;
    const typeMatch = filters.type 
      ? (t.transactionType || '').toLowerCase().includes(filters.type.toLowerCase())
      : true;
    return statusMatch && typeMatch;
  });

  const generateSummary = () => {
    const total = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    setSummaryReport(`Total Transactions: ${transactions.length}, Total Amount: $${total.toFixed(2)}`);
  };

  const manageFailed = (t) => {
    if (t.status === 'Failed') {
      setFailedAction(` Managing failed transaction #${t.id} - Retry initiated or logged.`);
    } else {
      setFailedAction(' Selected transaction is not failed.');
    }
  };

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
    setSummaryReport('');
    setFailedAction('');
  };

  useEffect(() => {
    const result = async () => {
      try {
        const res = await getAllTransactions();
        if (res) {
          setTransactions(res);
          toast.success("Fetched transaction data successfully");
        } else {
          toast.error("Error while loading data");
        }
      } catch (err) {
        toast.error("Error fetching data");
        console.error(err);
      }
    }
    result();
  }, []);

  return (
    <div className="bg-[#FDFCF9] min-h-screen p-6 font-sans">
      <div className="max-w-6xl mx-auto bg-white border border-gray-300 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-center text-[#0B2E53] border-b pb-2 mb-4">
          Search / Filter Transactions
        </h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <input
            type="text"
            placeholder="Filter by Status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="p-2 border border-[#C89D2A] rounded focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
          <input
            type="text"
            placeholder="Filter by Type"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="p-2 border border-[#C89D2A] rounded focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
        </div>

        {/* Transaction Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t, index) => (
              <div
                key={index}
                className="bg-[#F9F7F2] rounded-lg p-3 flex flex-col justify-between h-48 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => openModal(t)}
              >
                <div className="text-[#0B2E53]">
                  <p className="font-semibold text-lg mb-1">{index + 1}</p>
                  <p className="font-medium">{t.transactionType || 'N/A'}</p>
                  <p className="text-sm text-gray-700">
                    {(t.amount || 0).toFixed(2)}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600">{t.createdAt.split('T')[0] || 'N/A'}</p>
                  <p className={`font-medium ${
                    t.status === 'Completed' ? 'text-green-600' : 
                    t.status === 'Failed' ? 'text-red-600' : 
                    'text-yellow-600'
                  }`}>
                    {t.status || 'N/A'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <p className="text-[#C89D2A] text-center py-10">No matching transactions found.</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-[#0B2E53]">
                    Transaction Details
                  </h3>
                  <button 
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID:</span>
                    <span className="font-medium">{selectedTransaction.id || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{selectedTransaction.transactionType || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">
                      {(selectedTransaction.amount || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">toAccount:</span>
                    <span className="font-medium">
                      {(selectedTransaction.toAccount || "N/A")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Description:</span>
                    <span className="font-medium">
                      {(selectedTransaction.description || "N/A")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {selectedTransaction.createdAt.split('T')[0] || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${
                      selectedTransaction.status === 'Completed' ? 'text-green-600' : 
                      selectedTransaction.status === 'Failed' ? 'text-red-600' : 
                      'text-yellow-600'
                    }`}>
                      {selectedTransaction.status || 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={generateSummary}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                  >
                    Generate Summary(coming soon)
                  </button>
                  <button
                    onClick={() => manageFailed(selectedTransaction)}
                    className="bg-[#C89D2A] text-white px-4 py-2 rounded hover:bg-[#A77E20] text-sm"
                  >
                    Manage Failed(coming soon)
                  </button>
                </div>

                {/* Messages */}
                {summaryReport && (
                  <p className="text-green-700 font-medium mt-4 text-sm">{summaryReport}</p>
                )}
                {failedAction && (
                  <p className="text-yellow-700 font-medium mt-4 text-sm">{failedAction}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilterTransactions;