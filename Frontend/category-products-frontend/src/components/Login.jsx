import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, verifyOtp } from "../services/userService";
import { AuthContext } from "../AuthContext/auth.context";
import { Lock, User } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const [requireOtp, setRequireOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);

      if (response.requireOtp) {
        alert("OTP sent to your email.");
        setRequireOtp(true); // Show OTP input field
      } else if (response.jwt) {
        alert(`Logged in as ${email}`);
        sessionStorage.setItem("jwt", response.jwt);
        setUser({ email, role: "customer" });
        navigate("/dashboard");
      } else {
        alert("Login failed: " + response.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOtp(email, otp);
      if (response.jwt) {
        alert("OTP verified! Logged in.", response);
        sessionStorage.setItem("jwt", response.jwt);
        setUser({ email, role: "customer" });
        navigate("/dashboard");
      } else {
        alert("Message : " + response.message);
      }
    } catch (error) {
      console.error("OTP error:", error);
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] py-10 px-4 text-[#0B2E53] font-sans flex justify-center items-center">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-[#0B2E53]/20 px-10 py-12">
        <h2 className="text-3xl font-bold text-center text-[#0B2E53] mb-10">
          Login
        </h2>
        {!requireOtp ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                <User className="w-4 h-4" /> Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                <Lock className="w-4 h-4" /> Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0B2E53] text-white font-semibold py-2 rounded-lg hover:bg-[#143c6b] transition duration-300"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0B2E53] text-white font-semibold py-2 rounded-lg hover:bg-[#143c6b] transition duration-300"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
