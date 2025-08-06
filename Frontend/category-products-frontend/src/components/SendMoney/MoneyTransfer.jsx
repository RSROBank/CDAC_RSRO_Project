import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MoneyTransfer = () => {
  const [paymentType, setPaymentType] = useState('moneyTransfer');
  const [userId, setUserId] = useState(1);
  const initialFormData = {
    toAccount: '',
    upiId: '',
    accountHolderName: '',
    amount: '',
    description: '',
    transactionMode: '',
    transactionType: 'CREDIT'
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = (payload, paymentType) => {
    toast.error
    if (!payload.userId) {
      toast.error('User ID is required.');
      return false;
    }

    if (!payload.toAccount || isNaN(payload.toAccount)) {
      toast.error('Valid account number or UPI ID is required.');
      return false;
    }

    if (paymentType === 'moneyTransfer' && (!payload.accountHolderName || payload.accountHolderName.trim() === '')) {
      toast.error('Account Holder Name is required.');
      return false;
    }

    if (!payload.amount || isNaN(payload.amount) || payload.amount < 1) {
      toast.error('Amount must be at least 1.');
      return false;
    }

    if (!payload.description || payload.description.trim() === '') {
      toast.error('Description is required.');
      return false;
    }

    if (!payload.transactionMode || payload.transactionMode.trim() === '') {
      toast.error('Transaction Mode is required.');
      return false;
    }

    if (!payload.transactionType || payload.transactionType.trim() === '') {
      toast.error('Transaction Type is required.');
      return false;
    }

    return true; // ✅ All valid
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      userId: userId,
      toAccount: Number(formData.toAccount),
      amount: parseFloat(formData.amount),
      transactionMode: formData.transactionMode, // must match enum
      transactionType: formData.transactionType, // must match enum
    };

    console.log(payload)
    if (!validate(payload, paymentType)) return;
    try {
      const token = sessionStorage.getItem('jwt');
      const response = await axios.post('http://localhost:8080/transactions/pay', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Transaction success:', response.data);
      toast.success('Payment successful!');
    } catch (error) {
      console.error('Transaction failed:', error);
      toast.error('Payment failed.');
    }
  };

  const handleCancel = () => {
    setFormData({
      userId: '',
      toAccount: '',
      accountHolderName: '',
      amount: '',
      description: '',
      transactionMode: '',
      transactionType: ''
    })
  }

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      transactionMode: paymentType === 'upi' ? 'UPI' : 'ACCOUNTTRANSFER'
    }));
  }, [paymentType]);

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 max-w-xl mx-auto font-sans mt-10 text-[#0B2E53] border border-[#0B2E53]/10">
      <h1 className="text-2xl font-semibold text-[#0B2E53] mb-4 text-center">Select Payment Method</h1>

      {/* Selection Option */}
      <div className="flex justify-around mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="paymentType"
            value="moneyTransfer"
            checked={paymentType === 'moneyTransfer'}
            onChange={() => {
              setPaymentType('moneyTransfer');
              setFormData({ ...initialFormData, transactionMode: 'ACCOUNTTRANSFER' });
            }}
          />
          <span className="font-medium">Money Transfer</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="paymentType"
            value="upi"
            checked={paymentType === 'upi'}
            onChange={() => {
              setPaymentType('upi');
              setFormData({ ...initialFormData, transactionMode: 'UPI' });
            }}
          />
          <span className="font-medium">UPI</span>
        </label>
      </div>

      {/* Common Form Fields */}
      <div className="mb-6 border border-[#0B2E53] rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {paymentType === 'moneyTransfer' ? 'Money Transfer' : 'UPI Payment'}
        </h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">
            {paymentType === 'upi' ? 'UPI ID' : 'To Account No.'}
          </label>
          {paymentType === 'upi' ? (
            <input
              type="text"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
              className="w-full p-2 border border-[#0B2E53] rounded"
            />
          ) :
            (
              <input
                type="text"
                name="toAccount"
                value={formData.toAccount}
                onChange={handleChange}
                className="w-full p-2 border border-[#0B2E53] rounded"
              />
            )}
        </div>

        {paymentType === 'moneyTransfer' && (
          <div className="mb-4">
            <label className="block font-medium mb-1">Account Holder Name</label>
            <input
              type="text"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
              className="w-full p-2 border border-[#0B2E53] rounded"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block font-medium mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border border-[#0B2E53] rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Remark</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-[#0B2E53] rounded"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className="bg-[#0B2E53] text-white px-6 py-2 rounded hover:bg-[#C89D2A] transition"
        >
          Pay Now
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MoneyTransfer;
