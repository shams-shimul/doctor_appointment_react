import { Link } from "react-router-dom";
import { IoWarning } from "react-icons/io5";

const Error = (err) => {
  return (
    <div className="error-page">
      <div className="main-wrapper">
        <div className="error-box">
          <h1>404</h1>
          <h3 className="h2 mb-3"><IoWarning /> Oops! Page not found!</h3>
          <p className="h4 font-weight-normal">The page you requested was not found.</p>
          <Link to="/" className="btn btn-info btn-lg mt-4">Back to Home</Link>
        </div>
      </div>
    </div>
  )
};

export default Error;