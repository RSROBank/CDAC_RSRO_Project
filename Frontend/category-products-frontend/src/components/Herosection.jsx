import React from "react";
import { useNavigate } from "react-router-dom";

function Herosection() {
  const navigate = useNavigate();
  return (
    <div className="mt-12">
      <h1 className="text-center m-2 p-1">Welcome to RSRO Bank</h1>
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Herosection;
