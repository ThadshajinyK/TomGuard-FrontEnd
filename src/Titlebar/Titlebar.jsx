import React from "react";
import Logo from "../images/logo.png";
import Girl from "../images/female.png";
import "../Styles/TitlePageStyles.css";
import { Navbar, Nav, Form, FormControl, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// export const Titlebar = () => {
//   return (
//     <div className="container-fluid navbar fixed-top">
//       <ul class="menu">
//         <li class="nav-brand">
//           <img src={Logo} class="logo" alt="logo" />
//           <span class="nav-item">Eleos Web (pvt) Ltd</span>
//         </li>
//         <li>
//           <div class="nav-right">
//             <div className="searchbar">
//               <input
//                 type="text"
//                 placeholder="Search.."
//                 className="m-2 searchbox"
//               ></input>
//               <button className="btn-aqua m-2">Search</button>
//             </div>

//             {/* <div class="avatar"> */}
//               <img src={Girl} alt="avatar" class="avatar-img" />
//             {/* </div> */}

//             <div class="user-info justify-content-end">
//               <span class="name">Eleos</span>
//               <span class="username">https://eleos.lk/</span>
//             </div>
//           </div>
//         </li>
//       </ul>
//     </div>
//   );
// }

export const Titlebar2 = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  return (
    <div className="fixed-top navbar titlebar">
      <ul className="container-fluid">
        <li className="navbar-brand">
          <img src={Logo} className="logo" alt="logo" />
          {/* <span className="logoname">Eleos Web (pvt) Ltd</span> */}
        </li>

        <div class="d-flex">
          {/* <div class="avatar"> */}
          <img
            src={user?.data?.image || Girl}
            alt="avatar"
            class="avatar-img"
          />
          {/* </div> */}

          <div class="mt-2">
            <span class="name">{`${user?.data?.first_name} ${user?.data?.last_name}`}</span>
          </div>

          <button
            className="btn btn-outline-danger btn-sm logout-btn "
            style={{ minWidth: "100px" }}
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </ul>
    </div>
  );
};
