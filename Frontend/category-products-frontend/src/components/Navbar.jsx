// src/components/Navbar.js
import { useContext } from "react";
import ProfileDropdown from "./UI/ProfileDown";
import RSROBank from "../assets/Images/RSROBank.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext/auth.context";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const hiddenRoutes = ["/", "/login", "/signup"];
  const shouldHideDropdown = hiddenRoutes.includes(location.pathname);

  return (
    <nav className="bg-[#0B2E53] text-white px-6 py-3 shadow-md flex items-center justify-between">
      <div className="text-xl font-bold tracking-wide">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="text-white d-flex">
            <img
              src={RSROBank}
              alt=""
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
        {user && !shouldHideDropdown && <ProfileDropdown />}
      </div>
    </nav>
  );
};

export default Navbar;
