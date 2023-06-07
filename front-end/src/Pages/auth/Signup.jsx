import AuthLayout from "../../layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import Icon from "../../images/logo.png";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <form onSubmit={(e) => e.preventDefault()}>
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
            type="first name"
            class="form-control"
            placeholder="Enter your first name"
          />
        </div>
        <div class="mb-3">
          <label>Last name</label>
          <input
            type="last name"
            class="form-control"
            placeholder="Enter your last name"
          />
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

        <button class="btn btn-secondary w-100">Sign up</button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
