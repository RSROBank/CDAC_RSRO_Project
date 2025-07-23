import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Herosection from "./Herosection";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="h-screen"
      >
        <Herosection/>
      </div>
    </>
  );
};

export default HomePage;
