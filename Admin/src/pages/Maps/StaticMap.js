import PropTypes from 'prop-types'
import React, { useState } from "react"
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"
import { connect } from "react-redux"
import { lightData } from "./LightData"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"


const MapsGoogle = props => {
    const ref = React.useRef(null);
    const [map, setMap] = React.useState();
    const [adress, setAdress] = useState("");
    if (ref.current && !map) {
        setMap(new window.google.maps.Map(ref.current, {}));
    }

    



    

    //find adress from long lat

    const findLongLat = (long, lat) => {
        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat: parseFloat(lat), lng: parseFloat(long) };
        geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    return results[0].formatted_address
                } else {
                    window.alert("No results found");
                }
            } else {
                window.alert("Geocoder failed due to: " + status);
            }
        });
    }



    return (
        <React.Fragment>
            <Col lg={12}>
                <Card>
                    <CardBody>
                        <div
                            id="gmaps-markers"
                            className="gmaps"
                            style={{ position: "relative" }}
                        >
                            <Map
                                google={props.google}
                                style={{ width: "100%", height: "100%" }}
                                zoom={14}
                                initialCenter={
                                    props.center
                                }
                                center={props.center}
                                onClick={(t, map, coord) => {
                                    const { latLng } = coord;
                                    const lat = latLng.lat();
                                    const lng = latLng.lng();
                                    const adress = findLongLat(lat, lng);
                                }}
                            >

                                <Marker name={"Current location"}
                                    position={props.center}
                                />
                            </Map>
                        </div>
                    </CardBody>
                </Card>
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
