import React, { useEffect, useState } from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import ReactAudioPlayer from 'react-audio-player';
import { post, del, get, put } from "../../helpers/api_helper";
import * as url from "../../helpers/url_helper";
import ReactPlayer from 'react-player';
import Map from "../../pages/Maps/StaticMap";

import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap"
import { Link } from 'react-router-dom';


function AppealDetail() {
    //Get Appeal Id
    const location = window.location.href.split("/");
    const id = location[location.length - 1];
    const [appeal, setAppeal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //Get Appeal
    function getappeal() {
        get(url.GET_APPEAL_BY_ID + id)
            .then(response => {
                setAppeal(response)
                setLoading(false)
            })
            .catch(error => {
                setError(error)
                setLoading(false)
            })
    }


    useEffect(() => {
        setLoading(true)
        getappeal()
    }, [])


    let center = {
        lat: parseFloat(appeal?.lat),
        lng: parseFloat(appeal?.long)
    }



    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="Appeal" breadcrumbItem="Appeal Detail" />
                <Row>

                    <Col lg={12}>
                        <Link to="/appeal" className="btn btn-primary btn-sm">
                            Go Back
                        </Link>
                        <Card>
                            <CardBody>
                                <CardTitle className="mb-4">Appeal Video</CardTitle>
                                {appeal?.videoUrl ? <ReactPlayer url={"http://emeergencyapp.us-east-1.elasticbeanstalk.com/" + appeal?.videoUrl} controls={true} width="40%" height="50%" /> : <p>No Video</p>}
                                {appeal?.audioUrl ? <ReactAudioPlayer src={"http://emeergencyapp.us-east-1.elasticbeanstalk.com/" + appeal?.audioUrl} controls /> : <p>No Audio</p>}
                            </CardBody>
                            <CardBody>
                                <CardTitle className="mb-4">Appeal Audio</CardTitle>
                                
                            </CardBody>
                            <CardBody>
                                <CardTitle className="mb-4">Appeal Text</CardTitle>
                                {appeal?.Note ? <img src={"http://emeergencyapp.us-east-1.elasticbeanstalk.com/" + appeal?.note} alt="image" /> : <p>No Note</p>}
                            </CardBody>
                            <CardBody>
                                <CardTitle className="mb-4">Appeal Image</CardTitle>
                                {appeal?.image ? <img src={"http://emeergencyapp.us-east-1.elasticbeanstalk.com/" + appeal?.image} alt="image" /> : <p>No Image</p>}
                            </CardBody>
                            {/* {
                                center?.lat == NaN || center.long == NaN ? <div></div> : <Map center={center} />
                            } */}
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )
}

export default AppealDetail