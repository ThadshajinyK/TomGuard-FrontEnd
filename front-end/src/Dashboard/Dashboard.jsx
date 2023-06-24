
import Gutters from './gutter';
import BasicTable from "./Table";
import { Linechart } from './Chart/Linechart';
import CircularProgressBar from './Chart/Chart';
import '../Styles/dashboardStyles.css'

import Graphview from '../Pages/Graphview';


function Dashboard() {
  return (
    <div className='Content'>
      <section className="content">
        <Gutters />
        <div class="row justify-content-center">
          <div className="col-md-10 linechart">
            <Linechart />
            <div className="accordion mb-4 viewMore" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    View more in detail
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <Graphview />
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="col-md-2"></div>
          {/* <div class="col-md-2">
            <CircularProgressBar />
          </div> */}
        </div>

        {/* <BasicTable /> */}
      </section >
    </div >
  );
}

export default Dashboard;
