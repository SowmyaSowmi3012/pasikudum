import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { useAuth } from "../../context/AuthContext";

const BASE_URL = "https://pasikudum-backend.onrender.com"; // ✅ production URL

const LatestRecipe = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch latest 4 recipes
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/all-items`);
        setItems(res.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching latest items", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // ✅ Fetch saved recipe IDs for current user
  useEffect(() => {
    if (!user) {
      setSavedIds([]);
      return;
    }

    const fetchSaved = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/saved?uid=${user.uid}`);
        const ids = res.data.map((doc) => doc.recipeId);
        setSavedIds(ids);
      } catch (err) {
        console.error("Could not fetch saved recipes", err);
      }
    };

    fetchSaved();
  }, [user]);

  // ✅ Save or unsave recipe
  const handleToggleSave = async (recipe) => {
    if (!user) {
      alert("Please log in to save recipes!");
      return;
    }

    const alreadySaved = savedIds.includes(recipe._id);

    try {
      if (alreadySaved) {
        await axios.delete(`${BASE_URL}/api/saved?uid=${user.uid}&recipeId=${recipe._id}`);
        setSavedIds((prev) => prev.filter((id) => id !== recipe._id));
      } else {
        await axios.post(`${BASE_URL}/api/saved`, {
          uid: user.uid,
          recipeId: recipe._id,
          title: recipe.name,
          image: recipe.thumbnail_image,
        });
        setSavedIds((prev) => [...prev, recipe._id]);
      }
    } catch (err) {
      console.error("Error while saving/unsaving recipe", err);
    }
  };

  return (
    <section className="px-5 xl:px-10 py-16">
      <h2 className="text-3xl sm:text-5xl font-semibold text-secondary">
        Latest Recipes
      </h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {loading ? (
          <p className="col-span-full text-center">Loading…</p>
        ) : (
          items.map((item) => (
            <Card
              key={item._id}
              item={item}
              isSaved={savedIds.includes(item._id)}
              onToggleSave={() => handleToggleSave(item)}
            />
          ))
        )}
      </div>

      <div className="sm:w-64 mx-auto mt-16">
        <Link to="/recipes">
          <button
            type="button"
            className="w-full px-8 py-4 border border-[#9c703a] text-secondary font-semibold rounded-lg hover:bg-btnColor hover:text-white transition"
          >
            View All Recipes
          </button>
        </Link>
      </div>
    </section>
  );
};

export default LatestRecipe;
