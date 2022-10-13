import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { post, del, get, put } from "../../helpers/api_helper";
import * as url from "../../helpers/url_helper";

import {
    Table,
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Modal,
    Form,
} from "reactstrap"


function Index() {

    const langs = ["az", "en"];
    const [languages, setLanguages] = useState([]);
    const [translates, setTranslates] = useState([]);

    useEffect(() => {
        get(url.GET_LANGUAGE)
            .then(res => {
                setLanguages(res.sort((a, b) => a.name.localeCompare(b.name)));
                setTranslates(() => res.map((x) => ({ ...langObj, langCode: x.code })));
            })

    }, [])

    let langObj = {
        id: 0,
        langCode: "",
        name: "",
    }
    const [data, setData] = useState([])
    const [file, setFile] = useState(null)
    let config = "Bearer " + JSON.parse(localStorage.getItem('authUser'))
    function getDatas() {
        axios.get(url.GET_APPEALTYPE, { headers: { Authorization: config } })
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getDatas()
    }, [])


    // Get Input Values Start
    const onChange = e => {
        setFile(e.target.files[0])
    }
    const handleInputChange = (event) => {
        const index = parseInt(event.currentTarget.dataset.index, 10);
        const newTranslates = [...translates];
        newTranslates[index].name = event.target.value;
        setTranslates(newTranslates);
    };
    // Get Input Values End




    // Add AppealType Start
    const [add_modal, setadd_modal] = useState(false)
    function removeBodyCss() {
        document.body.classList.add("no_padding")
    }
    function add_toggle() {
        setadd_modal(!add_modal)
        removeBodyCss()
    }
    const addAppealType = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("photo", file);
        for (let index = 0; index < translates.length; index++) {
            formData.append("translates[" + index + "].langCode", translates[index].langCode);
            formData.append("translates[" + index + "].name", translates[index]?.name);
        }
        axios.post(url.CREATE_APPEALTYPE, formData)
            .then(res => {
                if (res.status === 200) {
                    add_toggle();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setFile(null)
                    setTranslates(() => langs.map((x) => ({ ...langObj, langCode: x })));
                    getDatas()
                }
            })
            .catch(err => {
                console.log(err)
            })
        getDatas()
    }
    // Add AppealType End

    // Delete AppealType Start
    const deleteAppealType = (id) => {
        axios.delete(url.DELETE_APPEALTYPE + `${id}`, { headers: { Authorization: config } })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        setData(data.filter(item => item.id !== id))
    }
    // Delete AppealType End


    // Update AppealType Start
    const [update_modal, setupdate_modal] = useState(false)
    const [update_id, setupdate_id] = useState(0)
    function update_toggle() {
        setupdate_modal(!update_modal)
        removeBodyCss()
        setupdate_data(null)
    }

    const [update_data, setupdate_data] = useState([])
    const getAppealTypeById = (id) => {
        setupdate_id(id)
        axios.get(url.GET_APPEALTYPE_BY_ID + `${id}`, { headers: { Authorization: config } })
            .then(res => {
                debugger
                setupdate_data(res.data)
                setTranslates(() => langs.map((x) => ({ ...langObj, langCode: x, name: res.data.translates?.find(y => y.langCode === x).name })));
            })
            .catch(err => {
                console.log(err)
            })
        update_toggle();
    }

    const updateAppealType = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("photo", file);
        formData.append("id", update_id);
        for (let index = 0; index < translates.length; index++) {
            formData.append("translates[" + index + "].langCode", translates[index].langCode);
            formData.append("translates[" + index + "].name", translates[index]?.name);
        }
        axios.put(url.UPDATE_APPEALTYPE, formData)
            .then(res => {
                if (res.status === 200) {
                    update_toggle();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setFile(null)
                    setTranslates(() => langs.map((x) => ({ ...langObj, langCode: x })));
                    getDatas()
                }
            })
            .catch(err => {
                console.log(err)
            })
        getDatas()
    }
    // Update AppealType End


    return (
        <React.Fragment>
            <div className="page-content">
                <Row>
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <h4 className="page-title mb-0 font-size-18">AppealType</h4>
                        </div>
                    </div>
                </Row>
                <Row>
                    <Col lg="12">
                        <Card>
                            <CardBody>
                                <div className="table-responsive">
                                    <Table className="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Icon</th>
                                                <th>Name</th>
                                                <th>Settings</th>
                                                <th>
                                                    <Button
                                                        color="success"
                                                        outline
                                                        className="waves-effect waves-light"
                                                        style={{ float: "right" }}
                                                        onClick={() => {
                                                            add_toggle()
                                                        }}
                                                    >
                                                        Create
                                                    </Button>{""}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.map((item, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>
                                                        <img src={"http://emeergencyapp.us-east-1.elasticbeanstalk.com/" + item.icon} alt="image" className="avatar-sm" />
                                                    </td>
                                                    <td>{item.translates[0]?.name}</td>
                                                    <td>
                                                        <Button
                                                            color="danger"
                                                            outline
                                                            className="waves-effect waves-light"
                                                            onClick={() => {
                                                                deleteAppealType(item.id)
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>{" "}
                                                        <Button
                                                            color="success"
                                                            outline
                                                            className="waves-effect waves-light"
                                                            onClick={() => {
                                                                getAppealTypeById(item.id)
                                                            }}
                                                        >
                                                            Update
                                                        </Button>{""}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className='add-modal'>
                                    <Col sm={6} md={4} xl={3}>
                                        <Modal
                                            isOpen={add_modal}
                                            toggle={() => {
                                                add_toggle()
                                            }}
                                        >
                                            <div className="modal-header">
                                                <h5 className="modal-title mt-0" id="myModalLabel">
                                                </h5>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setadd_modal(!add_modal)
                                                    }}
                                                    className="close"
                                                    data-dismiss="modal"
                                                    aria-label="Close"
                                                >
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <Col lg={12}>
                                                    <Card>
                                                        <CardBody>
                                                            <Form className="repeater" encType="multipart/form-data">
                                                                <div data-repeater-list="group-a">
                                                                    <div data-repeater-item className="row">
                                                                        <div className="mb-3 col-lg-12">
                                                                            <label htmlFor="resume">Choose Icon</label>
                                                                            <input onChange={(e) => onChange(e)} type="file" className="form-control" id="resume" />
                                                                        </div>
                                                                    </div>
                                                                    {languages.map((lang, index) => (
                                                                        <div className="mb-3 col-lg-12" key={index}>
                                                                            <label htmlFor="subject">{lang.name}</label>
                                                                            <input type="text" key={index} data-index={index} onChange={handleInputChange} id="subject" className="form-control" />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <Button
                                                                    color="success"
                                                                    className="btn btn-success mt-3 mt-lg-0"
                                                                    onClick={addAppealType}
                                                                >
                                                                    Add
                                                                </Button>
                                                            </Form>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </div>
                                        </Modal>
                                    </Col>
                                </div>
                                <div className="update-modal">
                                    <Col sm={6} md={4} xl={3}>
                                        <Modal
                                            isOpen={update_modal}
                                            toggle={() => {
                                                update_toggle()
                                            }}
                                        >
                                            <div className="modal-header">
                                                <h5 className="modal-title mt-0" id="myModalLabel">
                                                </h5>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setupdate_modal(!update_modal)
                                                    }}
                                                    className="close"
                                                    data-dismiss="modal"
                                                    aria-label="Close"
                                                >
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <Col lg={12}>
                                                    <Card>
                                                        <CardBody>
                                                            <Form className="repeater" encType="multipart/form-data">
                                                                <div data-repeater-list="group-a">
                                                                    <div data-repeater-item className="row">
                                                                        <img src="" alt="" />
                                                                        <div className="mb-3 col-lg-12">
                                                                            <Row>
                                                                                <Col lg={4}>
                                                                                    <div>
                                                                                        <img src={"http://emeergencyapp.us-east-1.elasticbeanstalk.com/" + update_data?.icon} className=" avatar-md icon" alt="" srcSet="" />
                                                                                    </div>
                                                                                </Col>
                                                                                <Col lg={7}>
                                                                                    <label htmlFor="resume">Choose Icon</label>
                                                                                    <input onChange={(e) => onChange(e)} type="file" className="form-control" id="resume" />
                                                                                </Col>
                                                                            </Row>
                                                                        </div>
                                                                    </div>
                                                                    {update_data?.translates?.map((item, index) => (
                                                                        <div className="mb-3 col-lg-12" key={index}>
                                                                            <label htmlFor="subject">{item?.langCode}</label>
                                                                            <input type="text" key={index} data-index={index} onChange={handleInputChange} defaultValue={item?.name} id="subject" className="form-control" />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <Button
                                                                    color="success"
                                                                    className="btn btn-success mt-3 mt-lg-0"
                                                                    onClick={updateAppealType}
                                                                >
                                                                    Update
                                                                </Button>
                                                            </Form>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </div>
                                        </Modal>
                                    </Col>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>

    )
}

export default Index