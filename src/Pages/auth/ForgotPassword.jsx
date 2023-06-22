import AuthLayout from "../../layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import Icon from "../../images/logo.png";
import axios from "axios";
import { useState } from "react";
import "../../Styles/AuthLayoutStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post(`api/auth/forgot-password/${email}`)
      .then((res) => {
        setLoading(false);
        setEmail("");
        setError("");
        setSuccess(res?.data);
        console.log("res =>", res);
      })
      .catch((err) => {
        setLoading(false);
        setError(err?.response?.data);
        setTimeout(() => setError(""), 5000);
      });
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column align-items-center mb-3">
          <img className="logo" src={Icon} />
          <p className="text-white text-center fs-4 text fw-bold">
            Forgot password?
          </p>
          <p className="text-white text-center text-white-50 mt-3 ">
            Enter your registered email below to receive password reset code
          </p>
        </div>
        <div class="mb-3">
          <label className="label">Email</label>
          <input
            value={email}
            type="email"
            class="form-control"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <p className="text-danger text-center">{error}</p>
        <p className="text-success text-center">{success}</p>
        <button class="btn btn-secondary w-100 mt-4" type="submit">
          {loading ? "Link sending..." : "Send Link"}
        </button>
        <button
          class="btn btn-outline-secondary w-100 mt-3"
          onClick={() => navigate("/login")}
        >
          Back to login
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
