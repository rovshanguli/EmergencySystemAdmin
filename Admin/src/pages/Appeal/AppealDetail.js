import React, {useEffect, useState} from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import ReactAudioPlayer from 'react-audio-player';
import { post, del, get, put } from "../../helpers/api_helper";
import * as url from "../../helpers/url_helper";
import ReactPlayer from 'react-player'

import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap"


function AppealDetail() {
    //Get Appeal Id
    const location = window.location.href.split("/");
    const id = location[location.length - 1];
    const [appeal, setAppeal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //Get Appeal
    function getappeal(params) {
        get(url.GET_APPEALTYPE_BY_ID + 25, params)
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


    console.log(appeal);

    console.log("http://emeergencyapp.us-east-1.elasticbeanstalk.com/" + appeal?.audio);


    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="Appeal" breadcrumbItem="Appeal Detail" />
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardBody>
                                <ReactAudioPlayer
                                    src= {"http://emeergencyapp.us-east-1.elasticbeanstalk.com/" + appeal?.audioUrl}
                                    autoPlay
                                    controls
                                />
                                <ReactPlayer
                                    url= {"http://emeergencyapp.us-east-1.elasticbeanstalk.com/" + appeal?.videoUrl}
                                    controls
                                />

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )
}

export default AppealDetail