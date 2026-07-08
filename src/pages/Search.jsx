
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Search.css";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import { searchMovies } from "../utils/api";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    async function runSearch() {
      if (query.trim() === "") {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const movies = await searchMovies(query);
      setResults(movies);
      setLoading(false);
    }

    runSearch();
  }, [query]);

  return (
    <div className="container search-page">
      <h2 className="section-title">Search results for "{query}"</h2>

      {loading ? (
        <Loader />
      ) : results.length === 0 ? (
        <div className="no-results">
          <p>No Results Found</p>
          <span>Try searching for a different title.</span>
        </div>
      ) : (
        <div className="movie-grid">
          {results.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
