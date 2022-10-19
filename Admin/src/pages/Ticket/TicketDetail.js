import React, { useEffect, useState } from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Col, Card, CardBody, Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { post, del, get, put } from "../../helpers/api_helper";
import * as url from "../../helpers/url_helper";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


function TicketDetail() {
    let config = { headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("authUser")) } }
    const [ticket, setTicket] = useState(null)

    useEffect(() => {
        get(url.GET_TICKET_BY_ID + 6, config).then(data => {
            setTicket(data)
        })
    }, [])
    console.log(ticket);

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };

    //Container style
    const containerStyle = new {
        width: '100%',
        height: '400px'
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="Form" breadcrumbItem="Ticket Detail" />
                <Col lg="12">
                    <Card>
                        <CardBody>
                            <Table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Id</th>
                                        <th>CreatedByUsername</th>
                                        <th>Assigned To</th>
                                        <th>CreatedAt</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ticket?.appeals?.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <th scope="row">
                                                    {index + 1}
                                                </th>
                                                <td>{item.id}</td>
                                                <td>{item.createdByUsername}</td>
                                                <td>{ticket?.assignedTo}</td>
                                                <td>{item.createdAt}</td>
                                                <td>{ticket?.status}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                 <GoogleMap
                                    
                                >
                                    <Marker
                                        position={{1.3521 : 103.8198}}
                                    />
                                </GoogleMap>

                               
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        </React.Fragment>
    )
}

export default TicketDetail

