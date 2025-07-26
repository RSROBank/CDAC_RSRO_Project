// src/components/Navbar.js
import React from "react";
import ProfileDropdown from "./UI/ProfileDown";
import RSROBank from "../assets/Images/RSROBank.png";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="bg-[#0B2E53] text-white px-6 py-3 shadow-md flex items-center justify-between">
      <div className="text-xl font-bold tracking-wide">
        <Link to="/">
          <div className="text-white d-flex">
            <img
              src={RSROBank}
              alt="paji"
              style={{
                width: "7%",
                borderRadius: "50%",
                height: "5%",
              }}
            />
            <span style={{ padding: "5px" }}> RSRO Bank</span>
          </div>
        </Link>
      </div>
      <div className="space-x-4 text-sm">
        <a href="/login" className="hover:underline text-white">
          Login
        </a>
        <a href="/signup" className="hover:underline text-white">
          Sign Up
        </a>
        <a href="/dashboard" className="hover:underline text-white">
          Dashboard
        </a>

        <a href="/employeedashboard" className="hover:underline text-white">
          Employee Dashboard
        </a>
        <a href="/admindashboard" className="hover:underline text-white">
          Admin Dashboard
        </a>
          {/* <ProfileDropdown/> */}
      </div>
    </nav>
  );
};

export default Navbar;
