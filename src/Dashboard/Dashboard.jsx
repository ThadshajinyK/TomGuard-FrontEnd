import Gutters from "./gutter";
import BasicTable from "./Table";
import { Linechart } from "./Chart/Linechart";
import CircularProgressBar from "./Chart/Chart";
import "../Styles/dashboardStyles.css";

function Dashboard() {
  

  return (
    <div className="Content">
      <section className="content">
        <Gutters />
        <div class="row justify-content-center">
          <div class="col-md-8">
            <Linechart />
          </div>
          <div className="col-md-2"></div>
          <div class="col-md-2">
            <CircularProgressBar />
          </div>
        </div>

        <BasicTable />
      </section>
    </div>
  );
}

export default Dashboard;
