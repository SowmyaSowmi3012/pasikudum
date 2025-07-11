import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";

const BASE_URL = "https://pasikudum-backend.onrender.com";

const AllRecipesAdmin = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/all-items`);
      setRecipes(data);
    } catch (err) {
      setError("Failed to load recipes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/admin/delete/${id}`);
      setRecipes((prev) => prev.filter((item) => item._id !== id)); // remove from UI
    } catch (err) {
      console.error("Delete error", err.response?.data || err.message);
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">🗑️ Manage Recipes</h2>

      {loading && <p>Loading recipes…</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((r) => (
          <div key={r._id} className="relative">
            <Card item={r} />
            <button
              onClick={() => handleDelete(r._id)}
              className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded"
              title="Delete recipe"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipesAdmin;
