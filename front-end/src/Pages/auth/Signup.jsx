import AuthLayout from "../../layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import Icon from "../../images/logo.png";
import { useState } from "react";
import axios from "../../axios";
import { useFormik } from "formik";
import "../../Styles/AuthLayoutStyles.css";
import { object, string } from "yup";
import TextField from "../../layout/core/TextField";

const validationSchema = object().shape({
  first_name: string().required("required !").min(3, "At least 3 characters"),
  last_name: string().required("required !").min(3, "At least 3 characters"),
  email: string().required("required !").email("Invalid email !"),
  password: string()
    .required("required !")
    .min(6, "Password must have at least 6 character"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleFormSubmit = (values) => {
    axios
      .post("/auth/register", values)
      .then((response) => {
        navigate("/login");
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
      first_name: "",
      last_name: "",
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
          <p className="text-white text-center">Welcome to eleos !</p>
          <p className="text-white text-center fs-4 text fw-bold mb-2">
            Sign up
          </p>
        </div>
        <div>
          <label className="label">First name</label>
          <TextField
            value={values.first_name}
            name="first_name"
            class="form-control"
            placeholder="Enter your first name"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.first_name && errors.first_name}
          />
        </div>
        <div>
          <label className="label">Last name</label>
          <TextField
            value={values.last_name}
            name="last_name"
            class="form-control"
            placeholder="Enter your last name"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.last_name && errors.last_name}
          />
        </div>
        <div>
          <label className="label">Email</label>
          <TextField
            value={values.email}
            name="email"
            class="form-control"
            placeholder="Enter your email"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
          />
        </div>
        <div>
          <label className="label">Password</label>
          <TextField
            value={values.password}
            name="password"
            type="password"
            class="form-control"
            placeholder="Enter your password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
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
          {isSubmitting ? "Loading..." : "Sign up"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
