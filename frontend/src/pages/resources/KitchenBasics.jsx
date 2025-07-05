import React from "react";
import {
  GiSpiralBottle,        // used instead of GiSpiceRack
  GiRiceCooker,
  GiKitchenScale,
  GiCookingPot,
  GiOilDrum,
  GiCheeseWedge,
  GiKnifeFork,
} from "react-icons/gi";
import { FaBoxOpen, FaGlobeAmericas, FaBacon } from "react-icons/fa";

const kitchenSections = [
  {
    title: "🌶️ Indian Spices",
    icon: <GiSpiralBottle className="text-4xl text-yellow-700" />, // changed
    color: "bg-yellow-100",
    items: [
      "Mustard, Cumin, Fenugreek",
      "Hing, Curry Leaves, Coriander",
      "Turmeric, Kashmiri Chili Powder",
    ],
  },
  {
    title: "🍞 International Staples",
    icon: <FaGlobeAmericas className="text-4xl text-blue-700" />,
    color: "bg-blue-100",
    items: [
      "Olive Oil, Pasta, Soy Sauce",
      "Couscous, Oats, Quinoa",
      "Herbs: Thyme, Rosemary, Oregano",
    ],
  },
  {
    title: "🧰 Common Utensils",
    icon: <GiRiceCooker className="text-4xl text-pink-600" />,
    color: "bg-pink-100",
    items: [
      "Mixie, Pressure Cooker",
      "Rice Cooker, Oven, Skillet",
      "Tadka Pan, Wok",
    ],
  },
  {
    title: "📏 Tools & Gadgets",
    icon: <GiKitchenScale className="text-4xl text-green-700" />,
    color: "bg-green-100",
    items: [
      "Measuring Cups & Scale",
      "Chopping Boards, Peelers",
      "Spoons, Ladles, Tongs",
    ],
  },
  {
    title: "🧂 Condiments & Oils",
    icon: <GiOilDrum className="text-4xl text-amber-700" />,
    color: "bg-amber-100",
    items: [
      "Sesame, Coconut, Sunflower Oil",
      "Ghee, Vinegar, Soy Sauce",
      "Hot Sauce, Tomato Ketchup",
    ],
  },
  {
    title: "🧀 Dairy & Fridge",
    icon: <GiCheeseWedge className="text-4xl text-indigo-600" />,
    color: "bg-indigo-100",
    items: [
      "Butter, Cheese, Yogurt",
      "Milk, Eggs, Paneer",
      "Tofu, Cream, Mayonnaise",
    ],
  },
  {
    title: "🔪 Cutting & Prep",
    icon: <GiKnifeFork className="text-4xl text-red-600" />,
    color: "bg-red-100",
    items: [
      "Chef’s Knife, Paring Knife",
      "Mandoline, Mortar & Pestle",
      "Graters, Kitchen Scissors",
    ],
  },
  {
    title: "🥓 Proteins & Meats",
    icon: <FaBacon className="text-4xl text-rose-700" />,
    color: "bg-rose-100",
    items: [
      "Lentils, Beans, Chickpeas",
      "Chicken, Fish, Shrimp",
      "Tofu, Tempeh, Soya Chunks",
    ],
  },
];

const KitchenBasics = () => {
  return (
    <section className="bg-[#FFF8F2] min-h-screen py-10 px-6 md:px-20">
      <h1 className="text-3xl font-bold mb-6 text-green-900">👩‍🍳 Kitchen Basics</h1>
      <p className="mb-10 text-gray-700 text-lg">
        A complete starter guide to building a well-rounded global kitchen—from Indian spices to global gadgets and pantry must-haves.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kitchenSections.map((section, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-md p-6 ${section.color} hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center gap-3 mb-4">
              {section.icon}
              <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {section.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KitchenBasics;
