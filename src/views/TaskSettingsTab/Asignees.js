import React from 'react'
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// import { SearchAlt2 } from "styled-icons/boxicons-regular/SearchAlt2";

const Asignees = () => {
    return (
        <div>
            <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search Group Members by email address"
              aria-describedby="inputGroupPrepend"
              required
            />
            <InputGroup.Append>
              <InputGroup.Text id="inputGroupPrepend">
              {/* <SearchAlt2 size={20} /> */}
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </div>
    )
}

export default Asignees