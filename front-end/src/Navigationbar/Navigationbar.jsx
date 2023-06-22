import React from "react";
import "./NavBarStyles.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export const Navigationbar = () => {
  return (
    <div>
      <ul className="sidebar-lists">
        <li>
          <Link to="/dashboard" className="sidebar-item">
            <Icon icon="material-symbols:dashboard-customize-outline-rounded" />
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <a href="/Servers" className="sidebar-item ">
            <Icon icon="ion:server-outline" />
            <span>Server</span>
          </a>
        </li>
        <li>
          <a href="/Apps" className="sidebar-item">
            <Icon icon="ion:apps-sharp" />
            <span>Apps</span>
          </a>
        </li>

        <li>
          <Link to="/alertNavbar" className="sidebar-item">
            <Icon icon="ri:notification-4-line" />
            <span className="side"></span>
            <span>Alerts</span>
          </Link>
        </li>
        <li>
          <Link to="/graphview" className="sidebar-item">
            <Icon icon="ri:bar-chart-2-line" />
            <span className="side"></span>
            <span>Graph view</span>
          </Link>
        </li>

        <li>
          <a href="#" className="sidebar-item">
            <Icon icon="material-symbols:settings-applications-outline" />
            <span>Setings</span>
          </a>
        </li>
      </ul>
    </div>
  );
};
