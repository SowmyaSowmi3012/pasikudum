import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, emoji, to }) => (
  <Link
    to={to}
    className="bg-white border rounded-xl p-6 shadow hover:shadow-md transition block"
  >
    <h2 className="text-xl font-semibold mb-1">
      {emoji} {title}
    </h2>
    <p className="text-gray-600 text-sm">Manage {title.toLowerCase()} here</p>
  </Link>
);

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#fff9f4] px-6 py-10 md:px-20">
      <h1 className="text-3xl font-bold text-[#4a2d0b] mb-10">
        👩‍🍳 Admin Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card title="View All Users" emoji="👥" to="/admin/users" />
        <Card title="Submitted Recipes" emoji="📥" to="/admin/submissions" />
        <Card title="Stats & Analytics" emoji="📊" to="/admin/analytics" />
        <Card title="Manage Recipes" emoji= "🗑️" to ="/admin/recipes"/>
      </div>
    </div>
  );
};

export default AdminDashboard;
