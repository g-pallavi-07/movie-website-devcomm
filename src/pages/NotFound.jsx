
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>This page took a wrong turn at the box office.</p>
      <Link to="/" className="btn">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
