import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryWrapper from "../category/CategoryWrapper";
import Card from "../../components/Card";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Recipes = () => {
  const [items, setItems] = useState([]);
  const [savedIds, setSavedIds] = useState([]); // array of recipeId strings
  const [user, setUser] = useState(null);

  /* ───────────────────────────────
     Listen to Firebase login state
  ─────────────────────────────── */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  /* ───────────────────────────────
     Fetch ALL recipes on mount
  ─────────────────────────────── */
  useEffect(() => {
    const fetchAll = async () => {
      const res = await axios.get("http://localhost:5000/api/all-items");
      setItems(res.data);
    };
    fetchAll();
  }, []);

  /* ───────────────────────────────
     Fetch SAVED recipes for user
  ─────────────────────────────── */
  useEffect(() => {
    if (!user) return setSavedIds([]);
    const fetchSaved = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/saved?uid=${user.uid}`
      );
      setSavedIds(res.data.map((r) => r.recipeId)); // array of IDs
    };
    fetchSaved();
  }, [user]);

  /* ───────────────────────────────
     Save / Unsave handler
  ─────────────────────────────── */
  const toggleSave = async (recipe) => {
    if (!user) {
      alert("Please log in to save recipes!");
      return;
    }

    const alreadySaved = savedIds.includes(recipe._id);

    if (alreadySaved) {
      // unsave (DELETE)
      const savedEntry = await axios.get(
        `/api/saved?uid=${user.uid}&recipeId=${recipe._id}`
      ); // optional endpoint to obtain saved _id
      if (savedEntry.data[0]) {
        await axios.delete(`/api/saved/${savedEntry.data[0]._id}`);
      }
      setSavedIds((prev) => prev.filter((id) => id !== recipe._id));
    } else {
      // save (POST)
      await axios.post("http://localhost:5000/api/saved", {
        uid: user.uid,
        recipeId: recipe._id,
        title: recipe.name,
        image: recipe.thumbnail_image,
      });
      setSavedIds((prev) => [...prev, recipe._id]);
    }
  };

  return (
    <div className="px-6 lg:px-12 py-20">
      <h1 className="text-3xl font-semibold text-secondary sm:text-5xl text-center">
        All Recipes
      </h1>

      <CategoryWrapper />

      <ul className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((item) => (
          <Card
            key={item._id}
            item={item}
            isSaved={savedIds.includes(item._id)}
            onToggleSave={() => toggleSave(item)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
