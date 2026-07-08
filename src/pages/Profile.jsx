import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Profile.css";
import { getCurrentUser } from "../utils/auth";
import { getWatchlist, removeFromWatchlist } from "../utils/watchlist";

const FALLBACK_POSTER =
  "https://via.placeholder.com/300x445/1e1e1e/a3a3a3?text=No+Poster";

function Profile() {
  const user = getCurrentUser();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      setWatchlist(getWatchlist(user.username));
    }
  }, [user]);

  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  function handleRemove(imdbID) {
    removeFromWatchlist(user.username, imdbID);
    
    setWatchlist(watchlist.filter((movie) => movie.imdbID !== imdbID));
  }

  return (
    <div className="container profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1>{user.username}</h1>
          <p>{user.email}</p>
        </div>
      </div>

      <section className="watchlist-section">
        <h2 className="section-title">
          Watchlist
        </h2>

        {watchlist.length === 0 ? (
          <div className="empty-watchlist">
            <p>Your watchlist is empty.</p>
            <Link to="/" className="btn">
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="movie-grid">
            {watchlist.map((movie) => {
              const posterSrc =
                movie.Poster && movie.Poster !== "N/A"
                  ? movie.Poster
                  : FALLBACK_POSTER;

              return (
                <div key={movie.imdbID} className="watchlist-card">
                  <Link to={`/movie/${movie.imdbID}`}>
                    <img src={posterSrc} alt={movie.Title} />
                  </Link>
                  <div className="watchlist-card-info">
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                    <button
                      className="btn-outline remove-btn"
                      onClick={() => handleRemove(movie.imdbID)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Profile;
