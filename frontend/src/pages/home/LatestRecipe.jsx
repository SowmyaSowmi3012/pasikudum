import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { useAuth } from "../../context/AuthContext";

const LatestRecipe = () => {
  const { user } = useAuth();           // ✅ get firebase user
  const [items, setItems] = useState([]);
  const [savedIds, setSavedIds] = useState([]); // ✅ track saved recipe IDs

  /* ───── Fetch latest recipes (first 4) ───── */
  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get("http://localhost:5000/api/all-items");
      setItems(res.data.slice(0, 4)); // keep only first 4 for “latest”
    };
    fetchItems();
  }, []);

  /* ───── Fetch saved IDs when user logs in/out ───── */
  useEffect(() => {
    if (!user) {
      setSavedIds([]);
      return;
    }

    const fetchSaved = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/saved?uid=${user.uid}`
        );
        const ids = res.data.map((doc) => doc.recipeId);
        setSavedIds(ids);
      } catch (err) {
        console.error("Could not fetch saved recipes", err);
      }
    };

    fetchSaved();
  }, [user]);

  /* ───── Toggle save / unsave ───── */
  const handleToggleSave = async (recipe) => {
    if (!user) {
      alert("Please log in to save recipes!");
      return;
    }

    const already = savedIds.includes(recipe._id);

    try {
      if (already) {
        // Unsave
        await axios.delete(
          `http://localhost:5000/api/saved?uid=${user.uid}&recipeId=${recipe._id}`
        );
        setSavedIds((prev) => prev.filter((id) => id !== recipe._id));
      } else {
        // Save
        await axios.post("http://localhost:5000/api/saved", {
          uid: user.uid,
          recipeId: recipe._id,
          title: recipe.name,
          image: recipe.thumbnail_image,
        });
        setSavedIds((prev) => [...prev, recipe._id]);
      }
    } catch (err) {
      console.error("Save/unsave failed", err);
    }
  };

  return (
    <section className="px-5 xl:px-10 py-16">
      <h2 className="text-3xl sm:text-5xl font-semibold text-secondary">
        Latest Recipes
      </h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.length ? (
          items.map((item) => (
            <Card
              key={item._id}
              item={item}
              isSaved={savedIds.includes(item._id)}
              onToggleSave={() => handleToggleSave(item)}
            />
          ))
        ) : (
          <p>Loading…</p>
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
