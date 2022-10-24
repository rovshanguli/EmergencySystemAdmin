import React from 'react';
import Map from "../../pages/Maps/MapsGoogle2";
import Breadcrumbs from "../../components/Common/Breadcrumb"
import {Row} from "reactstrap"

function Index() {
  return (
    <div>
       <React.Fragment>
        <div className="page-content">
            <Breadcrumbs title="Appeal" breadcrumbItem="Appeal Detail" />
            <Row>
                <Map />
            </Row>
            </div>
        </React.Fragment>
    </div>
  )
}

export default Index