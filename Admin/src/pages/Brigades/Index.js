import React, { useState } from 'react';
import { post, del, get, put } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Link } from "react-router-dom"
import {
    Table,
    Card,
    CardBody,
    Col,
    Spinner,
    Row,
    Modal
} from "reactstrap";

function Index() {
    let config = { headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("authUser")) } }
    const [register, set_Register] = useState(false)
    const [brigades, setBrigades] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        setLoading(true)
        get(url.GET_BRIGADE, config)
            .then(response => {
                setBrigades(response)
                setLoading(false)
            })
            .catch(error => {
                setError(error)
                setLoading(false)
            })
    }, [])

    function tog_register() {
        set_Register(!register)
        removeBodyCss()
    }
    function removeBodyCss() {
        document.body.classList.add("no_padding")
    }




    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="Forms" breadcrumbItem="Brigade" />
                <div className="row">
                    <Col lg={12}>
                        <Card>
                            <CardBody>
                                <div className="table-responsive">
                                    <div>
                                        <button style={{ float: 'right' }} type="button" onClick = {() => tog_register()} className="btn btn-primary waves-effect waves-light">
                                            Create Brigade
                                        </button>
                                    </div>
                                    {loading && <Spinner className="m-1" color="primary" />}
                                    <Table className="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Region</th>
                                                <th>IsWorking</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {error && <tr><td>{error}</td></tr>}
                                            {brigades.map((brigade, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index}</th>
                                                    <td>{brigade.name}</td>
                                                    <td>{brigade.region}</td>
                                                    <td>
                                                        {
                                                            brigade.isWorking ? <span className="badge badge-soft-success font-size-12">Working</span> : <span className="badge badge-soft-danger font-size-12">Not Working</span>
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Row>
                        <Col sm={6} md={4} xl={3}>
                            <Modal
                                isOpen={register}
                                toggle={() => {
                                    tog_register()
                                }}
                            >
                                <div className="modal-header">
                                    <h5 className="modal-title mt-0" id="myModalLabel">
                                        Modal Heading
                                    </h5>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            set_Register(false)
                                        }}
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">

                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            tog_register()
                                        }}
                                        className="btn btn-primary waves-effect"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary waves-effect waves-light"
                                    >
                                        Save changes
                                    </button>
                                </div>
                            </Modal>
                        </Col>
                    </Row>
                </div>
            </div>


        </React.Fragment>
    )
}

export default Index