import React from "react";
import ProfileDropdown from "./UI/ProfileDown";
import RSROBank from "../assets/Images/RSROBank.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#0B2E53] text-white px-6 py-3 shadow-md flex items-center justify-between">
      <div className="text-xl font-bold tracking-wide">
        <Link to="/" style={{ textDecoration: "none" }}>
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
        <Link to="/login" className="hover:underline text-white">
          Login
        </Link>
        <Link to="/signup" className="hover:underline text-white">
          Sign Up
        </Link>
        <Link to="/dashboard" className="hover:underline text-white">
          Dashboard
        </Link>

        <Link to="/employeedashboard" className="hover:underline text-white">
          Employee Dashboard
        </Link>
        <Link to="/admindashboard" className="hover:underline text-white">
          Admin Dashboard
        </Link>
        {/* <ProfileDropdown/> */}
      </div>
    </nav>
  );
};

export default Navbar;
