// src/pages/products/SavedRecipes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import { useAuth } from "../../context/AuthContext";

const BASE_URL = "https://pasikudum-backend.onrender.com"; // ✅ use deployment URL

const SavedRecipes = () => {
  const { user } = useAuth();
  const [saved, setSaved] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [savedRes, allRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/saved?uid=${user.uid}`),
          axios.get(`${BASE_URL}/api/all-items`)
        ]);
        setSaved(savedRes.data);
        setAllRecipes(allRes.data);
      } catch (err) {
        console.error("🔴 Failed to load saved recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleUnsave = async (savedEntryId) => {
    try {
      await axios.delete(`${BASE_URL}/api/saved/${savedEntryId}`);
      setSaved((prev) => prev.filter((r) => r._id !== savedEntryId));
    } catch (err) {
      console.error("❌ Unsave failed:", err);
    }
  };

  const savedRecipeIds = saved.map((r) => r.recipeId);
  const savedRecipes = allRecipes.filter((r) => savedRecipeIds.includes(r._id));

  if (!user) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold text-red-500">Please log in to view saved recipes</h2>
      </div>
    );
  }

  return (
    <div className="px-6 lg:px-12 py-20 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-secondary mb-8">
        ❤️ Your Saved Recipes
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading…</p>
      ) : savedRecipes.length === 0 ? (
        <p className="text-center text-gray-600">You haven't saved any recipes yet!</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedRecipes.map((item) => {
            const savedEntry = saved.find((r) => r.recipeId === item._id);
            return (
              <Card
                key={item._id}
                item={item}
                isSaved={true}
                onToggleSave={() => handleUnsave(savedEntry._id)}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SavedRecipes;
