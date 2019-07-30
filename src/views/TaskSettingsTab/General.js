import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import useForm from "../../utils/useForm";

const GeneralSettings = () => {
    const { values, handleChange, handleSubmit } = useForm(updateTaskInfo);

    function updateTaskInfo(){
        console.log(values)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="taskName">
              <Form.Control type="text" name="name" placeholder="Task Name" onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" onChange={handleChange} as="textarea" rows={4}/>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Due date</Form.Label>
              <Form.Control type="date" name="dueDate" onChange={handleChange} />
            </Form.Group>
        
          <Button variant="success" type="submit">
              Update Task
            </Button>
        </Form>
    )
}

export default GeneralSettings