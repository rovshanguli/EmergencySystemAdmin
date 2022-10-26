import React, { useState, useEffect } from 'react';
import {
    Table,
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Modal,
    CardImg
} from "reactstrap"
import { Link } from 'react-router-dom';
import { post, del, get, put } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import { Reorder } from "framer-motion/dist/framer-motion";



function Index() {
    const [items, setItems] = useState([])

    useEffect(() => {
        get(url.GET_TICKETSTATUS).then(data => {
            data.sort((a, b) => a.level - b.level)
            setItems(data)
        })
    }, [])






    return (
        <React.Fragment>
            <div className="page-content">
                <Row>
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <h4 className="page-title mb-0 font-size-18">Ticket Status</h4>
                        </div>
                    </div>
                </Row>
                <Row>
                    <Col lg="12">
                        <Col lg={3}>
                            <Card>
                                <CardBody>

                                    <Reorder.Group axis="y" values={items}
                                        onReorder={function (params) {
                                            console.log(params)
                                            setItems(params)
                                        }}
                                        className="list-group"
                                    >
                                        {items.map((item, index) => (
                                            <Reorder.Item key={item.id} value={item}
                                                className="list-group-item"
                                                padding={10}
                                                margin={10}
                                            >
                                                <span>{index + 1}</span>
                                                {item.name}
                                            </Reorder.Item>
                                        ))}
                                    </Reorder.Group>

                                </CardBody>
                            </Card>
                        </Col>
                    </Col>
                </Row>
            </div>
        </React.Fragment>

    )
}

export default Index