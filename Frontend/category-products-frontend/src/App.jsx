import "./App.css";

//import ListEmployees from './components/ListEmployees';
import {Routes, Route } from "react-router-dom";

import HomePage from "./components/Home";
import LoginPage from "./components/Login";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import CustomerDashboard from "./components/Dashboard/Dashbord";
import EmployeeDashboard from "./components/EmployeeDashBoard/Dashbord";
import AdminDashboard from "./components/AdminDashboard/Dashbord";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <div className="min-h-screen bg-richblack-900 flex flex-col overflow-y-hidden">
        {/* <HeaderComponent /> */}
        <Navbar />

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
          {/* http://localhost:3000 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/employeedashboard" element={<EmployeeDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Routes>
        {/* <FooterComponent /> */}
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
