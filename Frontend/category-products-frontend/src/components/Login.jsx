import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { loginUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/auth.context";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);

      if (response.success) {
        alert(`Logged in as ${email}`);
        console.log("Login successful:", response);
        setUser({
          email,
          role: "customer"
        })
        navigate("/dashboard")
        // Navigate to dashboard or store token here
      } else {
        alert("Message : " + response.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
