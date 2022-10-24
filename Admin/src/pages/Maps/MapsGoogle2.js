import PropTypes from 'prop-types'
import React, { useState, useEffect } from "react"
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"
import { connect } from "react-redux"
import { lightData } from "./LightData"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { post, del, get, put } from "../../helpers/api_helper";
import * as url from "../../helpers/url_helper";


const MapsGoogle = props => {
    const ref = React.useRef(null);
    const [map, setMap] = React.useState();
    if (ref.current && !map) {
        setMap(new window.google.maps.Map(ref.current, {}));
    }

    const [center, setCenter] = useState({})
    const [zoom, setZoom] = useState(10)
    const [markers, setMarkers] = useState([]);


    useEffect(() => {
        get(url.GET_APPEALS_LOCATION).then((response) => {
            setMarkers(response);
            setCenter({
                lat: parseFloat(response[0].lat),
                lng: parseFloat(response[0].long),
            })
        });
    }, []);





    return (
        <React.Fragment>

            <Col lg={12}>


                        <div
                            id="gmaps-markers"
                            className="gmaps"
                            style={{ position: "relative" }}
                        >
                            <Map
                                google={props.google}
                                style={{ width: "100%", height: "200%" }}
                                zoom={zoom}
                                initialCenter={
                                    center
                                }
                                center={center}
                            >

                                {
                                    markers.map((marker, index) => {
                                        if (true) {
                                            return (
                                                <Marker
                                                    key={index}
                                                    position={{lat:parseFloat(marker.lat),lng:parseFloat(marker.long)}}
                                                    onClick={() => {
                                                        setCenter({
                                                            lat: parseFloat(marker.lat),
                                                            lng: parseFloat(marker.long),
                                                        })
                                                        setZoom(15)
                                                        window.open("/appealdetail/" + marker.id, "_blank");
                                                    }}
                                                    

                                                    title={"asasd"}

                                                />
                                            )
                                        }
                                    })
                                }
                            </Map>
                        </div>
            </Col>
        </React.Fragment>
    )
}

MapsGoogle.propTypes = {
    google: PropTypes.object
}

export default connect(
    null,
    {}
)(
    GoogleApiWrapper({
        apiKey: "AIzaSyD57wRcrfko48s1TmFWjhT5TH9fTMgLzOY",
        v: "3",
    })(MapsGoogle)
)
