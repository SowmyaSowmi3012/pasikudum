import React from "react";
import { Link } from "react-router-dom";

const DesktopNav = ({ menuItems, logo, user,isAdmin, onLogout }) => {
  return (
    <div className="h-16 flex justify-between items-center px-6 lg:px-12 mt-4">
      <Link to="/">
        <img src={logo} alt="logo" className="h-[12rem] -my-6 object-contain" />
      </Link>

      {/* Main menu */}
      {/* regular menu */}
      <ul className="flex gap-7 text-xl">
        {menuItems.map((m) => (
          <li key={m} className="capitalize text-secondary">
            <Link to={`/${m}`}>{m}</Link>
          </li>
        ))}
        {user && (
  <li className="text-blue-600 font-semibold">
    <Link to={isAdmin ? "/admin-dashboard" : "/dashboard"}>
      {isAdmin ? "Admin" : "Dashboard"}
    </Link>
  </li>
)}
      </ul>
      
      {/* Auth Buttons */}
       <ul className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm">{user.email}</span>
            <button onClick={onLogout} className="px-4 py-2 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default DesktopNav;
