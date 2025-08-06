import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCustomerDashBoardDetailByUserId, updateCardDetailByUserId } from "../../services/userService";

const CardComponent = () => {
  const [cardData, setCardData] = useState({});
  const [userId, setUserID] = useState(1);

  useEffect(() => {
    const result = async () => {
      if (userId) {
        try {
          const res = await getCustomerDashBoardDetailByUserId(userId);
          if (res) {
            setCardData(res);
            toast.success("Fetched user data successfully");
          } else {
            toast.error("Error while loading data");
          }
        } catch (err) {
          toast.error("Error fetching data");
          console.error(err);
        }
      }
    };
    result();
  }, []);

  const [newExpiry, setNewExpiry] = useState("");
  const [message, setMessage] = useState("");

  const convertExpiryToISO = (expiryInput) => {
    const [mm, yy] = expiryInput.split("/");

    if (!mm || !yy || mm.length !== 2 || yy.length !== 2) return null;

    // Convert to full year: '30' → '2030'
    const fullYear = `20${yy}`;
    return `${fullYear}-${mm}-05`; // or use '01' for the day
  };

  const handleExtendExpiry = async (e) => {
    e.preventDefault();

    // Validate MM/YY format
    if (!/^\d{2}\/\d{2}$/.test(newExpiry)) {
      setMessage("Enter expiry in MM/YY format.");
      return;
    }

    // Parse new expiry input
    const [newMonth, newYearShort] = newExpiry.split("/");
    const newFullYear = parseInt("20" + newYearShort);
    const newDate = new Date(newFullYear, parseInt(newMonth) - 1);

    // Parse current expiry from cardData (MM/YY format)
    const [currYearShort, currMonth, date] = cardData.card.expiry.split("-");
    const currFullYear = parseInt(currYearShort);
    const currDate = new Date(currFullYear, parseInt(currMonth) - 1);

    // Calculate 2 years ahead from current expiry
    const maxAllowedDate = new Date(currDate);
    maxAllowedDate.setFullYear(currDate.getFullYear() + 2);

    console.log(newDate, " ", currDate)
    // Logical checks
    if (newDate <= currDate) {
      setMessage("New expiry must be after the current expiry.");
      return;
    } else if (newDate > maxAllowedDate) {
      setMessage("You can only extend up to 2 years from current expiry.");
      return;
    }

    // Convert MM/YY to ISO format (YYYY-MM-DD)
    const converted = `${newFullYear}-${newMonth.padStart(2, "0")}-05`;

    // API call
    try {
      const res = await updateCardDetailByUserId(userId, { expiry: converted });

      console.log(res);
      setCardData({ ...cardData, expiry: newExpiry });
      setMessage(res.message);
      console.log(res)
      setNewExpiry("");
    } catch (err) {
      console.error(err);
      setMessage("Error updating expiry");
    }
  };



  return (
    <div className="min-h-screen bg-[#FDFCF9] flex flex-col items-center py-10 px-4 space-y-10">
      <h1 className="text-2xl font-semibold text-[#0B2E53]">Your Debit Card</h1>

      {/* Card */}
      <div className="relative group w-[350px] h-[220px] [perspective:1000px]">
        <div className="absolute inset-0 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front */}

          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl text-white p-6 [backface-visibility:hidden] flex flex-col justify-between">
            <div className="flex justify-between">
              <p className="text-sm">Debit Card</p>
              <p className="text-sm">RSRO Bank</p>
            </div>
            <div className="text-2xl font-mono tracking-widest">{cardData?.card ? (
              <p>{userData.card.cardNumber}</p>
            ) : (
              <p>---- ----</p>
            )}</div>
            <div className="flex justify-between text-sm mt-4">
              <div>
                <div className="text-xs opacity-70">Card Holder</div>
                <div className="font-semibold">{cardData?.card ? (<p>{cardData.card.fullName}</p>) : (<p>-------</p>)}</div>
              </div>
              <div>
                <div className="text-xs opacity-70">Valid Thru</div>
                <div className="font-semibold">{cardData?.card ? (
                  <p>{cardData.card.expiry}</p>
                ) : (
                  <p>---- ----</p>
                )}</div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl text-white p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-start justify-between">
            <div className="flex justify-between w-full">
              <p className="text-sm">Debit Card</p>
              <p className="text-sm">RSRO Bank</p>
            </div>

            <div className="w-full mt-4">
              <div className="text-xs opacity-70">CVV</div>
              <p className="text-white">{cardData?.card?.cvv || '----'}</p>
            </div>
          </div>


        </div>
      </div>

      {/* Extend Expiry */}
      {cardData?.card ? (
        <form
          onSubmit={handleExtendExpiry}
          className="bg-white shadow-md rounded-lg p-3 w-1/2 max-w-sm space-y-4"
        >
          <h2 className="text-lg font-medium text-[#0B2E53]">Extend Expiry</h2>
          <input
            type="text"
            placeholder="New Expiry (MM/YY)"
            value={newExpiry}
            onChange={(e) => setNewExpiry(e.target.value)}
            className="w-full border border-[#0B2E53] px-3 py-2 mt-3 rounded focus:outline-none focus:ring-2 focus:ring-[#C89D2A]"
          />
          <button
            type="submit"
            className="w-full bg-[#0B2E53] text-white py-2 mt-4 rounded hover:bg-[#C89D2A]"
          >
            Update Expiry
          </button>
          {message && <p className="text-center text-sm text-green-600">{message}</p>}
        </form>
      ) : (
        <p className="text-center">No card assigned yet</p>
      )}
    </div>
  );
};

export default CardComponent;
