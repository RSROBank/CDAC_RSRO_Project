import React, { useState } from "react";

const CardComponent = () => {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  // Button functions
  const reportCard = () => {
    setStatusMessage("Card has been reported.");
  };

  const lockCard = () => {
    setStatusMessage("Card has been locked.");
  };

  const replaceCard = () => {
    setStatusMessage("Card replacement requested.");
  };

  return (
    <div className="font-sans max-w-md mx-auto p-4">
      {/* Card Image with Data */}
      <div className="relative w-full h-56 rounded-2xl bg-gradient-to-br from-pink-700 via-pink-600 to-red-500 text-white p-5 mb-5 box-border">
        {/* Card Number */}
        <input
          type="text"
          name="cardNumber"
          maxLength={19}
          placeholder="1234 5678 9012 3456"
          value={cardData.cardNumber}
          onChange={handleChange}
          className="w-full text-2xl bg-transparent border-none text-white tracking-widest mb-5 outline-none placeholder:text-white"
        />

        {/* Card Holder & Expiry */}
        <div className="flex justify-between text-sm">
          <input
            type="text"
            name="cardHolder"
            placeholder="Card Holder"
            value={cardData.cardHolder}
            onChange={handleChange}
            className="w-3/5 bg-transparent border-none text-white outline-none uppercase placeholder:text-white"
          />
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            maxLength={5}
            value={cardData.expiry}
            onChange={handleChange}
            className="w-2/5 bg-transparent border-none text-white text-right outline-none placeholder:text-white"
          />
        </div>
      </div>

      {/* Card Details */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold mb-2">Card Details</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Card Number: {cardData.cardNumber || "-"}</li>
          <li>Card Holder: {cardData.cardHolder || "-"}</li>
          <li>Expiry Date: {cardData.expiry || "-"}</li>
        </ul>
      </div>

      {/* Buttons */}
      <div className="flex justify-between space-x-3">
        <button
          onClick={reportCard}
          className="flex-1 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
        >
          Report Card
        </button>
        <button
          onClick={lockCard}
          className="flex-1 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
        >
          Lock Card
        </button>
        <button
          onClick={replaceCard}
          className="flex-1 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
        >
          Replace Card
        </button>
      </div>

      {/* Status message */}
      {statusMessage && (
        <p className="mt-5 font-bold text-green-600">{statusMessage}</p>
      )}
    </div>
  );
};

export default CardComponent;
