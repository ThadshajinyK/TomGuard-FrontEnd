import AuthLayout from "../../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../images/logo.png";

const Login = () => {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="d-flex flex-column align-items-center mb-3">
          <img className="logo" src={Icon} />
          <p className="text-white text-center mb-3">Welcome to eleos !</p>
          <p className="text-white text-center fs-4 text fw-bold mb-2">
            Log in
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
        <div class="mb-3">
          <label>Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Enter your password"
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

        <button class="btn btn-secondary w-100">Login</button>
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
