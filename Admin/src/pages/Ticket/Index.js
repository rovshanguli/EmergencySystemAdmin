import React, { useEffect, useState } from 'react'
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Col, Card, CardBody, Label } from "reactstrap";
import Select from "react-select";

const optionGroup = [
    {
        label: "Picnic",
        options: [
            { label: "Mustard", value: "Mustard" },
            { label: "Ketchup", value: "Ketchup" },
            { label: "Relish", value: "Relish" },
        ],
    },
    {
        label: "Camping",
        options: [
            { label: "Tent", value: "Tent" },
            { label: "Flashlight", value: "Flashlight" },
            { label: "Toilet Paper", value: "Toilet Paper" },
        ],
    },
];

function Index() {

    const [selectedGroup, setselectedGroup] = useState(null);

    function handleSelectGroup(selectedGroup) {
        setselectedGroup(selectedGroup);
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="Form" breadcrumbItem="Form Advanced" />
                <Col lg="12">
                    <Card>
                        <CardBody>
                            <Select
                                value={selectedGroup}
                                options={optionGroup}
                                classNamePrefix="select2-selection"
                            />
                            <Select
                                value={selectedGroup}
                                options={optionGroup}
                                classNamePrefix="select2-selection"
                            />
                        </CardBody>
                    </Card>
                </Col>

            </div>
        </React.Fragment>
    )
}

export default Index