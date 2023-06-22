import AuthLayout from "../../layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import Icon from "../../images/logo.png";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("api/auth/register", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      })
      .then((response) => {
        setLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
        setLoading(false);
      });
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column align-items-center mb-3">
          <img className="logo" src={Icon} />
          <p className="text-white text-center">Welcome to eleos !</p>
          <p className="text-white text-center fs-4 text fw-bold mb-2">
            Sign up
          </p>
        </div>
        <div class="mb-3">
          <label>First name</label>
          <input
            value={firstName}
            type="first name"
            class="form-control"
            placeholder="Enter your first name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div class="mb-3">
          <label>Last name</label>
          <input
            value={lastName}
            type="last name"
            class="form-control"
            placeholder="Enter your last name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div class="mb-3">
          <label>Email</label>
          <input
            value={email}
            type="email"
            class="form-control"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div class="mb-3">
          <label>Password</label>
          <input
            value={password}
            type="password"
            class="form-control"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <p className="text-white ">
            Already have an account ?{" "}
            <span
              className="text-primary fst-italic "
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>

        {/* Error massage component */}
        <p className="text-danger text-center">{error}</p>
        <button class="btn btn-secondary w-100" type="submit">
          {loading ? "Loading..." : "Sign up"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
