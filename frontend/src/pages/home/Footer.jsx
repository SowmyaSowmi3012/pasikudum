import React from "react";
import { FaInstagram, FaEnvelope, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../../public/logo.svg"; // Update this path if needed

const Footer = () => {
  return (
    <footer className="bg-[#FFF1E6] text-gray-800 py-10 px-6 md:px-20 border-t border-orange-200">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-start">
        {/* Logo & Tagline */}
        <div>
          <img src={logo} alt="Pasikuthu Logo" className="w-28 mb-3" />
          <p className="text-sm text-gray-600">
            Pasikuthu 🍛 — Recipes that hug your hunger.
          </p>
          <p className="mt-2 text-sm text-gray-500">Made with <FaHeart className="inline text-red-400" /> & tea ☕</p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/recipes" className="hover:text-orange-500">Recipes</Link></li>
            <li><Link to="/resources" className="hover:text-orange-500">Resources</Link></li>
            <li><Link to="/about" className="hover:text-orange-500">About</Link></li>
            <li><Link to="/contact" className="hover:text-orange-500">Contact</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Connect</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-orange-500" />
              <a href="mailto:chefcat.pasikuthu@gmail.com">chefcat.pasikuthu@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <FaInstagram className="text-pink-500" />
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            </li>
          </ul>
          <p className="mt-4 text-sm">👩‍🍳 Your friendly chef cat says meow!</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-10">
        © {new Date().getFullYear()} Pasikuthu. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
