import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Herosection from "./Herosection";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div
        className="h-screen"
      >
        {/* <Herosection/> */}
        <Outlet />
      </div>
      <Footer/>
    </>
  );
};

export default HomePage;
