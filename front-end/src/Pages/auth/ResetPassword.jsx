import AuthLayout from "../../layout/AuthLayout";
import { useNavigate, useSearchParams } from "react-router-dom";
import Icon from "../../images/logo.png";
import axios from "../../axios";
import { useState } from "react";
import "../../Styles/AuthLayoutStyles.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isMatch, setIsMatch] = useState(true);

  const navigate = useNavigate();

  const [searchParam] = useSearchParams();

  const token = searchParam.get("token");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== retypePassword) {
      setIsMatch(false);

      return;
    }
    setLoading(true);
    axios
      .post("/auth/reset-password", { token, new_password: newPassword })
      .then((res) => {
        setNewPassword("");
        setRetypePassword("");
        setLoading(false);
        setSuccess(res?.data);
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((err) => {
        setLoading(false);
        setError(err?.response?.data);
      });
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column align-items-center mb-3">
          <img className="logo" src={Icon} />
          <p className="text-white text-center fs-4 text fw-bold">
            Create New Password
          </p>
          <p className="text-white text-center text-white-50 mt-3 ">
            To Create your new password, Please fill in the fields below
          </p>
        </div>
        <div class="mb-3">
          <label className="label">New password</label>
          <input
            value={newPassword}
            type="password"
            class="form-control"
            placeholder="Enter your new password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div class="mb-3">
          <label className="label">Retype Password</label>
          <input
            value={retypePassword}
            type="password"
            class="form-control"
            placeholder="Retype Password"
            onChange={(e) => {
              setRetypePassword(e.target.value);
            }}
            required
          />
          {!isMatch && <p className="text-danger ">Password not match !</p>}
        </div>
        <p className="text-danger text-center">{error}</p>
        <p className="text-success text-center">{success}</p>
        <button class="btn btn-secondary w-100 mt-4" type="submit">
          {loading ? "Resetting..." : "Reset password"}
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

export default ResetPassword;
