import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
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


function CreateInfo() {
    const [languages, setLanguages] = useState([]);
    const [translates, setTranslates] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        axios.get('http://emeergencyapp.us-east-1.elasticbeanstalk.com/api/Language/GetAll')
            .then(res => {
                setLanguages(res.data.sort((a, b) => a.name.localeCompare(b.name)));
                setTranslates(() => res.data.map((x) => ({ ...langObj, langCode: x.code })));
            })
    }, [])

    const editorRef = useRef(null);
    let langObj = {
        langCode: "",
        header: "",
        description: ""
    }



    const handleTextEditorChange = () => {
        const langIndex = translates.findIndex(x => x.langCode === activeLanguage);
        const newTranslates = [...translates];
        newTranslates[langIndex].description = editorRef.current.getContent();
        setTranslates(newTranslates);
    };


    const [activeLanguage, setactiveLanguage] = useState("az")
    function toggleCustomJustified2(tab) {
        if (activeLanguage !== tab) {
            setactiveLanguage(tab)
            editorRef.current.setContent(translates.find(x => x.langCode === tab).description);
            document.getElementById("header").value = translates.find(x => x.langCode === tab).header;
        }
    }

    const createInfo = () => {
        const formData = new FormData();
        formData.append("photo", file);
        for (let index = 0; index < translates.length; index++) {
            formData.append("translates[" + index + "].langCode", translates[index].langCode);
            formData.append("translates[" + index + "].header", translates[index]?.header);
            formData.append("translates[" + index + "].description", translates[index]?.description);
        }
        axios.post('http://emeergencyapp.us-east-1.elasticbeanstalk.com/api/info/create', formData)
            .then(res => {
                console.log(res);
            })
    }

    //add header
    const addHeader = (e) => {
        const langIndex = translates.findIndex(x => x.langCode === activeLanguage);
        const newTranslates = [...translates];
        newTranslates[langIndex].header = e.target.value;
        setTranslates(newTranslates);
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
                                <Nav pills className="nav-justified">
                                    {languages.map((language, index) => (
                                        <NavItem key={index} data-index={index}>
                                            <NavLink
                                                className={classnames({
                                                    active: activeLanguage === language.code,
                                                })}
                                                onClick={() => {
                                                    toggleCustomJustified2(language.code)
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
                                                onKeyUp={(e) => addHeader(e)}
                                            />
                                        </div>
                                        <div data-repeater-item className="row">
                                            <div className="mb-3 col-lg-10">
                                                <label htmlFor="resume">Choose Photo</label>
                                                <input onChange={(e) => setFile(e.target.files[0])} type="file" className="form-control" id="resume" />
                                            </div>
                                        </div>
                                    </Col>
                                    <Editor
                                        apiKey="w1lnxea7oxirnfw2f5grr09jc5rh14f8qgmjxxcd6d3qmd1z"
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        initialValue="<p>This is the initial content of the editor</p>"
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
                                        onKeyUp={handleTextEditorChange}
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-success waves-effect waves-light"
                                        onClick={createInfo}
                                    >
                                        <i className="bx bx-check-double font-size-16 align-middle me-2"></i>{" "}
                                        Create
                                    </button>{" "}
                                </TabContent>


                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )
}


export default CreateInfo