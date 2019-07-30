import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useForm from "../../utils/useForm";
import { withRouter } from "react-router-dom";
// import { SearchAlt2 } from "styled-icons/boxicons-regular/SearchAlt2";
import InputGroup from "react-bootstrap/InputGroup"
import SENDER from "../../utils/SENDER";

const GroupForm = props => {
  const { values, handleChange, handleSubmit } = useForm(createNewGroup);
  const [NOfChars, setNOfChars] = useState(160);

  function createNewGroup() {
    console.log(values);
    SENDER.post("/groups", {
      userId: localStorage.getItem("id"),
      name: values.name,
      description: values.description,
    })
      .then(res => {
        if (res.status === 200) {
          alert("New group was created successfully");
        }
      })
      .catch(err => {
        alert("There was an error.Please try again")
        console.log(err)
      });
  }

  const handleDesChange = e => {
    if (e.target.value.length === 160) {
      e.preventDefault();
    }
    setNOfChars(160 - e.target.value.length);
  };

  return (
    <>
      <Row>
        <Col sm={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <label>Name</label>
              <Form.Control required name="name" onChange={handleChange} />
            </Form.Group>

            <Form.Group>
              <label>Description</label>
              <Form.Control
                as="textarea"
                maxLength="160"
                name="description"
                rows={5}
                onKeyPress={handleDesChange}
                onChange={handleChange}
              />
              <Form.Text>{NOfChars}/160 characters left</Form.Text>
            </Form.Group>
          </Form>
        </Col>
        <Col sm={6}>
          <p style={{marginBottom: "2.5%"}}>
            <b>Add members</b>
          </p>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search"
              aria-describedby="inputGroupPrepend"
              required
            />
            <InputGroup.Append style={{cursor: "pointer"}}>
              <InputGroup.Text id="inputGroupPrepend">
              {/* <SearchAlt2 size={20} /> */}
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
      <Modal.Footer>
        <a
          href=""
          style={{ textDecoration: "none", color: "red" }}
          onClick={props.handleClose}
        >
          Cancel
        </a>
        <Button variant="success" onClick={createNewGroup}>
          Create Group
        </Button>
      </Modal.Footer>
    </>
  );
};

export default withRouter(GroupForm);
