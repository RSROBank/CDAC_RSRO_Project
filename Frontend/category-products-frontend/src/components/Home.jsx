import React, { useContext, useEffect, useState } from "react";
import Herosection from "./Herosection";
import axios from "axios";
import Chatbot from "./UI/Chatbot";
import { AuthContext } from "../AuthContext/auth.context";

const HomePage = () => {
  const [loanRates, setLoanRates] = useState([]);
  const [fdRates, setFdRates] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/rates")
      .then((response) => {
        setLoanRates(response.data.loanRates || []);
        setFdRates(response.data.fdRates || []);
      })
      .catch((error) => {
        console.error("Failed to fetch rates:", error);
      });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Hero Section */}
        {!user && (
          <Herosection />
        )}
        {/* About the Bank */}
        <section className="px-6 py-12 bg-white shadow-sm">
          <h2 className="text-3xl font-bold text-[#0B2E53] mb-4">
            About Our Bank
          </h2>
          <p className="text-lg leading-relaxed">
            Welcome to RSRO Bank – your trusted partner in financial growth.
            We’ve been serving customers for over 25 years with cutting-edge
            banking solutions, secure digital platforms, and a strong commitment
            to customer satisfaction. From personal banking to corporate
            accounts, RSRO Bank delivers reliable and innovative financial
            services.
          </p>
        </section>
        {/* Loan and FD Rates */}
        <section className="px-6 py-12 bg-[#F9F7F2]">
          <h2 className="text-2xl font-semibold text-blue-900 mb-6">
            Current Interest Rates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded shadow">
              <h3 className="text-xl font-bold text-blue-700">
                Loan Interest Rates
              </h3>
              <ul className="mt-4 space-y-2">
                {loanRates.map((loan, idx) => (
                  <li key={idx}>
                    {loan.type}: {loan.rate}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-white rounded shadow">
              <h3 className="text-xl font-bold text-blue-700">
                Fixed Deposit Rates
              </h3>
              <ul className="mt-4 space-y-2">
                {fdRates.map((fd, idx) => (
                  <li key={idx}>
                    {fd.term}: {fd.rate}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {/* Services Offered */}
        <section className="px-6 py-12 bg-white shadow-sm">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold"> Digital Banking</h3>
              <p>
                24/7 access to your accounts via secure mobile & online banking
                apps.
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">
                Personal & Business Loans
              </h3>
              <p>Low-interest loans tailored to meet your financial needs.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold"> Fixed Deposits</h3>
              <p>
                Invest safely and earn attractive returns with flexible FD
                tenures.
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold"> Safe Deposit Lockers</h3>
              <p>Keep your valuables secure in our state-of-the-art lockers.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">International Banking</h3>
              <p>
                Remittance, forex cards, and NRIs services for global citizens.
              </p>
            </div>
          </div>
        </section>
        <Chatbot />
        {/* Contact Info */}
        <section className="px-6 py-12 bg-[#F9F7F2] text-blue-900">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>Email: support@rsrobank.com | Phone: 1800-123-4567</p>
          <p>
            Address: RSRO Bank, Sector 10, Financial District, Mumbai, India
          </p>
        </section>
      </div>
    </>
  );
};

export default HomePage;
