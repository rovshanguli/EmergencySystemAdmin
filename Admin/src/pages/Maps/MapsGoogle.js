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

  const [center, setCenter] = useState({
    lat: 40.37837241915437,
    lng: 49.95599129127135
  })



  const findAdress = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: adress }, (results, status) => {
      if (status === "OK") {
        setCenter({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        })
      } else {
        alert("Unvan Tapilmadi: " + status);
      }
    });
    props.location(center)
  }

  return (
    <React.Fragment>
      <Col lg={12}>
        <Card>
          <CardBody>
            <CardTitle>
              <Row>
                <Col lg={6}>
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    onChange={e => setAdress(e.target.value)}
                    style={{ width: "80%", display: "inline-block" }}
                  />
                  <button
                    type="button"
                    className="btn btn-success waves-effect waves-light"
                    onClick={findAdress}
                  >
                    Success
                  </button>{" "}
                </Col>
              </Row>
            </CardTitle>

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
                  center
                }
                center={center}
                onClick={(t, map, coord) => {
                  const { latLng } = coord;
                  const lat = latLng.lat();
                  const lng = latLng.lng();
                  setCenter({ lat, lng });
                }}
              >

                <Marker name={"Current location"}
                  position={center}
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
