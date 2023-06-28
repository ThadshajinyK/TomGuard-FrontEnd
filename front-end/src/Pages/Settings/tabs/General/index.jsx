import ProfileImg from "../../../../images/profile.png";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import axios from "../../../../axios";
import Avatar from "../../../../images/girl.png";

const General = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [imageSrc, setImageSrc] = useState(ProfileImg);
  const [selectedImage, setSelectedImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const [fieldValues, setFieldValues] = useState({
    id: 1,
    first_name: "",
    last_name: "",
    email: "",
    job_title: "",
    phone: "",
    location: "",
  });

  let token;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    token = user?.token;
    setCurrentUser(user);
    setSelectedImage(user?.data?.image);
    setFieldValues({
      id: user?.data?.id,
      first_name: user?.data?.first_name,
      last_name: user?.data?.last_name,
      location: user?.data?.location,
      phone: user?.data?.phone,
      email: user?.data?.email,
      job_title: user?.data?.job_title,
    });
  }, []);

  const handleToggleEditButtonClicked = () => {
    setIsEdit((prevState) => !prevState);
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // const fileAsDataUrl = window.URL.createObjectURL(file);
      // setImageSrc(fileAsDataUrl);

      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result.toString());
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFieldValues({
      ...fieldValues,
      [e.target.name]: e.target.value,
    });
  };

  // Update api call functionality

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .put(`/user/${fieldValues.id}`, {
        first_name: fieldValues.first_name,
        last_name: fieldValues.last_name,
        phone: fieldValues.phone,
        location: fieldValues.location,
        job_title: fieldValues.job_title,
        image: selectedImage,
      })
      .then((res) => {
        setFieldValues(res?.data);
        setIsEdit(false);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ ...currentUser, data: res?.data })
        );
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className="sub-container">
      <Form className="form" onSubmit={handleSubmit}>
        <Card style={{ width: "100%", padding: "30px" }}>
          <div className="w-100 d-flex justify-content-between  align-items-center">
            <div>
              <Image
                src={selectedImage || Avatar}
                className="rounded-circle"
                style={{ width: "70px", height: "70px" }}
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
              <Form.Group className="" controlId="exampleForm.ControlInput1">
                <p className="field-label">First name</p>
                <Form.Control
                  disabled={!isEdit}
                  type="text"
                  value={fieldValues.first_name}
                  name="first_name"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="" controlId="exampleForm.ControlInput1">
                <p className="field-label">Last name</p>
                <Form.Control
                  disabled={!isEdit}
                  type="text"
                  value={fieldValues.last_name}
                  name="last_name"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="" controlId="exampleForm.ControlInput1">
                <p className="field-label">Email address</p>
                <Form.Control
                  disabled={true}
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={fieldValues.email}
                />
              </Form.Group>
            </div>
            <div className="d-flex flex-column w-100 gap-2">
              <Form.Group className="" controlId="exampleForm.ControlInput1">
                <p className="field-label">Job title</p>
                <Form.Control
                  disabled={!isEdit}
                  type="text"
                  value={fieldValues.job_title ?? "N/A"}
                  name="job_title"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="" controlId="exampleForm.ControlInput1">
                <p className="field-label">Address</p>
                <Form.Control
                  disabled={!isEdit}
                  type="text"
                  value={fieldValues.location ?? "N/A"}
                  name="location"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="" controlId="exampleForm.ControlInput1">
                <p className="field-label">Phone number</p>
                <Form.Control
                  disabled={!isEdit}
                  type="text"
                  value={fieldValues.phone ?? "N/A"}
                  name="phone"
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>
          {isEdit && (
            <div className="d-flex flex-md-row flex-column w-100 gap-md-5 gap-1 mt-3">
              <Button
                variant="outline-danger"
                className="w-100"
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </Button>
              <Button className="w-100" type="submit">
                {loading ? "Updating..." : "Save"}
              </Button>
            </div>
          )}
        </Card>
      </Form>
    </div>
  );
};

export default General;
