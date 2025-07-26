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
import CustomerProfile from "./components/Profilepages/CustomerProfile";
import CustomerEditProfile from "./components/Profilepages/CustomerEditProfile";
import UpdateCustomerProfile from "./components/Profilepages/CustomerEditProfile";

function App() {
  return (
    <>
      {/* Container fills the full height and uses flex layout */}
      <div className="flex flex-col min-h-screen">
        {/* Fixed Navbar at the top */}
        <Navbar />

        {/* Scrollable content area */}
        <div className="flex-1 bg-richblack-900">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/customerprofile" element={<CustomerProfile />} />
            <Route
              path="/customereditprofile"
              element={<UpdateCustomerProfile />}
            />
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/employeedashboard" element={<EmployeeDashboard />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
          </Routes>
        </div>

        {/* Fixed Footer at the bottom */}
        <Footer />
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
