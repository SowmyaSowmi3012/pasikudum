import React from "react";
import { GiKnifeFork, GiCookingPot, GiHerbsBundle } from "react-icons/gi";
import { FaSmileWink } from "react-icons/fa";

const steps = [
  {
    icon: <FaSmileWink className="text-4xl text-pink-600" />,
    title: "Start Simple",
    description: "Pick recipes with fewer ingredients. Master basics like rice, dal, omelette.",
    color: "bg-pink-100",
  },
  {
    icon: <GiKnifeFork className="text-4xl text-purple-600" />,
    title: "Chop-Chop Practice",
    description: "Learn basic knife skills—dicing onions, garlic, and chopping veggies evenly.",
    color: "bg-purple-100",
  },
  {
    icon: <GiCookingPot className="text-4xl text-yellow-600" />,
    title: "Understand Heat",
    description: "Low, medium, high—know when to simmer and when to sizzle!",
    color: "bg-yellow-100",
  },
  {
    icon: <GiHerbsBundle className="text-4xl text-green-600" />,
    title: "Spice it Right",
    description: "Start with common spices. Don’t overload. Taste as you go.",
    color: "bg-green-100",
  },
];

const BeginnersGuide = () => {
  return (
    <section className="bg-[#FFF8F2] min-h-screen py-10 px-6 md:px-20">
      <h1 className="text-3xl font-bold mb-6 text-green-900">👶 Beginner’s Guide</h1>
      <p className="mb-10 text-gray-700 text-lg">
        Don’t worry if you burn the first chapati—we all did! Here’s a quick guide to help you begin.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-md p-6 ${step.color} hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center gap-3 mb-4">
              {step.icon}
              <h2 className="text-xl font-semibold text-gray-800">{step.title}</h2>
            </div>
            <p className="text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BeginnersGuide;
