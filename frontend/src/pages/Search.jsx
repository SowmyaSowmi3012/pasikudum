import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import Card from "../components/Card";

const BASE_URL = "https://pasikudum-backend.onrender.com";

const Search = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set query from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get("query");
    if (queryParam) {
      setQuery(queryParam);
    }
  }, []);

  // Fetch items based on query
  useEffect(() => {
    if (!query.trim()) return;

    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/items`, {
          params: { q: query },
        });
        setResult(response.data);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [query]);

  // Update state + URL when input changes
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    const url = new URL(window.location);
    url.searchParams.set("query", value);
    window.history.pushState({}, "", url);
  };

  return (
    <div className="px-6 lg:px-12 py-20">
      <h1 className="text-center text-3xl py-10 font-semibold text-secondary sm:text-6xl sm:leading-relaxed">
        Search
      </h1>

      <div className="bg-white md:max-w-3xl mx-auto p-4 rounded relative flex items-center">
        <IoSearch className="w-5 h-5 mr-2 text-neutral-300" />
        <input
          type="search"
          placeholder="Search for recipe"
          name="query"
          value={query}
          onChange={handleSearch}
          className="outline-none w-full placeholder:text-[#1b2629]"
          required
        />
      </div>

      {loading && <p className="text-center mt-10">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-10">{error}</p>}

      <ul className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {result.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </ul>
    </div>
  );
};

export default Search;
