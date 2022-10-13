import React from "react"

import {
  Form,
  Card,
  CardBody,
  Col,
  Row,
} from "reactstrap"

// Form Editor
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const FormEditors = () => {

  // get the editor state
  const onEditorStateChange = (editorState) => {
    console.log(editorState)
  }

  // get the editor content to handle the submit
  const onEditorChange = (editorContent) => {
     console.log(editorContent);
  }
  
  return (
    <React.Fragment>
      <div className="page-content">
          <Breadcrumbs title="Form" breadcrumbItem="Form Editors" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Form>
                    <Editor
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={onEditorStateChange}
                      onContentStateChange={onEditorChange}
                    />
                    <button type="submit">Get Editor State</button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
      
      </div>
    </React.Fragment>
  )
}

export default FormEditors
