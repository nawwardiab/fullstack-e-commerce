// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      await axios.post("/api/register", { fullName, email, password });
      setSuccessMsg("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("An error occurred during registration.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {errorMsg && (
          <div className="mb-4 text-red-500 text-center">{errorMsg}</div>
        )}
        {successMsg && (
          <div className="mb-4 text-green-500 text-center">{successMsg}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name..."
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password..."
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
          >
            Continue
          </button>
        </form>
             <p className="mt-4 text-center">
                  If you don't have an account.Please register{' '}
                  <Link to="/signup" className="text-blue-500">
                   here
                  </Link>
                </p>
                When you create an account, you agree to our <Link>Terms of use</Link>. <br /> Learn how we handle your data in our <Link>Privacy notice</Link>.
      </div>
    </div>
  );
};

export default Signup;
