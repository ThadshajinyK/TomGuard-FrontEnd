import AuthLayout from "../../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Icon from "../../images/logo.png";
import { useFormik } from "formik";
import axios from "../../axios";
import "../../Styles/AuthLayoutStyles.css";
import TextField from "../../layout/core/TextField";
import { object, string } from "yup";

const validationSchema = object().shape({
  email: string().required("required !").email("Invalid email !"),
  password: string().required("required !"),
});

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleFormSubmit = (values) => {
    axios
      .post("/auth/login", values)
      .then((response) => {
        localStorage.setItem("loggedInUser", JSON.stringify(response.data));

        window.location.reload();
      })
      .catch((err) => {
        setError(err?.response?.data);
      });
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleFormSubmit,
  });

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
        <div>
          <label className="label">Email</label>
          <TextField
            name="email"
            value={values.email}
            // onChange={(event) => setEmail(event.target.value)}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
            placeholder="Enter your email"
            error={touched.email && errors.email}
          />
        </div>
        <div>
          <label className="label">Password</label>
          <TextField
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
            placeholder="Enter your password"
            error={touched.password && errors.password}
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
          {isSubmitting ? "loading..." : "Login"}
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
