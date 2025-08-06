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

        <div className="bg-white p-4 shadow-md rounded w-full max-w-md mx-auto group perspective">
          {/* Card Flip Container */}
          <div className="relative w-full h-56 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

            {/* === Front Side === */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl text-white p-6 [backface-visibility:hidden] flex flex-col justify-between">
              <div className="flex justify-between">
                <p className="text-sm">Debit Card</p>
                <p className="text-sm">RSRO Bank</p>
              </div>
              <div className="text-2xl font-mono tracking-widest">
                {userData?.card?.cardNumber || '---- ---- ---- XXXX'}
              </div>
              <div className="flex justify-between text-sm mt-4">
                <div>
                  <div className="text-xs opacity-70">Card Holder</div>
                  <div className="font-semibold">
                    {userData?.card ? userData.fullName : '---- ----'}
                  </div>
                </div>
                <div>
                  <div className="text-xs opacity-70">Valid Thru</div>
                  <div className="font-semibold">
                    {userData?.card?.expiry || '----'}
                  </div>
                </div>
              </div>
            </div>

            {/* === Back Side === */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl text-white p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-start justify-between">
              <div className="flex justify-between w-full">
                <p className="text-sm">Debit Card</p>
                <p className="text-sm">RSRO Bank</p>
              </div>

              <div className="w-full mt-4">
                <div className="text-xs opacity-70">CVV</div>
                <p className="text-white">{userData?.card?.cvv || '----'}</p>
              </div>
            </div>


          </div>
        </div>

      </div>

      {/* Expenditure Card */}
      {/* <ExpenditureCard /> */}

      {/* Mini Statement - pass transaction data */}
      <MiniStatement transactions={userData.transaction || []} />
    </div >
  );
};

export default DashboardHome;
