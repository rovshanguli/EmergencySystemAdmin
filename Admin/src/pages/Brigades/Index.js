import React, { useState } from 'react';
import { post, del, get, put } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import Breadcrumbs from "../../components/Common/Breadcrumb"
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
    const [name, setName] = useState("")
    const [region, setRegion] = useState("")
    const [password, setPassword] = useState("")
    const [confirm_password, setConfirmPassword] = useState("")

    React.useEffect(() => {
        setLoading(true)
        get(url.GET_BRIGADE, config)
            .then(response => {
                console.log(response);
                setBrigades(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
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
    

    const registerBrigade = () => {
        if (password === confirm_password) {
            let data = {
                username: name,
                region: region,
                password: password
            }
            post(url.REGISTER_BRIGADE, data, config)
                .then(response => {
                    tog_register()
                    setLoading(true)
                    alert("Success", "Brigade has been registered", "success")
                    get(url.GET_BRIGADE, config)
                    .then(response => {
                        setBrigades(response)
                        setLoading(false)
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            alert("Password and Confirm Password must be same")
        }
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
                                        <button style={{ float: 'right' }} type="button" onClick={() => tog_register()} className="btn btn-primary waves-effect waves-light">
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
                                            {brigades?.map((brigade, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{brigade?.name}</td>
                                                    <td>{brigade?.region}</td>
                                                    <td>
                                                        {
                                                            brigade?.isWorking ? <span className="badge badge-soft-success font-size-12">Working</span> : <span className="badge badge-soft-danger font-size-12">Not Working</span>
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
                                    <div className="col-md-12 mb-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Name"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Region"
                                            defaultValue = ""
                                            onChange={(e) => setRegion(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-2">
                                        <input
                                            className="form-control"
                                            type="password"
                                            placeholder="Password"
                                            style = {{defaultValue : ""}}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-2">
                                        <input
                                            className="form-control"
                                            type="password"
                                            placeholder="Confirm Password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>


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
                                        onClick={() => registerBrigade()}
                                    >
                                        Register
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