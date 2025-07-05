import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

 useEffect(() => {
  axios.get("http://localhost:5000/api/users")
    .then(res => {
      setUsers(res.data);
      console.log("Fetched users:", res.data);

      // Log each user clearly
      res.data.forEach(user => {
        console.log("User:", JSON.stringify(user, null, 2));
      });
    })
    .catch(err => console.log("Error fetching users:", err));
}, []);
  // Helper: Format createdAt from Firestore Timestamp or string
const getFormattedDate = (createdAt) => {
  if (!createdAt) return "N/A";

  const date = new Date(createdAt);
  return isNaN(date) ? "Invalid Date" : date.toLocaleString();
};

  return (
    <div className="p-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">👥 Registered Users</h1>

      {users.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 text-gray-700">Name</th>
                <th className="p-3 text-gray-700">Email</th>
                <th className="p-3 text-gray-700">Registered At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                console.log("User object:", user); // For debugging

                return (
                  <tr key={user.uid || user.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-gray-800">
                      {user.name || user.displayName || "N/A"}
                    </td>
                    <td className="p-3 text-gray-800">
                      {user.email || "N/A"}
                    </td>
                   <td className="p-3">
  {user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A"}
</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
