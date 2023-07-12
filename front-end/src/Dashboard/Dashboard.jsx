import Gutters from './gutter';
import { Linechart } from './Chart/Linechart';
import '../Styles/dashboardStyles.css';
import React, { useEffect, useState } from 'react';
import Graphview from '../Pages/Graphview';
import CircularProgressBar from './Chart/CircularProgressBar';

function Dashboard() {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('your-backend-api-url');
        const data = await response.json();
        setPercentage(data.percentage); // Assuming the API response contains a 'percentage' field
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Content">
      <section className="content">
        <Gutters />
        <div className="row justify-content-center">
          <div className="col-md-10 linechart">
            <Linechart />
            <div className="accordion mb-4 viewMore" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    View more in detail
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <Graphview />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
          {/* <div className="col-md-2">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ marginRight: 20 }}>
                <CircularProgressBar percentage={75} Text="CPU usage"/>
              </div>
              <div>
                <CircularProgressBar percentage={45} Text="Memory usage"/>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
