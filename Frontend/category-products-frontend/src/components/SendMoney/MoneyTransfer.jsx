import React from 'react';

const MoneyTransfer = () => {
  return (
    <div className="bg-white p-5 border border-gray-300 max-w-md mx-auto font-sans">
      <div className="mb-5">
        <h2 className="bg-blue-700 text-white p-2 text-center -mx-5 -mt-5 mb-5">Money Transfer</h2>
        <div className="mb-4">
          <label className="block text-blue-700 font-bold">Account No.</label>
          <input type="text" className="w-full p-2 border border-blue-700 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 font-bold">Account Holder Name:</label>
          <input type="text" className="w-full p-2 border border-blue-700 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 font-bold">Bank Name:</label>
          <input type="text" className="w-full p-2 border border-blue-700 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 font-bold">IFSC Code:</label>
          <input type="text" className="w-full p-2 border border-blue-700 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 font-bold">Amount:</label>
          <input type="number" className="w-full p-2 border border-blue-700 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 font-bold">Remark:</label>
          <input type="text" className="w-full p-2 border border-blue-700 rounded" />
        </div>
      </div>
      <div className="mb-5">
        <h2 className="bg-blue-700 text-white p-2 text-center -mx-5 mb-5">UPI</h2>
        <div className="mb-4">
          <label className="block text-blue-700 font-bold">UPI ID:</label>
          <input type="text" className="w-full p-2 border border-blue-700 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 font-bold">Amount:</label>
          <input type="number" className="w-full p-2 border border-blue-700 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 font-bold">Remark:</label>
          <input type="text" className="w-full p-2 border border-blue-700 rounded" />
        </div>
      </div>
      <div className="flex justify-between">
        <button className="bg-blue-700 text-white px-5 py-2 rounded hover:opacity-80">Pay Now</button>
        <button className="bg-red-600 text-white px-5 py-2 rounded hover:opacity-80">Cancel</button>
      </div>
    </div>
  );
};

export default MoneyTransfer;