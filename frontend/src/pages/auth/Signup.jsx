import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FaCat, FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await updateProfile(userCred.user, { displayName: form.name });
      navigate("/"); // redirect home
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#FFF8F2] px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-green-900 mb-6 flex items-center justify-center gap-2">
          <FaUserPlus /> Create Account
        </h1>

        <input
          name="name"
          placeholder="Name"
          className="mb-4 w-full border border-gray-300 rounded px-4 py-3"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="mb-4 w-full border border-gray-300 rounded px-4 py-3"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="mb-6 w-full border border-gray-300 rounded px-4 py-3"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-btnColor text-white py-3 rounded hover:bg-orange-500 transition"
        >
          Sign Up 🎉
        </button>

        <p className="mt-6 text-sm text-center">
          Already a member?{" "}
          <Link to="/login" className="text-orange-600 font-semibold">
            Log In
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Signup;
