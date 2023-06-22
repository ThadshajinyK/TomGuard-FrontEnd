import CoverImg from "../images/login-image.jpg";
import ForgotPassImg from "../images/forgot-pass.jpg";
import "../Styles/AuthLayoutStyles.css";
import { useLocation } from "react-router-dom";

const AuthLayout = (props) => {
  const { pathname } = useLocation();
  return (
    <div style={{ height: "100vh", backgroundColor: "#122944" }}>
      <div className=" d-flex w-100 h-100 ">
        <div className="col-5 d-none d-lg-block m-auto p-4">
          <img
            className="cover-img"
            src={pathname === "/forgot-password" ? ForgotPassImg : CoverImg}
          />
        </div>
        <div
          className="col-12 col-lg-7 m-auto w-100 p-4 "
          style={{ maxWidth: "470px" }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
