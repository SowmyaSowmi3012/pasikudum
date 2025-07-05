// src/pages/admin/AnalyticsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const AnalyticsPage = () => {
  /* ───────────────────────────── state ───────────────────────────── */
  const [counts, setCounts] = useState({
    users: 0,
    recipes: 0,
    saved: 0,
    submitted: 0,
  });
  const [loading, setLoading] = useState(true);

  /* ─────────────────────── fetch all four counts ─────────────────── */
  useEffect(() => {
  const fetchCounts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/analytics");
      setCounts({
        users: data.users,
        recipes: data.recipes,
        saved: data.saved,
        submitted: data.submitted,
      });
    } catch (err) {
      console.error("🔴 Analytics fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchCounts();
}, []);
  /* ─────────────────────── chart config helper ───────────────────── */
  const makeChartData = () => ({
    labels: ["Users", "Recipes", "Saved", "Submitted"],
    datasets: [
      {
        label: "Counts",
        data: [
          counts.users,
          counts.recipes,
          counts.saved,
          counts.submitted,
        ],
        backgroundColor: ["#f87171", "#34d399", "#60a5fa", "#fbbf24"],
      },
    ],
  });

  /* ───────────────────────────── render ──────────────────────────── */
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
        {/* Bar chart */}
        <div className="bg-white p-6 rounded shadow">
          <Bar data={makeChartData()} />
        </div>

        {/* Doughnut chart */}
        <div className="bg-white p-6 rounded shadow">
          <Doughnut data={makeChartData()} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
