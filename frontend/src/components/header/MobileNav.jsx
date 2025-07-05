import React from "react";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const MobileNav = ({ menuItems, logo,user,isAdmin, onClose, hideLeft, onOpen,onLogout }) => {
  return (
    <div className="h-16 flex justify-between items-center px-6 lg:px-12">
      <a href="/">
        <img src={logo} alt="logo"  className="h-[12rem] -my-6 object-contain"/>
      </a>
      <button onClick={onOpen} className="border border-primary rounded">
        <IoMdMenu className="w-7 h-7 text-black" />
      </button>
     <div
  className={`transition-all fixed inset-0 w-full h-full bg-primary z-50 ${hideLeft} flex justify-center items-center overflow-auto`}
>
  <button className="absolute right-6 top-6 text-black" onClick={onClose}>
    <IoClose className="w-7 h-7 text-black" />
  </button>

  <div className="flex flex-col gap-6 items-center text-center px-6 w-full max-w-xs mx-auto">
    {/* Navigation Links */}
    <ul className="flex flex-col gap-4 text-xl font-medium w-full">
      {menuItems.map((m) => (
        <li key={m} className="capitalize">
          <Link to={`/${m}`} onClick={onClose}>
            {m}
          </Link>
        </li>
      ))}
      {user && (
        <li>
          <Link to={isAdmin ? "/admin-dashboard" : "/dashboard"} onClick={onClose}>
            {isAdmin ? "Admin" : "Dashboard"}
          </Link>
        </li>
      )}
    </ul>

    {/* Auth Section */}
    <div className="flex flex-col items-center gap-2 text-sm">
      {user ? (
        <>
          <span>{user.email}</span>
          <button onClick={onLogout}className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold shadow hover:opacity-90 transition">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" onClick={onClose} className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold shadow hover:opacity-90 transition">
            Login
          </Link>
          <Link to="/signup" onClick={onClose} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
            Sign Up
          </Link>
        </>
      )}
    </div>
  </div>
</div>
    </div>
  );
};

export default MobileNav;
