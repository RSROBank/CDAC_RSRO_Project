import React, { useState } from 'react';

const MoneyTransfer = () => {
  const [paymentType, setPaymentType] = useState('moneyTransfer');

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 max-w-xl mx-auto font-sans mt-10">
      <h1 className="text-2xl font-semibold text-blue-800 mb-4 text-center">Select Payment Method</h1>

      {/* Selection Option */}
      <div className="flex justify-around mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="moneyTransfer"
            checked={paymentType === 'moneyTransfer'}
            onChange={() => setPaymentType('moneyTransfer')}
          />
          <span className="text-blue-800 font-medium">Money Transfer</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="upi"
            checked={paymentType === 'upi'}
            onChange={() => setPaymentType('upi')}
          />
          <span className="text-blue-800 font-medium">UPI</span>
        </label>
      </div>

      {/* Money Transfer Form */}
      {paymentType === 'moneyTransfer' && (
        <div className="mb-6 border border-blue-700 rounded-lg p-4">
          <h2 className="text-xl text-blue-800 font-semibold mb-4 text-center">Money Transfer</h2>

          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-1">Account No.</label>
            <input
              type="text"
              className="w-full p-2 border border-blue-400 rounded focus:outline-none focus:ring focus:border-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-1">Account Holder Name</label>
            <input
              type="text"
              className="w-full p-2 border border-blue-400 rounded focus:outline-none focus:ring focus:border-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-1">Bank Name</label>
            <input
              type="text"
              className="w-full p-2 border border-blue-400 rounded focus:outline-none focus:ring focus:border-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-1">IFSC Code</label>
            <input
              type="text"
              className="w-full p-2 border border-blue-400 rounded focus:outline-none focus:ring focus:border-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-1">Amount</label>
            <input
              type="number"
              className="w-full p-2 border border-blue-400 rounded focus:outline-none focus:ring focus:border-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-1">Remark</label>
            <input
              type="text"
              className="w-full p-2 border border-blue-400 rounded focus:outline-none focus:ring focus:border-blue-600"
            />
          </div>
        </div>

      )}

      {/* UPI Form */}
      {paymentType === 'upi' && (
        <div className="mb-6 border border-blue-700 rounded-lg p-4">
          <h2 className="text-xl text-blue-800 font-semibold mb-4 text-center">UPI</h2>

          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-1">UPI ID</label>
            <input
              type="text"
              className="w-full p-2 border border-blue-400 rounded focus:outline-none focus:ring focus:border-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-1">Amount</label>
            <input
              type="number"
              className="w-full p-2 border border-blue-400 rounded focus:outline-none focus:ring focus:border-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-1">Remark</label>
            <input
              type="text"
              className="w-full p-2 border border-blue-400 rounded focus:outline-none focus:ring focus:border-blue-600"
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button className="bg-[#C89D2A] text-white px-6 py-2 rounded hover:bg-blue-800 transition">
          Pay Now
        </button>
        <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MoneyTransfer;
