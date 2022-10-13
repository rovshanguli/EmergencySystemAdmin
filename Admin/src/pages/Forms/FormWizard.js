import React, { useState } from "react"

import {
  Card,
  CardBody,
  Col,
  Form,
  Input,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap"

import classnames from "classnames"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const FormWizard = () => {
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
                          Seller Details
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
                          Company Document
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
                          Bank Details
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
                      </TabPane>

                      <TabPane tabId={2}>

                        
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

export default FormWizard
