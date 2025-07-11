import React, { useState } from "react";
import axios from "axios";

const SubmitRecipe = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("Entrees");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [source, setSource] = useState("Submitted by user");
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [instructions, setInstructions] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const addIngredient = () =>
    setIngredients([...ingredients, { name: "", quantity: "" }]);

  const onIngredientChange = (idx, field, value) => {
    const clone = [...ingredients];
    clone[idx][field] = value;
    setIngredients(clone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setSubmitting(true);

    // Basic validation
    if (!name.trim() || !description.trim() || !thumbnail.trim()) {
      setStatus("❌ Please fill the required fields (*)");
      setSubmitting(false);
      return;
    }

    const recipeData = {
      menuId: Date.now(),
      name: name.trim(),
      description: description.trim(),
      thumbnail_image: thumbnail.trim(),
      category,
      instructions: instructions.trim(),
      tags: [],
      ingredients: ingredients.filter(i => i.name || i.quantity),
      comments: [],
      more: [{
        prep_time: prepTime || "N/A",
        cook_time: cookTime || "N/A",
        servings: servings || "1",
        difficulty: difficulty || "Unknown",
        source: source || "Submitted by user"
      }]
    };

    try {
      const res = await axios.post("https://pasikudum-backend.onrender.com/api/submit-recipe", recipeData);
      setStatus("✅ Recipe sent! An admin will review it.");

      // Reset form
      setName("");
      setDescription("");
      setThumbnail("");
      setCategory("Entrees");
      setPrepTime("");
      setCookTime("");
      setServings("");
      setDifficulty("Easy");
      setSource("Submitted by user");
      setIngredients([{ name: "", quantity: "" }]);
      setInstructions("");
    } catch (err) {
      console.error("🔴 Recipe submission error:", err.response?.data || err.message);
      setStatus("❌ Could not send recipe. Server error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen px-6 py-10 md:px-20 bg-[#FFF8F2]">
      <h1 className="text-4xl font-bold text-green-800 mb-8">✍️ Submit Your Recipe</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-xl shadow-md space-y-6 max-w-3xl">
        {/* Name */}
        <div>
          <label className="font-semibold">Recipe Name*<br />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-3 py-2 rounded mt-1" />
          </label>
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Short Description*<br />
            <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border px-3 py-2 rounded mt-1" />
          </label>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="font-semibold">Thumbnail Image URL*<br />
            <input type="text" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} className="w-full border px-3 py-2 rounded mt-1" />
          </label>
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold">Category<br />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border px-3 py-2 rounded mt-1">
              <option>Entrees</option>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Desserts</option>
              <option>Sides</option>
              <option>Drinks</option>
            </select>
          </label>
        </div>

        {/* Prep/Cook Time */}
        <div className="grid md:grid-cols-2 gap-4">
          <label className="font-semibold">Prep Time<br />
            <input type="text" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} placeholder="15 mins" className="w-full border px-3 py-2 rounded mt-1" />
          </label>
          <label className="font-semibold">Cook Time<br />
            <input type="text" value={cookTime} onChange={(e) => setCookTime(e.target.value)} placeholder="25 mins" className="w-full border px-3 py-2 rounded mt-1" />
          </label>
        </div>

        {/* Servings/Difficulty */}
        <div className="grid md:grid-cols-2 gap-4">
          <label className="font-semibold">Servings<br />
            <input type="text" value={servings} onChange={(e) => setServings(e.target.value)} placeholder="e.g. 2" className="w-full border px-3 py-2 rounded mt-1" />
          </label>
          <label className="font-semibold">Difficulty<br />
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full border px-3 py-2 rounded mt-1">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
              <option>Unknown</option>
            </select>
          </label>
        </div>

        {/* Source */}
        <div>
          <label className="font-semibold">Source<br />
            <input type="text" value={source} onChange={(e) => setSource(e.target.value)} className="w-full border px-3 py-2 rounded mt-1" />
          </label>
        </div>

        {/* Ingredients */}
        <div>
          <p className="font-semibold mb-2">Ingredients</p>
          {ingredients.map((ing, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input type="text" placeholder="Name" value={ing.name} onChange={(e) => onIngredientChange(idx, "name", e.target.value)} className="flex-1 border px-2 py-1 rounded" />
              <input type="text" placeholder="Qty" value={ing.quantity} onChange={(e) => onIngredientChange(idx, "quantity", e.target.value)} className="w-28 border px-2 py-1 rounded" />
            </div>
          ))}
          <button type="button" onClick={addIngredient} className="text-sm text-blue-600">+ add ingredient</button>
        </div>

        {/* Instructions */}
        <div>
          <label className="font-semibold">Instructions<br />
            <textarea rows="5" value={instructions} onChange={(e) => setInstructions(e.target.value)} className="w-full border px-3 py-2 rounded mt-1" />
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className={`bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ${submitting && "opacity-50 cursor-not-allowed"}`}
        >
          {submitting ? "Submitting..." : "Submit Recipe"}
        </button>

        {status && <p className="mt-3">{status}</p>}
      </form>
    </section>
  );
};

export default SubmitRecipe;
