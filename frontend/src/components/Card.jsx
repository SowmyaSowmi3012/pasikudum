import React from "react";
import { Link } from "react-router-dom";
import { GoClock } from "react-icons/go";
import { FaHeart, FaRegHeart } from "react-icons/fa";

/**
 * Card component
 * @param {object}   item         – recipe object
 * @param {boolean}  isSaved      – whether this recipe is saved
 * @param {Function} onToggleSave – handler to save / unsave (if null → disabled)
 */
const Card = ({
  item,
  isSaved = false,
  onToggleSave = null, // 👉 null means button disabled
}) => {
  /* ───────── category colors ───────── */
  const categoryStyles = {
    Entrees:   { bg: "#f0f5c4", color: "#59871f" },
    Breakfast: { bg: "#efedfa", color: "#3c3a8f" },
    Lunch:     { bg: "#e5f7f3", color: "#1f8787" },
    Desserts:  { bg: "#e8f5fa", color: "#397a9e" },
    Sides:     { bg: "#feefc9", color: "#d16400" },
    Drinks:    { bg: "#ffeae3", color: "#f0493e" },
    default:   { bg: "#fff",    color: "#000"    },
  };
  const catStyle = categoryStyles[item?.category] || categoryStyles.default;

  /* ───────── component ───────── */
  return (
    <div className="w-[280px]">
      <div className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition flex flex-col h-full group">
        {/* Image */}
        <img
          src={item?.thumbnail_image}
          alt={item?.name || "recipe image"}
          className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
        />

        {/* Save / Unsave Button */}
        <button
          onClick={onToggleSave ?? (() => {})}
          disabled={!onToggleSave}
          className={`absolute top-3 right-3 text-xl ${
            onToggleSave ? "text-red-500" : "text-gray-300 cursor-not-allowed"
          }`}
          title={onToggleSave ? (isSaved ? "Un‑save" : "Save") : "Log in to save"}
        >
          {isSaved ? <FaHeart /> : <FaRegHeart />}
        </button>

        {/* Difficulty Tag */}
        <div className="absolute top-3 left-3 bg-white px-2 py-1 text-xs rounded font-medium shadow">
          {item?.more?.[0]?.difficulty}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 px-5 py-4">
          <Link to={`/items/${item._id}`}>
            <h2 className="text-gray-700 font-bold text-lg mb-3 line-clamp-2 hover:text-gray-900 transition-colors">
              {item?.name}
            </h2>
          </Link>

          {/* Footer */}
          <div className="mt-auto flex justify-between items-center">
            <button
              className="text-sm font-medium px-3 py-1 rounded-lg shadow-md"
              style={{ backgroundColor: catStyle.bg, color: catStyle.color }}
            >
              {item?.category}
            </button>

            <div className="flex items-center text-sm">
              <GoClock className="mr-1" />
              <span>{item?.more?.[0]?.prep_time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
