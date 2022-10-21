import React, { useState, useEffect } from 'react'
import { post, del, get, put } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MyMap from "../Maps/MapsGoogle";



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
    Button,
    Spinner
} from "reactstrap"

import classnames from "classnames"
import { Link } from "react-router-dom"


const newSelected = [];
let count = 1;


function Index() {
    let config = { headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("authUser")) } }
    const [appeal, setAppeal] = useState([])
    const [brigade, setBrigade] = useState([])
    const [selected, setSelected] = useState(newSelected)
    const [selectedBrigade, setSelectedBrigade] = useState('{"name":"Secilmeyib"}')
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        get(url.GET_APPEAL_PAGINATE + `page=${1}&pageSize=10`).then(res => {
            setLoading(true)
            setAppeal(res)
            setLoading(false)
        })

        get(url.GET_BRIGADE, config).then(res => {
            setBrigade(res)
        })
    }, [])






    const clicked = (e) => {
        if (!newSelected.includes(e.target.value)) {
            newSelected.push(e.target.value)
        } else {
            newSelected.splice(newSelected.indexOf(e.target.value), 1)
        }
        setSelected(newSelected)
    }


    //Onpage change
    const handlePageChange = (e, value) => {
        e.preventDefault();
        get(url.GET_APPEAL_PAGINATE + `page=${value}&pageSize=10`).then(res => {
            setAppeal(res)
        })
    };

    const [activeTab, setactiveTab] = useState(1)

    function toggleTab(tab) {
        if (activeTab !== tab) {
            if (tab >= 1 && tab <= 4) {
                setactiveTab(tab)
            }
        }
    }


    const createTicket = () => {
        let adress = JSON.parse(localStorage.getItem("center"))
        let data = {
            "appealsId": selected,
            "brigadeId": JSON.parse(selectedBrigade).id,
            "description": description,
            "lat": adress.lat.toString(),
            "long": adress.lng.toString(),
        }
        post(url.CREATE_TICKET, data, config).then(res => {
            console.log(res);
            if (res.status === 200) {
                alert("Tiket yaradildi")
            }
            else {
                alert("Tiket yaradilmadi")
            }
        })
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="Forms" breadcrumbItem="Appeal" />
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
                                                    <Col className="col-12">
                                                        <Card>
                                                            <CardBody>
                                                            {loading && <Spinner className="m-1" color="primary" />}
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
                                                                        
                                                                        {appeal?.datas?.map((item, index) => {
                                                                            return (
                                                                                <tr key={item.id}>
                                                                                    <th scope="row">
                                                                                        {index + 1}
                                                                                    </th>
                                                                                    <td>{item.createdByUsername}</td>
                                                                                    <td>{item.adress}</td>
                                                                                    <td>{item.lat}</td>
                                                                                    <td>{item.long}</td>
                                                                                    <td>{item.createdAt}</td>
                                                                                    <td>
                                                                                        <Link to={`/appealdetail/${item.id}`} className="waves-effect" >
                                                                                            <Button
                                                                                                color="success"
                                                                                                outline
                                                                                                className="waves-effect waves-light"
                                                                                            >
                                                                                                Detail
                                                                                            </Button>{""}
                                                                                        </Link>
                                                                                    </td>
                                                                                    <th scope="row">
                                                                                        <div className="custom-control custom-checkbox">
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                className="custom-control-input"
                                                                                                value={item.id}
                                                                                                id={item.id}
                                                                                                onClick={clicked}
                                                                                                defaultChecked={selected.includes(item.id.toString())}
                                                                                            />
                                                                                            <label
                                                                                                className="custom-control-label"
                                                                                                htmlFor={item.id}
                                                                                            >
                                                                                                &nbsp;
                                                                                            </label>
                                                                                        </div>
                                                                                    </th>
                                                                                </tr>
                                                                            )
                                                                        })}
                                                                    </tbody>
                                                                </Table>
                                                                <Stack spacing={2}>
                                                                    <Pagination count={appeal.totalPages} color="primary"
                                                                        onChange={(e, page) => {
                                                                            handlePageChange(e, page)
                                                                        }}
                                                                    />
                                                                </Stack>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId={2}>
                                                <Row>
                                                    <MyMap />
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId={3}>
                                                <Row>
                                                    <select className="form-select" onChange={(e) => setSelectedBrigade(e.target.value)} size="20" aria-label="size 3 select example">
                                                        {brigade?.map((item, index) => {
                                                            return (
                                                                <option disabled={item.isWorking} key={item.id} value={JSON.stringify(item)}>{item.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId={4}>
                                                <Row>
                                                    <Col className="col-12">
                                                        <Card>
                                                            <CardBody>
                                                                <div className="text-nowrap" >
                                                                    Secilen umumi sikayetlerin sayi: {selected?.length}
                                                                </div>
                                                                <div className="text-nowrap mb-4" >
                                                                    Secilen brigada: {JSON.parse(selectedBrigade)?.name}
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="">Note</label>
                                                                    <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                                                </div>
                                                                <div className="text-nowrap mt-4" >
                                                                    <Button color="primary" onClick={() => createTicket()} style={{float: 'right'}}>Create Ticket</Button>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </Row>
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





