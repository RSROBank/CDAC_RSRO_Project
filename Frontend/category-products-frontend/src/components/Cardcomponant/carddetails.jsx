import React, { useState } from "react";

const CardComponent = () => {
  const [cardData] = useState({
    cardNumber: "1234 4568 1234 4568",
    cardHolder: "SUDHIR SINGH",
    expiry: "12/27",
    cardType: "Credit Card",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleAction = (type) => {
    if (type === "report") setStatusMessage("Card report request has been submitted.");
    else if (type === "lock") setStatusMessage("Card lock request has been submitted.");
    else if (type === "replace") setStatusMessage("Card replacement request has been sumbitted.");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-start py-10 px-4">
      <div className="bg-white shadow-lg rounded-xl p-5 w-full max-w-md font-sans">

        {/* Card UI */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white rounded-2xl p-5 mb-6">
          <div className="text-sm mb-2">{cardData.cardType}</div>
          <div className="text-xl tracking-widest mb-6 font-mono">{cardData.cardNumber}</div>
          <div className="flex justify-between text-sm">
            <div>
              <div className="text-xs opacity-70">Card Holder</div>
              <div className="font-semibold">{cardData.cardHolder}</div>
            </div>
            <div>
              <div className="text-xs opacity-70">Valid Thru</div>
              <div className="font-semibold">{cardData.expiry}</div>
            </div>
          </div>
        </div>

        {/* Card Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Card Details</h3>
          <ul className="text-blue-900 space-y-1 text-sm">
            <li><strong>Card Number:</strong> {cardData.cardNumber}</li>
            <li><strong>Card Holder:</strong> {cardData.cardHolder}</li>
            <li><strong>Expiry:</strong> {cardData.expiry}</li>
            <li><strong>Type:</strong> {cardData.cardType}</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <button onClick={() => handleAction("report")} className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg">
            Report
          </button>
          <button onClick={() => handleAction("lock")} className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg">
            Lock
          </button>
          <button onClick={() => handleAction("replace")} className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
            Replace
          </button>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className="text-green-700 font-medium text-center mt-2">{statusMessage}</div>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
