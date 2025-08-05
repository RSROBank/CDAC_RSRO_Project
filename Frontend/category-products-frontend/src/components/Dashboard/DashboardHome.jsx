import React, { useEffect, useState } from "react";
import ExpenditureCard from "./ExpenditureCard";
import MiniStatement from "./MiniStatement";
import { getCustomerDashBoardDetailByUserId } from "../../services/userService";
import { toast } from "react-toastify";

const DashboardHome = () => {
  const [userData, setUserData] = useState({});
  const [userId, setUserID] = useState(1);

  useEffect(() => {
    const result = async () => {
      if (userId) {
        try {
          const res = await getCustomerDashBoardDetailByUserId(userId);
          if (res) {
            setUserData(res);
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

  return (
    <div className="space-y-6">
      {/* User Info and Card Image */}
      <div className="flex gap-6">
        <div className="bg-[#FDFCF9] p-4 shadow-md rounded w-1/2">
          <p>Full Name: {userData.fullName || "Loading..."}</p>
          <p>Account Number: {userData.accountNo || "Loading..."}</p>
          <p>Email: {userData.email || "Loading..."}</p>
          <p>Mobile Number: +91-{userData.mobile || "Loading..."}</p>
        </div>

        <div className="bg-white p-4 shadow-md rounded w-1/2 flex items-center justify-center">
          {/* Card UI */}
          {userData?.card ? (
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white rounded-2xl p-5 mb-6 w-full">
              <div className="text-sm mb-2">Debit Card</div>
              <div className="text-xl tracking-widest mb-6 font-mono">
                {userData.card.cardNumber}
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <div className="text-xs opacity-70">Card Holder</div>
                  <div className="font-light text-sm">{userData.fullName}</div>
                </div>
                <div>
                  <div className="text-xs opacity-70">Valid Thru</div>
                  <div className="font-light text-sm">{userData.card.expiry}</div>
                </div>
                <div>
                  <div className="font-light text-sm">{userData.card.type}</div>
                </div>
              </div>
            </div>
          ) : (
            <p>No card assigned yet</p>
          )}
        </div>
      </div>

      {/* Expenditure Card */}
      {/* <ExpenditureCard /> */}

      {/* Mini Statement - pass transaction data */}
      <MiniStatement transactions={userData.transaction || []} />
    </div>
  );
};

export default DashboardHome;
