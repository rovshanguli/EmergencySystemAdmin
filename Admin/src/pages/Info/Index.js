import React, { useState, useEffect } from 'react';
import axios from 'axios';
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



function Index() {
  const [data, setData] = useState([])
  let config = "Bearer " + JSON.parse(localStorage.getItem('authUser'))
  useEffect(() => {
    axios.get('http://emeergencyapp.us-east-1.elasticbeanstalk.com/api/Info/GetAll', { headers: { Authorization: config } })
      .then(res => {
        setData(res.data)
      })
  }, [])


  // Info Modal Start
  const [modal_standard, setmodal_standard] = useState(false)
  const [info_data, setinfo_data] = useState()
  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }
  function tog_standard(id) {
    setinfo_data(data.filter(item => item.id === id)[0]);
    setmodal_standard(!modal_standard)
    removeBodyCss()
  }

  //Delete Info
  function deleteInfo(id) {
    debugger
    axios.delete('http://emeergencyapp.us-east-1.elasticbeanstalk.com/api/Info/Delete/' + id, { headers: { Authorization: config } })
      .then(res => {
        console.log(res.data)
        setData(data.filter(item => item.id !== id))
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Row>
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="page-title mb-0 font-size-18">Info</h4>
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
                        <th>Image</th>
                        <th>Header</th>
                        <th>Settings</th>
                        <th>
                          <Link to="/createinfo" className="waves-effect" >
                            <Button
                              color="success"
                              outline
                              className="waves-effect waves-light"
                              style={{ float: "right" }}
                            >
                              Create
                            </Button>{""}
                          </Link>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            <img src={"http://emeergencyapp.us-east-1.elasticbeanstalk.com/" + item.imgUrl} alt="image" className="avatar-sm" />
                          </td>
                          <td>{item.translates[0].header}</td>
                          <td>
                            <Button
                              color="info"
                              outline
                              className="waves-effect waves-light"
                              onClick={() => {
                                tog_standard(item.id)
                              }}
                            >
                              Info
                            </Button>{" "}
                            <Button
                              color="danger"
                              outline
                              className="waves-effect waves-light"
                              onClick={() => {
                                deleteInfo(item.id)
                              }}
                            >
                              Delete
                            </Button>{" "}
                            <Link to={`/updateinfo/${item.id}`} className="waves-effect" >
                              <Button
                                color="success"
                                outline
                                className="waves-effect waves-light"
                              >
                                Update
                              </Button>{""}
                            </Link>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <Col sm={6} md={4} xl={3}>
                  <Modal
                    isOpen={modal_standard}
                    toggle={() => {
                      tog_standard()
                    }}
                  >
                    <div className="modal-header">
                      <h5 className="modal-title mt-0" id="myModalLabel">
                        {info_data && info_data.translates[0]?.header}
                      </h5>
                      <button
                        type="button"
                        onClick={() => {
                          setmodal_standard(false)
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
                            <CardImg className="img-fluid" src={"http://emeergencyapp.us-east-1.elasticbeanstalk.com/" + info_data?.imgUrl} alt="" />
                          </CardBody>
                        </Card>
                      </Col>
                      <p>{info_data && info_data.translates[0]?.description}</p>
                    </div>
                  </Modal>
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>

  )
}

export default Index