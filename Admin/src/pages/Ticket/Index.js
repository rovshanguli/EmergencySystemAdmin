import React, { useEffect, useState } from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Col, Card, CardBody, Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { post, del, get, put } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



function Index() {
    let config = { headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("authUser")) } }
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        get(url.GET_TICKET_PAGINATE + 1, config).then(data => {
            setTickets(data)
        })
    }, [])

    const handlePageChange = (e, value) => {
        e.preventDefault();
        get(url.GET_TICKET_PAGINATE + value).then(res => {
            setTickets(res)
        })
    };


    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="Form" breadcrumbItem="Tickets" />
                <Col lg="12">
                    <Card>
                        <CardBody>
                            <Table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>TicketId</th>
                                        <th>CreatedByUsername</th>
                                        <th>Assigned To</th>
                                        <th>CreatedAt</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets?.datas?.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <th scope="row">
                                                    {index + 1}
                                                </th>
                                                <td>{item.id}</td>
                                                <td>{item.createdBy}</td>
                                                <td>{item.assignedTo}</td>
                                                <td>{item.createdAt}</td>
                                                <td>{item.status}</td>
                                                <td>
                                                    <Link to={`/ticketdetail/${item.id}`} className="waves-effect" >
                                                        <Button
                                                            color="success"
                                                            outline
                                                            className="waves-effect waves-light"
                                                        >
                                                            Detail
                                                        </Button>{""}
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            <Stack spacing={2}>
                                <Pagination count={tickets?.totalPages} color="primary"
                                    onChange={(e, page) => {
                                        handlePageChange(e, page)
                                    }}
                                />
                            </Stack>
                        </CardBody>
                    </Card>
                </Col>

            </div>
        </React.Fragment>
    )
}

export default Index