import AuthLayout from "../../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Icon from "../../images/logo.png";
import axios from "axios";
import "../../Styles/AuthLayoutStyles.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth/login", { email, password })
      .then((response) => {
        localStorage.setItem("loggedInUser", JSON.stringify(response.data));
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setError(err?.response?.data);

        setLoading(false);
      });
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column align-items-center mb-3">
          <img className="logo" src={Icon} />
          <p className="text-white text-center mb-3">Welcome to eleos !</p>
          <p className="text-white text-center fs-4 text fw-bold mb-2">
            Log in
          </p>
        </div>
        <div className="mb-3">
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="form-control"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-control"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-3">
          <Link
            to="/forgot-password"
            style={{
              marginLeft: "auto",
              color: "#fff",
              fontStyle: "italic",
              cursor: "pointer",
            }}
          >
            Forgot password ?
          </Link>
        </div>

        {/* Error massage component */}

        <p className="text-danger text-center">{error}</p>

        {/* Login button */}

        <button className="btn btn-secondary w-100">
          {loading ? "loading..." : "Login"}
        </button>
        <div className="mt-3">
          <p className="text-white ">
            Don't you have an account ?{" "}
            <span
              className="text-primary fst-italic "
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/sign-up")}
            >
              Sign up
            </span>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
