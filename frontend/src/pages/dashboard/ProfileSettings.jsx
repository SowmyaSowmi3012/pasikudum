import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const BASE_URL = "https://pasikudum-backend.onrender.com";

const tasteOptions = ["Spicy", "Sweet", "Savory", "Umami", "Mild", "Sour"];
const dietaryOptions = ["Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free", "Keto"];

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    tastePreferences: [],
    dietaryRestrictions: [],
  });
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Watch for Firebase auth user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);

        axios
          .get(`${BASE_URL}/api/users/${user.uid}`)
          .then((res) => setProfile(res.data))
          .catch((err) => console.error("Failed to load user", err))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleCheckboxChange = (type, value) => {
    setProfile((prev) => {
      const field = [...prev[type]];
      const index = field.indexOf(value);
      if (index > -1) field.splice(index, 1);
      else field.push(value);
      return { ...prev, [type]: field };
    });
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("User not authenticated");

    try {
      await axios.put(`${BASE_URL}/api/users/${userId}`, profile);
      alert("Profile updated!");
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Error updating profile");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <section className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-6">👤 Profile Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Taste Preferences</label>
          <div className="flex flex-wrap gap-3">
            {tasteOptions.map((taste) => (
              <label key={taste} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={profile.tastePreferences.includes(taste)}
                  onChange={() =>
                    handleCheckboxChange("tastePreferences", taste)
                  }
                />
                {taste}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">Dietary Restrictions</label>
          <div className="flex flex-wrap gap-3">
            {dietaryOptions.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={profile.dietaryRestrictions.includes(option)}
                  onChange={() =>
                    handleCheckboxChange("dietaryRestrictions", option)
                  }
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
};

export default ProfileSettings;
