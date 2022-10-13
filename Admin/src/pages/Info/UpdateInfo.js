import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import {
    Row,
    Col,
    Card,
    CardBody,
    TabContent,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap"
import classnames from "classnames"




function UpdateInfo() {
    const [languages, setLanguages] = useState([]);
    const [infofile, setInfoFile] = useState(null);
    const [translates, setTranslates] = useState([]);

    //Get Indo Id
    const location = window.location.href.split("/");
    const id = location[location.length - 1];

    //Get Info
    const [info, setInfo] = useState(null);
    

    function GetInfo() {
        axios.get('http://emeergencyapp.us-east-1.elasticbeanstalk.com/api/Info/Get/' + id)
            .then(res => {
                setInfo(res.data);
                setTranslates(() => res.data.translates.map((x) => ({ ...x })));
                setInfoFile(res.data.photo);
            })
        if (info !== null) {
           
        }
            
        
    }


    //Get Languages
    const [activeLanguage, setactiveLanguage] = useState("az")
    function GetLanguages() {
        axios.get('http://emeergencyapp.us-east-1.elasticbeanstalk.com/api/Language/GetAll')
            .then(res => {
                setLanguages(res.data.sort((a, b) => a.name.localeCompare(b.name)));
            })
    }


    //Change Language
    let langObj = {
        langCode: "",
        header: "",
        description: ""
    }
    function changeLanguage(tab) {
        if (activeLanguage !== tab) {
            if (translates.find(x => x.langCode === tab) === undefined) {
                langObj.langCode = tab;
                langObj.header = "";
                langObj.description = "";
                translates.push(langObj);
            }
            setactiveLanguage(tab)
            editorRef.current.setContent(translates.find(x => x.langCode === tab)?.description);
            document.getElementById("header").value = translates.find(x => x.langCode === tab)?.header;
        }
    }


    //Get Editor Content
    const editorRef = useRef(null);
    const handleTextEditorChange = () => {
        const langIndex = translates.findIndex(x => x.langCode === activeLanguage);
        const newTranslates = [...translates];
        newTranslates[langIndex].description = editorRef.current.getContent();
        setTranslates(newTranslates);
    };




    //Get Header
    const handleHeaderChange = () => {
        const langIndex = translates.findIndex(x => x.langCode === activeLanguage);
        const newTranslates = [...translates];
        newTranslates[langIndex].header = document.getElementById("header").value;
        setTranslates(newTranslates);
    };


    //Update Info
    function UpdateInfo() {
        var data = {
            id: id,
            photo: infofile,
            translates: translates
        }
        axios.put('https://localhost:7045/api/Info/Update', data)
            .then(res => {
                console.log(res.data);
            })
    }













    useEffect(() => {
        GetLanguages();
        GetInfo();
    }, [])


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


                        </Card>
                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col lg="4">
                                                <div data-repeater-item className="row">
                                                    <div className="mb-3 col-lg-10">
                                                        <label htmlFor="resume">Choose Photo</label>
                                                        <input onChange={(e) => setInfoFile(e.target.files[0])} type="file" className="form-control" id="resume" />
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Nav pills className="nav-justified">
                                            {languages.map((language, index) => (
                                                <NavItem key={index} data-index={index}>
                                                    <NavLink
                                                        className={classnames({
                                                            active: activeLanguage === language.code,
                                                        })}
                                                        onClick={() => {
                                                            changeLanguage(language.code)
                                                        }}
                                                    >
                                                        <span className="d-block d-sm-none">
                                                            <i className="fas fa-home" />
                                                        </span>
                                                        <span className="d-none d-sm-block">{language.name}</span>
                                                    </NavLink>
                                                </NavItem>
                                            ))}
                                        </Nav>


                                        <TabContent activeTab={activeLanguage} className="p-3 text-muted">
                                            <Col lg="4">
                                                <div className="col-md-10">
                                                    <input
                                                        className="form-control"
                                                        id='header'
                                                        type="text"
                                                        onKeyUp={(e) => handleHeaderChange(e)}
                                                        placeholder="Header"
                                                        defaultValue={translates.find(x => x.langCode === activeLanguage)?.header}
                                                    />
                                                </div>

                                            </Col>
                                            <Editor
                                                apiKey="w1lnxea7oxirnfw2f5grr09jc5rh14f8qgmjxxcd6d3qmd1z"
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                //initialValue ={translates.find(x => x.langCode === activeLanguage)?.description}
                                                init={{
                                                    height: 500,
                                                    menubar: false,

                                                    plugins: [
                                                        'advlist autolink lists link image charmap print preview anchor',
                                                        'searchreplace visualblocks code fullscreen',
                                                        'insertdatetime media table paste code help wordcount'
                                                    ],
                                                    toolbar:
                                                        'undo redo | formatselect | bold italic backcolor | \
                                                        alignleft aligncenter alignright alignjustify | \
                                                        bullist numlist outdent indent | removeformat | help'
                                                }}
                                                onKeyUp={() => handleTextEditorChange()}
                                            />

                                            <button
                                                type="button"
                                                className="btn btn-success waves-effect waves-light"
                                                onClick={() => UpdateInfo()}
                                            >
                                                <i className="bx bx-check-double font-size-16 align-middle me-2"></i>{" "}
                                                Update
                                            </button>{" "}
                                        </TabContent>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )
}


export default UpdateInfo