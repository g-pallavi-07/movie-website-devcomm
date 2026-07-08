
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./MovieCard.css";
import { getCurrentUser } from "../utils/auth";
import {
  isInWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "../utils/watchlist";


const FALLBACK_POSTER =
  "https://via.placeholder.com/300x445/1e1e1e/a3a3a3?text=No+Poster";

function MovieCard({ movie }) {
  const user = getCurrentUser();
  const [saved, setSaved] = useState(false);


  useEffect(() => {
    if (user) {
      setSaved(isInWatchlist(user.username, movie.imdbID));
    }
  }, [user, movie.imdbID]);

  function handleFavoriteClick(e) {
    e.preventDefault(); 
    e.stopPropagation();

    if (!user) {
      alert("Please log in to add movies to your watchlist.");
      return;
    }

    if (saved) {
      removeFromWatchlist(user.username, movie.imdbID);
      setSaved(false);
    } else {
      addToWatchlist(user.username, {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Poster: movie.Poster,
        Year: movie.Year,
      });
      setSaved(true);
    }
  }

  const posterSrc =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER;

  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      <div className="poster-wrapper">
        <img src={posterSrc} alt={movie.Title} loading="lazy" />

        
        {movie.imdbRating && movie.imdbRating !== "N/A" && (
          <span className="rating-badge">★ {movie.imdbRating}</span>
        )}

        <button
          className={`favorite-icon ${saved ? "active" : ""}`}
          onClick={handleFavoriteClick}
          aria-label="Toggle watchlist"
          title={saved ? "Remove from watchlist" : "Add to watchlist"}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <div className="movie-card-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
