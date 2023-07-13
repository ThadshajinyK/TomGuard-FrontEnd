import ProfileImg from "../../../../images/profile.png";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import axios from "../../../../axios";
import Avatar from "../../../../images/girl.png";
import TextField from "../../../../layout/core/TextField";
import { useFormik } from "formik";
import { object, string } from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const validationSchema = object().shape({
  first_name: string().required("required !"),
  last_name: string().required("required !"),
  phone: string()
    .min(11, "Invalid phone number")
    .max(11, "Invalid phone number"),
});

const General = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [imageSrc, setImageSrc] = useState(ProfileImg);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    job_title: "",
    location: "",
    image: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setCurrentUser(user);
    setInitialValues({ ...user?.data });
    setSelectedImage(user?.data?.image);
  }, []);

  const handleToggleEditButtonClicked = () => {
    setIsEdit((prevState) => !prevState);
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  // Update api call functionality

  const handleFormSubmit = (values) => {
    axios
      .put(`/user/${values.id}`, {
        ...values,
        image: selectedImage,
      })
      .then((res) => {
        setInitialValues(res?.data);
        setIsEdit(false);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ ...currentUser, data: res?.data })
        );
        window.location.reload();
      })
      .catch((err) => {});
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    resetForm,

    setFieldValue,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleFormSubmit,
    enableReinitialize: true,
  });

  return (
    <div className="sub-container">
      <Form className="form" onSubmit={handleSubmit}>
        <Card style={{ width: "100%", padding: "30px" }}>
          <div className="w-100 d-flex justify-content-between  align-items-center">
            <div>
              <Image
                src={selectedImage || Avatar}
                className="rounded-circle"
                style={{borderRadius: "50%", width: "70px", height: "70px" }}
              />
              <label
                style={{
                  cursor: "pointer",
                  marginLeft: "10px",
                  color: "black",
                  fontWeight: 500,
                }}
              >
                Upload
                <input
                  disabled={!isEdit}
                  hidden
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*"
                />
              </label>
            </div>

            {!isEdit && (
              <Button variant="primary" onClick={handleToggleEditButtonClicked}>
                Edit
              </Button>
            )}
          </div>

          <div className="d-flex flex-md-row flex-column w-100 gap-md-5 gap-1 mt-3">
            <div className="d-flex flex-column w-100 gap-2">
              <div>
                <p className="field-label">First name</p>
                <TextField
                  nobg
                  className="form-control"
                  disabled={!isEdit}
                  type="text"
                  value={values.first_name}
                  name="first_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.first_name && errors.first_name}
                />
              </div>

              <div>
                <p className="field-label">Last name</p>
                <TextField
                  nobg
                  className="form-control"
                  disabled={!isEdit}
                  type="text"
                  value={values.last_name}
                  name="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.last_name && errors.last_name}
                />
              </div>

              <div>
                <p className="field-label">Email address</p>
                <TextField
                  nobg
                  className="form-control"
                  disabled={true}
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>
            </div>
            <div className="d-flex flex-column w-100 gap-2">
              <div>
                <p className="field-label">Job title</p>
                {/* <TextField
                  nobg
                  className="form-control"
                  disabled={!isEdit}
                  type="text"
                  value={values.job_title ?? "N/A"}
                  name="job_title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                /> */}
                <div style={{ height: "65px" }}>
                  <select
                    class="form-select"
                    disabled={!isEdit}
                    value={values.job_title }
                    name="job_title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option selected> select </option>
                    <option value="Hr">Hr</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <p className="field-label">Address</p>
                <TextField
                  nobg
                  className="form-control"
                  disabled={!isEdit}
                  type="text"
                  value={values.location }
                  name="location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>

              <div>
                <p className="field-label">Phone number</p>
                <PhoneInput
                  // className="form-control"

                  disabled={!isEdit}
                  type="number"
                  value={values.phone }
                  country="lk"
                  name="phone"
                  onChange={(phone) => {
                    setFieldValue("phone", phone);
                  }}
                  onBlur={handleBlur}
                />
                <p style={{ marginTop: "5px", color: "red", fontSize: "13px" }}>
                  {touched.phone && errors.phone}
                </p>
              </div>
            </div>
          </div>
          {isEdit && (
            <div className="d-flex flex-md-row flex-column w-100 gap-md-5 gap-1 mt-3">
              <Button
                variant="outline-danger"
                className="w-100"
                onClick={() => {
                  resetForm();
                  setIsEdit(false);
                }}
              >
                Cancel
              </Button>
              <Button className="w-100" type="submit">
                {!errors && isSubmitting ? "Updating..." : "Save"}
              </Button>
            </div>
          )}
        </Card>
      </Form>
    </div>
  );
};

export default General;
