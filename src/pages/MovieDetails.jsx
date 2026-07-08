
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./MovieDetails.css";
import Loader from "../components/Loader";
import { getMovieById } from "../utils/api";
import { getCurrentUser } from "../utils/auth";
import {
  isInWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "../utils/watchlist";

const FALLBACK_POSTER =
  "https://via.placeholder.com/400x590/1e1e1e/a3a3a3?text=No+Poster";

function MovieDetails() {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const user = getCurrentUser();


  useEffect(() => {
    async function loadMovie() {
      setLoading(true);
      const data = await getMovieById(id);
      setMovie(data);
      setLoading(false);

      if (user && data) {
        setSaved(isInWatchlist(user.username, data.imdbID));
      }
    }

    loadMovie();
    
    window.scrollTo(0, 0);
    
  }, [id]);

  function handleWatchlistClick() {
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

  if (loading) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }


  if (!movie) {
    return (
      <div className="container details-not-found">
        <p>Movie not found.</p>
        <Link to="/" className="btn">
          Back to Home
        </Link>
      </div>
    );
  }

  const posterSrc =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER;

  return (
    <div className="container details-page">
      <div className="details-grid">
        <div className="details-poster">
          <img src={posterSrc} alt={movie.Title} />
        </div>

        <div className="details-info">
          <h1>{movie.Title}</h1>

          <div className="details-meta">
            <span>{movie.Year}</span>
            <span>•</span>
            <span>{movie.Runtime}</span>
            <span>•</span>
            <span>{movie.Rated}</span>
          </div>

          {movie.imdbRating && movie.imdbRating !== "N/A" && (
            <div className="details-rating">
              ★ {movie.imdbRating} <span>/ 10 IMDb</span>
            </div>
          )}

          <div className="details-genres">
            {movie.Genre &&
              movie.Genre.split(",").map((genre) => (
                <span key={genre} className="genre-pill">
                  {genre.trim()}
                </span>
              ))}
          </div>

          <p className="details-plot">{movie.Plot}</p>

          <div className="details-facts">
            <p>
              <strong>Release Date:</strong> {movie.Released}
            </p>
            <p>
              <strong>Director:</strong> {movie.Director}
            </p>
            <p>
              <strong>Cast:</strong> {movie.Actors}
            </p>
            <p>
              <strong>Writer:</strong> {movie.Writer}
            </p>
          </div>

          <button
            className={`btn watchlist-btn ${saved ? "in-watchlist" : ""}`}
            onClick={handleWatchlistClick}
          >
            {saved ? "✓ In Your Watchlist" : "+ Add to Watchlist"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
