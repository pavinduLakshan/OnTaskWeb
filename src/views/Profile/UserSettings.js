import React, { useState } from 'react'
import { Row,Col,Card,CardBody,Input} from 'reactstrap'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ReactMarkdown from "react-markdown";

const UserSettings = () => {
    const [input,setInput] = useState("")
    function handleChange(){

    }

    return (
        <>
            <Card>
                <CardBody>
                <h5>Basic Info</h5>
                <Row>
                    <Col>first name
                    <Input name="name" onChange={handleChange} placeholder=""></Input>
                    </Col>
                    <Col>last name
                    <Input name="name" onChange={handleChange} placeholder=""></Input>
                    </Col>
                </Row>
                username
                <Input name="name" onChange={handleChange} placeholder=""></Input>
                About me
                <Tabs defaultActiveKey="write" id="uncontrolled-tab-example">
        <Tab eventKey="write" title="Write" style={{ padding: 0 }}>
          <Input
            type="textarea"
            name="input"
            value={input}
            onChange={handleChange}
          />
        </Tab>
        <Tab eventKey="preview" title="Preview">
          <ReactMarkdown source={input} />
        </Tab>
      </Tabs>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                <h5>Contact Info</h5>
                <Row>
                    <Col>mobile
                    <Input name="name" onChange={handleChange} placeholder=""></Input>
                    </Col>
                    <Col>email address
                    <Input name="name" onChange={handleChange} placeholder=""></Input>
                    </Col>
                </Row>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                <h5>Web Presence</h5>

                website link
                <Input name="name" onChange={handleChange} placeholder="Eg: http://example.com"></Input>
                twitter link
                <Input name="name" onChange={handleChange} placeholder="Eg: https://twitter.com/username"></Input>
                Stackoverflow link
                <Input name="name" onChange={handleChange} placeholder="Eg: https://stackoverflow.com/users/123456/username"></Input>
                Linkedin
                <Input name="name" onChange={handleChange} placeholder="Eg: https://www.linkedin.com/in/username/"></Input>
                Github
                <Input name="name" onChange={handleChange} placeholder="Eg: https://github.com/userame"></Input>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                                <h5>Work</h5>
                                <Input name="name" onChange={handleChange} placeholder="Add new work place"></Input>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                <h5>Education</h5>
                <Input name="name" onChange={handleChange} placeholder="Add new education"></Input>
                </CardBody>
            </Card>
        </>
    )
}

export default UserSettings