import React from 'react';
import { post, del, get, put } from "../../helpers/api_helper"
import * as url from "../../helpers/url_helper"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import {
    Table,
    Card,
    CardBody,
    Col

} from "reactstrap";

function Index() {
    let config = { headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("authUser")) } }
    const [brigades, setBrigades] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        setLoading(true)
        get(url.GET_BRIGADE,config)
            .then(response => {
                setBrigades(response)
                setLoading(false)
            })
            .catch(error => {
                setError(error)
                setLoading(false)
            })
    }, [])




    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="Forms" breadcrumbItem="Brigade" />
                <div className="row">
                    <Col lg={12}>
                        <Card>
                            <CardBody>
                                <div className="table-responsive">
                                    <Table className="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Region</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {brigades.map((brigade, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{brigade.id}</th>
                                                    <td>{brigade.name}</td>
                                                    <td>{brigade.region}</td>
                                                    <td>{brigade.isWorking}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </div>
            </div>

        </React.Fragment>
    )
}

export default Index