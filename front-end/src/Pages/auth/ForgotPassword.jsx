import AuthLayout from "../../layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import Icon from "../../images/logo.png";
import axios from "../../axios";
import { useState } from "react";
import "../../Styles/AuthLayoutStyles.css";
import { useFormik } from "formik";
import { object, string } from "yup";
import TextField from "../../layout/core/TextField";

const validationSchema = object().shape({
  email: string().required("required !").email("Invalid email !"),
});

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const handleFormSubmit = (values) => {
    axios
      .post("/auth/forgot-password", values)
      .then((res) => {
        setSuccess(res?.data);
        console.log("res =>", res);
      })
      .catch((err) => {
        setError(err?.response?.data);
        setTimeout(() => setError(""), 5000);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex flex-column align-items-center mb-3">
          <img className="logo" src={Icon} />
          <p className="text-white text-center fs-4 text fw-bold">
            Forgot password?
          </p>
          <p className="text-white text-center text-white-50 mt-3 ">
            Enter your registered email below to receive password reset code
          </p>
        </div>
        <div>
          <label className="label">Email</label>
          <TextField
            value={formik.values.email}
            name="email"
            class="form-control"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />
        </div>
        <p className="text-danger text-center">{error}</p>
        <p className="text-success text-center">{success}</p>
        <button class="btn btn-secondary w-100 mt-4" type="submit">
          {formik.isSubmitting ? "Link sending..." : "Send Link"}
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
