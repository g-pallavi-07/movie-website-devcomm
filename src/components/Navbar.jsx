
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "./SearchBar";
import { getCurrentUser, logOut } from "../utils/auth";

function Navbar() {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = getCurrentUser();

  function handleLogout() {
    logOut();
    setMenuOpen(false);
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          Discover Movies
        </Link>

        
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

    
        <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
          <div className="navbar-search">
            <SearchBar placeholder="Search movies..." />
          </div>

          <ul className="nav-links">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    Profile
                  </Link>
                </li>
                <li>
                  <button className="nav-logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="nav-login-btn"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
