import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/Home";
import LoginPage from "./components/Login";
import Signup from "./components/Signup";
import CustomerDashboard from "./components/Dashboard/Dashbord";
import EmployeeDashboard from "./components/EmployeeDashBoard/Dashbord";
import AdminDashboard from "./components/AdminDashboard/Dashbord";

function App() {
  return (
    <>
      {/* Container fills the full height and uses flex layout */}
      <div className="flex flex-col h-screen">
        {/* Fixed Navbar at the top */}
        <Navbar />

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto bg-richblack-900">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/employeedashboard" element={<EmployeeDashboard />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </div>

        {/* Fixed Footer at the bottom */}
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
