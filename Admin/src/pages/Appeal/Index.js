import React, { useState, useEffect } from 'react'
import { MDBDataTable } from "mdbreact"
import { post, del, get, put } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import Map from "../../pages/Maps/MapsGoogle"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


import {
    Table,
    Row,
    Card,
    CardBody,
    Col,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from "reactstrap"

import classnames from "classnames"
import { Link } from "react-router-dom"



import Select from "react-select";


const newSelected = [];
let currentPage;



function Index() {
    let config = { headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("authUser")) } }
    const [appeal, setAppeal] = useState([])
    const [brigade, setBrigade] = useState([])
    const [selected, setSelected] = useState(newSelected)
    const [selectedGroup, setselectedGroup] = useState(null);


    useEffect(() => {
        get(url.GET_APPEAL).then(res => {
            setAppeal(res)
        })

        get(url.GET_BRIGADE, config).then(res => {
            setBrigade(res)
        })
    }, [])







    const clicked = (e) => {
        if (!newSelected.includes(e.target.id)) {
            newSelected.push(e.target.id)
        } else {
            newSelected.splice(newSelected.indexOf(e.target.id), 1)
        }
        setSelected(newSelected)
    }







    function handleSelectGroup(selectedGroup) {
        setselectedGroup(selectedGroup);
    }





    const optionGroup = [
        {
            label: "Brigade",
            options: brigade
        }
    ];


    const [activeTab, setactiveTab] = useState(1)

    function toggleTab(tab) {
        if (activeTab !== tab) {
            if (tab >= 1 && tab <= 4) {
                setactiveTab(tab)
            }
        }
    }


    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="Forms" breadcrumbItem="Form Wizard" />
                <Row>
                    <Col lg="12">
                        <Card>
                            <CardBody>
                                <div className="form-wizard-wrapper wizard clearfix">
                                    <div className="steps clearfix">
                                        <ul>
                                            <NavItem
                                                className={classnames({ current: activeTab === 1 })}>
                                                <NavLink
                                                    className={classnames({ current: activeTab === 1 })}
                                                    onClick={() => {
                                                        setactiveTab(1)
                                                    }}
                                                >
                                                    <span className="number">1.</span>{" "}
                                                    Sellect Appeals
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className={classnames({ current: activeTab === 2 })}>
                                                <NavLink
                                                    className={classnames({ active: activeTab === 2 })}
                                                    onClick={() => {
                                                        setactiveTab(2)
                                                    }}
                                                >
                                                    <span className="number">2.</span>{" "}
                                                    Sellect Location
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className={classnames({ current: activeTab === 3 })}>
                                                <NavLink
                                                    className={classnames({ active: activeTab === 3 })}
                                                    onClick={() => {
                                                        setactiveTab(3)
                                                    }}
                                                >
                                                    <span className="number">3.</span>
                                                    Select Brigade
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className={classnames({ current: activeTab === 4 })}>
                                                <NavLink
                                                    className={classnames({ active: activeTab === 4 })}
                                                    onClick={() => {
                                                        setactiveTab(4)
                                                    }}
                                                >
                                                    <span className="number">4.</span>
                                                    Confirm Detail
                                                </NavLink>
                                            </NavItem>
                                        </ul>
                                    </div>
                                    <div className="content clearfix">
                                        <TabContent
                                            activeTab={activeTab}
                                            className="body"
                                        >
                                            <TabPane tabId={1}>
                                                <Row>
                                                    <Col lg="4" >
                                                        <Select
                                                            value={selectedGroup}
                                                            onChange={() => {
                                                                handleSelectGroup();
                                                            }}
                                                            options={optionGroup}
                                                            classNamePrefix="select2-selection"
                                                        />
                                                    </Col>
                                                    <Col className="col-12">
                                                        <Card>
                                                            <CardBody>
                                                                <Table className="table mb-0">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>#</th>
                                                                            <th>CreatedByUsername</th>
                                                                            <th>Adress</th>
                                                                            <th>Lang</th>
                                                                            <th>Lat</th>
                                                                            <th>CreatedAt</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {appeal.map((item, index) => {
                                                                            return (
                                                                                <tr key={index}>
                                                                                    <th scope="row">
                                                                                        <div className="custom-control custom-checkbox">
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                className="custom-control-input"
                                                                                                id={item.id}
                                                                                                onClick={clicked}
                                                                                            />
                                                                                            <label
                                                                                                className="custom-control-label"
                                                                                                htmlFor={item.id}
                                                                                            >
                                                                                                &nbsp;
                                                                                            </label>
                                                                                        </div>
                                                                                    </th>
                                                                                    <td>{item.createdByUsername}</td>
                                                                                    <td>{item.adress}</td>
                                                                                    <td>{item.lat}</td>
                                                                                    <td>{item.long}</td>
                                                                                    <td>{item.createdAt}</td>
                                                                                </tr>
                                                                            )
                                                                        })}
                                                                    </tbody>
                                                                    
                                                                </Table>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </TabPane>

                                            <TabPane tabId={2}>
                                                <Row>
                                                    <Map />
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId={3}>



                                            </TabPane>

                                        </TabContent>
                                    </div>
                                    <div className="actions clearfix">
                                        <ul>
                                            <li
                                                className={
                                                    activeTab === 1 ? "previous disabled" : "previous"
                                                }
                                            >
                                                <Link
                                                    to="#"
                                                    className="btn btn-primary"
                                                    onClick={() => {
                                                        toggleTab(activeTab - 1)
                                                    }}
                                                >
                                                    Previous
                                                </Link>
                                            </li>
                                            <li
                                                className={activeTab === 4 ? "next disabled" : "next"}
                                            >
                                                <Link
                                                    to="#"
                                                    className="btn btn-primary"
                                                    onClick={() => {
                                                        toggleTab(activeTab + 1)
                                                    }}
                                                >
                                                    Next
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
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