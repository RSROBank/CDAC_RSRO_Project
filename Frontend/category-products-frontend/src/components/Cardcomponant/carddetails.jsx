import React, { useState } from "react";

const CardComponent = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [cardError, setCardError] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const luhnCheck = (number) => {
    let sum = 0;
    let alt = false;
    number = number.replace(/\D/g, "");
    for (let i = number.length - 1; i >= 0; i--) {
      let n = parseInt(number[i]);
      if (alt) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
      alt = !alt;
    }
    return sum % 10 === 0;
  };

  const validateExpiry = (expiry) => {
    const [month, year] = expiry.split("/");
    if (!month || !year || month.length !== 2 || year.length !== 2)
      return false;
    const now = new Date();
    const inputDate = new Date(`20${year}`, month - 1);
    return inputDate >= new Date(now.getFullYear(), now.getMonth());
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    setCardNumber(value);

    const clean = value.replace(/\D/g, "");
    if (clean.length >= 13 && clean.length <= 19 && luhnCheck(clean)) {
      setCardError("");
    } else {
      setCardError("Invalid card number");
    }
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value;
    setExpiry(value);
    setExpiryError(validateExpiry(value) ? "" : "Invalid or expired date");
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    setCvv(value);
    setCvvError(/^\d{3,4}$/.test(value) ? "" : "Invalid CVV");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardError && !expiryError && !cvvError) {
      setStatusMessage("Payment submitted successfully.");
    } else {
      setStatusMessage("Please fix the errors before submitting.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-start py-10 px-4">
      <div className="bg-white shadow-lg rounded-xl p-5 w-full max-w-md font-sans">
        <h2 className="text-xl font-semibold mb-5 text-center text-blue-800">
          Card Payment
        </h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block font-medium">Card Number</label>
            <input
              type="text"
              maxLength="19"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            {cardError && (
              <div className="text-red-600 text-sm mt-1">{cardError}</div>
            )}
          </div>

          <div>
            <label className="block font-medium">Expiry (MM/YY)</label>
            <input
              type="text"
              maxLength="5"
              placeholder="MM/YY"
              value={expiry}
              onChange={handleExpiryChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            {expiryError && (
              <div className="text-red-600 text-sm mt-1">{expiryError}</div>
            )}
          </div>

          <div>
            <label className="block font-medium">CVV</label>
            <input
              type="text"
              maxLength="4"
              placeholder="123"
              value={cvv}
              onChange={handleCvvChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            {cvvError && (
              <div className="text-red-600 text-sm mt-1">{cvvError}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#C89D2A] text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Pay
          </button>

          {statusMessage && (
            <div className="text-center mt-3 text-green-700 font-medium">
              {statusMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CardComponent;
