import AuthLayout from "../../layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import Icon from "../../images/logo.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <form onSubmit={(e) => e.preventDefault()}>
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
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            placeholder="Enter your email"
          />
        </div>

        <button class="btn btn-secondary w-100 mt-4">Send Link</button>
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
