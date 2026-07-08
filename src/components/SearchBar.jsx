
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar({ placeholder }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault(); 

    if (query.trim() === "") return;

    
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search for a movie..."}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
