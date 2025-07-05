import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";

const AllRecipesAdmin = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchAll = async () => {
    const { data } = await axios.get("http://localhost:5000/api/all-items");
    setRecipes(data);
  };

  useEffect(() => { fetchAll(); }, []);

const handleDelete = async (id) => {
  try {
   await axios.delete(`http://localhost:5000/api/admin/delete/${id}`);
    // refresh list...
  } catch (err) {
    console.error("Delete error", err.response?.data || err.message);
    alert(err.response?.data?.message || "Server error");
  }
};

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">🗑️ Manage Recipes</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((r) => (
          <div key={r._id} className="relative">
            <Card item={r} /> {/* normal user card */}
            {/* delete overlay */}
            <button
              onClick={() => handleDelete(r._id)}
              className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded"
              title="Delete recipe">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipesAdmin;
