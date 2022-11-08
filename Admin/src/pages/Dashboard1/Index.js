import React, { useEffect, useState } from 'react';
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row } from "reactstrap"
import { post, del, get, put } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import PieChart from './PieChart';

function Index() {
  const [appeaStatistics, setAppeaStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    get(url.GET_APPEA_STATISTICS)
      .then(res => {
        setGraphData(res);
      })
      .then(()=>setLoading(false))
      .catch(error => {
        setLoading(false);
      })
  }, []);



  
  return (
    <div>
      <React.Fragment>
        <div className="page-content">
          <Breadcrumbs title="Appeal" breadcrumbItem="Appeal Detail" />
          <Row>
            {
              loading ?
                <div className="col-12">
                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
                :
                <div className="col-12">
                  <PieChart labels={graphData?.map((x) => x.name)} series={graphData?.map((x) => x.value)} />
                </div>

            }
          </Row>
        </div>
      </React.Fragment>
    </div>
  )
}

export default Index