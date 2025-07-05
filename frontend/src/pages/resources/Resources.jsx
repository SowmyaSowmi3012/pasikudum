import React from "react";
import { Link } from "react-router-dom";

const resourceLinks = [
  {
    title: "Kitchen Basics",
    description: "Set up your Tamil kitchen like a pro.",
    path: "/resources/kitchen-basics",
    emoji: "🍳",
    color: "bg-yellow-100",
  },
  {
    title: "Cooking Tips & Hacks",
    description: "Speedy, silly & smart food hacks.",
    path: "/resources/cooking-tips",
    emoji: "⏱️",
    color: "bg-green-100",
  },
  {
    title: "Beginner’s Guide",
    description: "Start your cooking journey here!",
    path: "/resources/beginners-guide",
    emoji: "👩‍🍳",
    color: "bg-pink-100",
  },
  {
    title: "Glossary",
    description: "Tamil to English foodie dictionary.",
    path: "/resources/glossary",
    emoji: "📚",
    color: "bg-purple-100",
  },
];

const Resources = () => {
  return (
    <div className="bg-[#FFF8F2] min-h-screen py-10 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-800">Resources</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {resourceLinks.map((resource, idx) => (
          <Link
            to={resource.path}
            key={idx}
            className={`rounded-xl p-6 shadow-lg hover:shadow-xl transition ${resource.color} hover:scale-105`}
          >
            <div className="text-5xl mb-4">{resource.emoji}</div>
            <h2 className="text-2xl font-semibold text-gray-800">{resource.title}</h2>
            <p className="text-gray-600 mt-2">{resource.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Resources;
