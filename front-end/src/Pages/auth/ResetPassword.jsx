import AuthLayout from "../../layout/AuthLayout";
import { useNavigate, useSearchParams } from "react-router-dom";
import Icon from "../../images/logo.png";
import axios from "../../axios";
import { useState } from "react";
import "../../Styles/AuthLayoutStyles.css";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import TextField from "../../layout/core/TextField";

const validationSchema = object().shape({
  new_password: string()
    .required("required !")
    .min(6, "Password must have at least 6 character"),
  re_password: string()
    .required("required !")
    .oneOf([ref("new_password"), null], "Password should match !"),
});

const ResetPassword = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isMatch, setIsMatch] = useState(true);
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const token = searchParam.get("token");

  const handleFormSubmit = (values) => {
    axios
      .post("/auth/reset-password", { ...values, token })
      .then((res) => {
        setSuccess(res?.data);
        setTimeout(() => navigate("/login"), 2000);
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
      new_password: "",
      re_password: "",
    },
    validationSchema,
    onSubmit: handleFormSubmit,
  });

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
        <div>
          <label className="label">New password</label>
          <TextField
            value={values.new_password}
            name="new_password"
            type="password"
            class="form-control"
            placeholder="Enter your new password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.new_password && errors.new_password}
          />
        </div>
        <div>
          <label className="label">Retype Password</label>
          <TextField
            value={values.re_password}
            name="re_password"
            type="password"
            class="form-control"
            placeholder="Retype Password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.re_password && errors.re_password}
          />
        </div>
        <p className="text-danger text-center">{error}</p>
        <p className="text-success text-center">{success}</p>
        <button class="btn btn-secondary w-100 mt-4" type="submit">
          {! error && isSubmitting ? "Resetting..." : "Reset password"}
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
