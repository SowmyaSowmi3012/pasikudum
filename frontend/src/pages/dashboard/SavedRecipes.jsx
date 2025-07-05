// src/pages/products/SavedRecipes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import { useAuth } from "../../context/AuthContext";

const SavedRecipes = () => {
  const { user } = useAuth();
  const [saved, setSaved] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      const res = await axios.get(`http://localhost:5000/api/saved?uid=${user.uid}`);
      setSaved(res.data);
    };
    const fetchAll = async () => {
      const res = await axios.get("http://localhost:5000/api/all-items");
      setAllRecipes(res.data);
    };
    if (user) {
      fetchSaved();
      fetchAll();
    }
  }, [user]);

  const savedRecipeIds = saved.map((r) => r.recipeId);

  const handleUnsave = async (savedEntryId) => {
    await axios.delete(`http://localhost:5000/api/saved/${savedEntryId}`);
    setSaved((prev) => prev.filter((r) => r._id !== savedEntryId));
  };

  // Filter only saved full recipe objects
  const savedRecipes = allRecipes.filter((r) => savedRecipeIds.includes(r._id));

  return (
    <div className="px-6 lg:px-12 py-20 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-secondary mb-8">
        ❤️ Your Saved Recipes
      </h1>

      {savedRecipes.length === 0 ? (
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
