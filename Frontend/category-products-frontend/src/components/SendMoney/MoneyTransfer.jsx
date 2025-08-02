import React, { useState } from 'react';

const MoneyTransfer = () => {
  const [paymentType, setPaymentType] = useState('moneyTransfer');




  
  return (
    <div className="bg-white shadow-xl rounded-xl p-6 max-w-xl mx-auto font-sans mt-10 text-[#0B2E53] border border-[#0B2E53]/10">
      <h1 className="text-2xl font-semibold text-[#0B2E53] mb-4 text-center">Select Payment Method</h1>

      {/* Selection Option */}
      <div className="flex justify-around mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="moneyTransfer"
            checked={paymentType === 'moneyTransfer'}
            onChange={() => setPaymentType('moneyTransfer')}
          />
          <span className="text-[#0B2E53] font-medium">Money Transfer</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="upi"
            checked={paymentType === 'upi'}
            onChange={() => setPaymentType('upi')}
          />
          <span className="text-[#0B2E53] font-medium">UPI</span>
        </label>
      </div>

      {/* Money Transfer Form */}
      {paymentType === 'moneyTransfer' && (
        <div className="mb-6 border border-[#0B2E53] rounded-lg p-4">
          <h2 className="text-xl text-[#0B2E53] font-semibold mb-4 text-center">Money Transfer</h2>

          {["Account No.", "Account Holder Name", "Bank Name", "IFSC Code", "Amount", "Remark"].map((label, i) => (
            <div className="mb-4" key={i}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                type={label === "Amount" ? "number" : "text"}
                className="w-full p-2 border border-[#0B2E53] rounded focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
              />
            </div>
          ))}
        </div>
      )}

      {/* UPI Form */}
      {paymentType === 'upi' && (
        <div className="mb-6 border border-[#0B2E53] rounded-lg p-4">
          <h2 className="text-xl text-[#0B2E53] font-semibold mb-4 text-center">UPI</h2>

          {["UPI ID", "Amount", "Remark"].map((label, i) => (
            <div className="mb-4" key={i}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                type={label === "Amount" ? "number" : "text"}
                className="w-full p-2 border border-[#0B2E53] rounded focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
              />
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button className="bg-[#0B2E53] text-white px-6 py-2 rounded hover:bg-[#C89D2A] transition">
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
