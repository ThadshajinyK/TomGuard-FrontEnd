import React from "react";
import Logo from "../images/logo.png";
import "../Styles/TitlePageStyles.css";
import { useNavigate } from "react-router-dom";

export const Titlebar2 = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    // localStorage.removeItem("loggedInUser");
    localStorage.removeItem("dummyToken");
    window.location.reload();
  };

  return (
    <div className="fixed-top navbar titlebar">
      <ul className="container-fluid">
        <li className="navbar-brand">
          <img src={Logo} className="logo" alt="logo" />
          {/* <span className="logoname">Eleos Web (pvt) Ltd</span> */}
        </li>

        <div className="d-flex">
          <div className="">
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="buton p-1" type="submit">
                Search
              </button>
            </form> */}
          </div>

          {/* <div className="avatar"> */}
          <img src={user?.data?.image} alt="avatar" className="avatar-img" />
          {/* </div> */}

          <div className="mt-2">
            <span className="name">{`${user?.data?.first_name} ${user?.data?.last_name}`}</span>
          </div>

          <button
            className="btn btn-outline-danger btn-sm logout-btn "
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </ul>
    </div>
  );
};
