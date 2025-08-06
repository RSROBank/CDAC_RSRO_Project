import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
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
import UpdateCustomerProfile from "./components/Profilepages/CustomerEditProfile";
import { AuthContext } from "./AuthContext/auth.context";
import { useState } from "react";
import EmployeeEditProfile from "./components/Profilepages/EmployeeEditProfile";
import AdminEditProfile from "./components/Profilepages/AdminEditProfile";
import EmployeeProfile from "./components/Profilepages/EmployeeProfile";
import AdminProfile from "./components/Profilepages/AdminProfile";

function App() {
  const [user, setUser] = useState("customer")
  return (
    <>
      {/* Container fills the full height and uses flex layout */}
      <AuthContext value={{ user, setUser }}>
        <div className="flex flex-col min-h-screen">
          {/* Fixed Navbar at the top */}
          <Navbar />

          {/* Scrollable content area */}
          <div className="flex-1 bg-richblack-900">
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/customerprofile"
                element={
                  user === "customer" ? (
                    <CustomerProfile />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/employeeprofile"
                element={
                  user === "employee" ? (
                    <EmployeeProfile />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/adminprofile"
                element={
                  user === "admin" ? <AdminProfile /> : <Navigate to="/" />
                }
              />

              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route
                path="/customereditprofile"
                element={<UpdateCustomerProfile />}
              />
              <Route
                path="/employeeeditprofile"
                element={<EmployeeEditProfile />}
              />
              <Route path="/admineditprofile" element={<AdminEditProfile />} />
              <Route path="/" element={<HomePage />} />
              <Route
                path="/dashboard"
                element={
                  user === "customer" ? (
                    <CustomerDashboard />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/employeedashboard"
                element={
                  user === "employee" ? (
                    <EmployeeDashboard />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              {/* <Route
                path="/admindashboard"
                element={
                  user === "admin" ? <AdminDashboard /> : <Navigate to="/" />
                }
              /> */}
            </Routes>
          </div>

          {/* Fixed Footer at the bottom */}
          <Footer />
        </div>
      </AuthContext>

      <ToastContainer />
    </>
  );
}

export default App;
