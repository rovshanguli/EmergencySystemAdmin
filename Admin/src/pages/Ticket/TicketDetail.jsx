import React, { useEffect, useState } from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Col, Card, CardBody, Table, Button } from "reactstrap";
import { post, del, get, put } from "../../helpers/api_helper";
import * as url from "../../helpers/url_helper";
import Map from "../../pages/Maps/StaticMap";


function TicketDetail() {
    let config = { headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("authUser")) } }
    const location = window.location.href.split("/");
    const id = location[location.length - 1];
    const [ticket, setTicket] = useState(null)

    useEffect(() => {
        get(url.GET_TICKET_BY_ID + id, config).then(data => {
            setTicket(data)
        })
    }, [])
    console.log(ticket);

    let center = {
        lat: parseFloat(ticket?.lat),
        lng: parseFloat(ticket?.long)
    }

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
                            </Table>

                            {
                                center?.lat == NaN || center.long == NaN ? <div></div> : <Map center={center} />
                            }



                        </CardBody>
                    </Card>
                </Col>
            </div>
        </React.Fragment>
    )
}





export default TicketDetail

