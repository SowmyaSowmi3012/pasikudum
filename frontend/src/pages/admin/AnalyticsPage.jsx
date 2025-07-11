import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const BASE_URL = "https://pasikudum-backend.onrender.com";

const AnalyticsPage = () => {
  const [counts, setCounts] = useState({
    users: 0,
    recipes: 0,
    saved: 0,
    submitted: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/admin/analytics`);
        setCounts(data);
      } catch (err) {
        console.error("🔴 Analytics fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const makeChartData = () => ({
    labels: ["Users", "Recipes", "Saved", "Submitted"],
    datasets: [
      {
        label: "Counts",
        data: [counts.users, counts.recipes, counts.saved, counts.submitted],
        backgroundColor: ["#f87171", "#34d399", "#60a5fa", "#fbbf24"],
      },
    ],
  });

  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">📊 Site Analytics</h2>
        <p>Loading charts…</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">📊 Site Analytics</h2>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded shadow">
          <Bar data={makeChartData()} />
        </div>
        <div className="bg-white p-6 rounded shadow">
          <Doughnut data={makeChartData()} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
