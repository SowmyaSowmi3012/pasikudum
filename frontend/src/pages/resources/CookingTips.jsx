import React from "react";
import { GiFireBowl, GiWashingMachine, GiKnifeFork, GiCookingPot } from "react-icons/gi";
import { MdOutlineTimer, MdOutlineCleaningServices } from "react-icons/md";

const tips = [
  {
    icon: <GiFireBowl className="text-4xl text-orange-600" />,
    title: "Preheat for Power",
    description: "Always preheat your oven or pan for even cooking and better texture.",
    color: "bg-orange-100",
  },
  {
    icon: <GiWashingMachine className="text-4xl text-blue-600" />,
    title: "Rinse Smart",
    description: "Wash rice and lentils to remove excess starch and get fluffier results.",
    color: "bg-blue-100",
  },
  {
    icon: <MdOutlineTimer className="text-4xl text-emerald-600" />,
    title: "Use Timers",
    description: "Even pros forget! Set a timer for boiling, baking, or marinating.",
    color: "bg-emerald-100",
  },
  {
    icon: <GiKnifeFork className="text-4xl text-purple-600" />,
    title: "Knife Know-How",
    description: "Use the right knife for the job. It’s safer and makes prep faster!",
    color: "bg-purple-100",
  },
  {
    icon: <GiCookingPot className="text-4xl text-yellow-600" />,
    title: "Simmer, Don’t Rush",
    description: "Let flavors develop by simmering gravies and curries slowly.",
    color: "bg-yellow-100",
  },
  {
    icon: <MdOutlineCleaningServices className="text-4xl text-rose-600" />,
    title: "Clean As You Go",
    description: "Tidy up while cooking—it reduces stress and post-meal mess.",
    color: "bg-rose-100",
  },
];

const CookingTips = () => {
  return (
    <section className="bg-[#FFF8F2] min-h-screen py-10 px-6 md:px-20">
      <h1 className="text-3xl font-bold mb-6 text-green-900">🍲 Cooking Tips</h1>
      <p className="mb-10 text-gray-700 text-lg">
        Handy hacks and quick reminders to make your cooking smarter, safer, and more joyful.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-md p-6 ${tip.color} hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center gap-3 mb-4">
              {tip.icon}
              <h2 className="text-xl font-semibold text-gray-800">{tip.title}</h2>
            </div>
            <p className="text-gray-700">{tip.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CookingTips;
