
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { logIn, signUp } from "../utils/auth";

function Login() {
  const navigate = useNavigate();

  
  const [isSignUp, setIsSignUp] = useState(false);

  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (isSignUp) {
      if (!formData.username || !formData.email || !formData.password) {
        setError("Please fill in all fields.");
        return;
      }

      const result = signUp(formData.username, formData.email, formData.password);

      if (!result.success) {
        setError(result.message);
        return;
      }
    } else {
      if (!formData.username || !formData.password) {
        setError("Please enter your username and password.");
        return;
      }

      const result = logIn(formData.username, formData.password);

      if (!result.success) {
        setError(result.message);
        return;
      }
    }

    navigate("/profile");
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>{isSignUp ? "Create an Account" : "Welcome Back"}</h1>
        <p className="login-subtitle">
          {isSignUp
            ? "Sign up to start building your watchlist."
            : "Log in to access your watchlist."}
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="e.g. movie_fan99"
          />

          
          {isSignUp && (
            <>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </>
          )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn login-submit-btn">
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="toggle-text">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="toggle-link"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
