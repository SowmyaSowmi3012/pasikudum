import React from "react";
import { Link } from "react-router-dom";
import catChef from "../../assets/cat3.jpg";
const NewsLetter = () => {
  return (
    <section className="bg-[#FFF2CC] py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* TEXT CONTENT */}
        <div className=" text-center lg:text-left">
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            💌 Hug in Your Inbox
          </h2>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Fresh recipes 🥗, kitchen tales 🍳, and cat-approved tips 🐾 — all delivered straight to you.
          </p>

          <Link to="/contact">
            <button className="bg-btnColor text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-orange-500 transition">
              📬 Send Me the Goods
            </button>
          </Link>

          <p className="mt-6 text-sm text-gray-500">
            P.S. Our chef cat promises not to spam—only serve warm, tasty content. 😺✨
          </p>
        </div>

        {/* CAT IMAGE */}
        <div className="">
          <img
            src={catChef}
            alt="Chef Cat Mascot"
            className="w-64 h-64 object-cover mx-auto lg:mx-0 rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
