import React from "react";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF8F2] px-6 py-12 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-6">👋 Welcome Back, Chef!</h1>

        <p className="text-lg text-gray-700 mb-8">Here’s your personalized cooking space! 🍲</p>

        <div className="grid md:grid-cols-2 gap-6">
            <Link to="/saved">
          <div className="bg-pink-100 rounded-xl shadow-md p-6 hover:shadow-lg">
            <h2 className="text-xl font-bold mb-2">❤️ Saved Recipes</h2>
            <p>All your bookmarked dishes, in one place.</p>
           
          </div>
           </Link>
            <Link to="/submit">
          <div className="bg-green-100 rounded-xl shadow-md p-6 hover:shadow-lg">
           
            <h2 className="text-xl font-bold mb-2">✍️ Submit Your Recipe</h2>
            <p>Got a recipe? Share it with the world!</p>
          </div>
          </Link>
          <Link to ="/profile">
          <div className="bg-rose-100 rounded-xl shadow-md p-6 hover:shadow-lg">
            <h2 className="text-xl font-bold mb-2">👤 Profile Settings</h2>
            <p>Update your taste preferences & info.</p>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
