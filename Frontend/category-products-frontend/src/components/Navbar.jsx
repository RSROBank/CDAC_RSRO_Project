// src/components/Navbar.js
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white px-6 py-3 shadow-md flex items-center justify-between">
      <div className="text-xl font-bold tracking-wide">
        <span className="text-white">RSRO Bank</span>
      </div>
      <div className="space-x-4 text-sm">
        <a href="/" className="hover:underline text-white">
          Home
        </a>
        <a href="/login" className="hover:underline text-white">
          Login
        </a>
        <a href="/signup" className="hover:underline text-white">
          Sign Up
        </a>
        <a href="/dashboard" className="hover:underline text-white">
          Dashboard
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
