// Home page - hero section + Trending row + Popular row
import { useState, useEffect } from "react";
import "./Home.css";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import { getMoviesByTitles, TRENDING_TITLES, POPULAR_TITLES } from "../utils/api";

function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      setLoading(true);

      
      const [trendingResults, popularResults] = await Promise.all([
        getMoviesByTitles(TRENDING_TITLES),
        getMoviesByTitles(POPULAR_TITLES),
      ]);

      setTrending(trendingResults);
      setPopular(popularResults);
      setLoading(false);
    }

    loadMovies();
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-content">
          <h1>
            Search here for movies
          </h1>
          <p>
            Search thousands of movie titles, ratings, and
            cast.
          </p>
          <div className="hero-search">
            <SearchBar placeholder="Try 'Inception' or 'Interstellar'..." />
          </div>
        </div>
      </section>

      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <>
            
            <section className="movie-section">
              <h2 className="section-title">
                Trending movies
              </h2>
              <p className="section-subtitle">
                Check out the movies which are trending now
              </p>
              <div className="movie-grid">
                {trending.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </div>
            </section>

            
            <section className="movie-section">
              <h2 className="section-title">
                Popular Movies
              </h2>
              <p className="section-subtitle">Most searched movies</p>
              <div className="movie-grid">
                {popular.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
