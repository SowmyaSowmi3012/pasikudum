import React from "react";
import chefCat from "../../assets/catchef.jpg"; // Ensure the path is correct

const About = () => {
  return (
    <div className="bg-[#FFF8F2] min-h-screen py-12 px-6 md:px-20">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <img
            src={chefCat}
            alt="Cute Chef Cat"
            className="w-full max-w-sm mx-auto lg:mx-0 rounded-lg shadow-md"
          />
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-green-800 mb-6">🍽️ My Story</h1>

          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            Welcome to <strong>Pasikuthu</strong> — where food meets fun! 🍛✨ Every recipe here comes with a sprinkle of joy, a spoonful of stories, and a dash of laughter. 😄
          </p>

          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            I started this cozy corner of the internet to share my love for cooking 🍳 — from amma's secret rasam to 2 AM Nutella experiments 🍫. If food is love, this site is one big warm hug. 🤗
          </p>

          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            And guess what? I’m not cooking alone. Meet <span className="font-semibold text-pink-600">Chef Meow 🐱‍🍳</span> — my fluffy sous-chef. He naps during prep 💤, appears when the aroma kicks in 🍲, and disappears conveniently at dishwashing time 🧽.
          </p>

          <p className="text-gray-700 text-lg mb-4 leading-relaxed">
            Whether you’re new to the kitchen or just here for the vibes 🧘‍♀️, this space is yours — to explore, to try, to mess up, to laugh, and to eat! 😋
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            So tie your apron 🎀, grab that ladle 🥄, and let’s stir up some memories — one delicious mess at a time. 💚🫶
          </p>

          <div className="mt-6">
            <a
              href="/recipes"
              className="inline-block bg-orange-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-500 transition"
            >
              🍲 Browse Recipes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
