import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // Update path based on your structure
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");      // ✅ define email state
  const [password, setPassword] = useState(""); // ✅ define password state
  const [error, setError] = useState("");

  const navigate = useNavigate();

 const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Check if admin and redirect accordingly
      if (user.email === "admin@pasikuthu.com") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard"); // or home
      }
    } catch (err) {
      console.error("Login failed", err.message);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F2] px-4">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-900">👋 Welcome Back!</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
