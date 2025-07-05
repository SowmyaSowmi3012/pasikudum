// frontend/src/pages/admin/SubmittedRecipes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const SubmittedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null); // for modal

  /* ───── fetch ─────────────────────────────────────────*/
  const fetchSubmissions = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/submitted-recipes"
      );
      setRecipes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  /* ───── handlers ──────────────────────────────────────*/
const approveRecipe = async (id) => {
  try {
    await axios.post(`http://localhost:5000/api/admin/approve/${id}`);
    alert("Recipe approved successfully!");
    fetchSubmissions(); // ✅ correct function name
  } catch (err) {
    console.error("Approve error", err.response?.data || err.message);
    alert(err.response?.data?.message || "Approval failed");
  }
};

  const rejectRecipe = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/reject/${id}`);
    fetchSubmissions();
  };

  /* ───── ui ────────────────────────────────────────────*/
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <span>📥</span> Submitted Recipes
      </h2>

      {recipes.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((r) => (
            <div key={r._id} className="p-4 bg-white rounded shadow relative">
              {r.thumbnail_image && (
                <img
                  src={r.thumbnail_image}
                  alt={r.name}
                  className="h-40 w-full object-cover rounded"
                />
              )}

              <h3 className="text-lg font-semibold mt-2">{r.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{r.category}</p>
              <p className="text-sm text-gray-700 line-clamp-3">
                {r.description}
              </p>

              {/* buttons */}
              <div className="mt-4 flex gap-3">
                <button
                  className="bg-green-600 text-white px-4 py-1 rounded"
                  onClick={() => approveRecipe(r._id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => rejectRecipe(r._id)}
                >
                  Reject
                </button>
                <button
                  className="ml-auto text-blue-600 text-sm underline"
                  onClick={() => setSelected(r)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ───── modal ──────────────────────────────────────*/}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-start md:items-center justify-center z-50">
          <div className="bg-white max-h-[90vh] overflow-y-auto w-[95%] md:w-[700px] rounded-lg p-6 relative">
            <button
              className="absolute right-4 top-3 text-xl"
              onClick={() => setSelected(null)}
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
            <p className="text-gray-600 mb-4">{selected.description}</p>

            {selected.thumbnail_image && (
              <img
                src={selected.thumbnail_image}
                alt={selected.name}
                className="w-full h-60 object-cover rounded mb-4"
              />
            )}

            <p className="mb-2">
              <strong>Category:</strong> {selected.category}
            </p>

            <p className="mb-2">
              <strong>Prep Time:</strong>{" "}
              {selected.more?.[0]?.prep_time || "N/A"} &nbsp;&nbsp;
              <strong>Cook Time:</strong>{" "}
              {selected.more?.[0]?.cook_time || "N/A"}
            </p>

            <div className="mb-4">
              <strong>Ingredients:</strong>
              <ul className="list-disc ml-6 mt-1">
                {selected.ingredients?.map((ing, idx) => (
                  <li key={idx}>
                    {ing.name} – {ing.quantity}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4 whitespace-pre-wrap">
              <strong>Instructions:</strong>
              <p className="mt-1">{selected.instructions}</p>
            </div>

            <div className="flex gap-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  approveRecipe(selected._id);
                  setSelected(null);
                }}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  rejectRecipe(selected._id);
                  setSelected(null);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmittedRecipes;
