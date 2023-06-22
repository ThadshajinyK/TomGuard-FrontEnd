import { Link } from "react-router-dom";
import AlertTable from "../AlertTable/AlertTable";
import "./alertNavbar.css";

const AlertNavbar = ({
  SEARCH_BY,
  SORT_BY,
  searchBy,
  setSearchBy,
  sortBy,
  setSortBy,
  searchInput,
  setSearchInput,
}) => {
  return (
    <div className="flex_containerNav">
      <div className="_content">
        <Link to="/alertTable" style={{ color: "red" }}>
          Alerts
        </Link>
      </div>
      <div className="_content">
        <Link to="/chat" style={{ color: "green" }}>
          Chat
        </Link>
      </div>
      <div style={{ margin: "0 10px", width: "180px" }}>
        <select
          class="form-select "
          aria-label="Default select example"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option hidden selected>
            Sort appName by
          </option>
          <option value={SORT_BY.ASCE}>Ascending</option>
          <option value={SORT_BY.DESCE}>Descending</option>
        </select>
      </div>
      <div style={{ margin: "0 10px", width: "200px" }}>
        <select
          class="form-select "
          aria-label="Default select example"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option hidden selected>
            Search by
          </option>

          <option value={SEARCH_BY.SERVER_ID}>Server id</option>
          <option value={SEARCH_BY.ALERT_TYPE}>Alert type</option>
          <option value={SEARCH_BY.SEVERITY_LEVEL}>Security level</option>
        </select>
      </div>
      <input
        style={{ width: "200px", height: "38px" }}
        class="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
};

export default AlertNavbar;
