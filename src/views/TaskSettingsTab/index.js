import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SENDER from '../../utils/SENDER'
import Asignees from "./Asignees";
import Button from "react-bootstrap/Button";

const TaskSettingsTab = props => {

  function deleteTask(){
    if(window.confirm("Do you really want to delete this task?")){
      SENDER.delete('/tasks/'+props.taskId).then(res => 
        alert(res.status)
        
        ).catch(err => console.log(err))
    }
  }
  return (
    <>
      <Row>
        <Col sm={6}>

        </Col>

        <Col sm={6}>
         
        </Col>
      </Row>

      <h6 style={{ color: "red" }}>Delete task</h6>
      <p>
        All documents,discussions and related data will be permanently deleted.
      </p>
      <Button onClick={deleteTask}>Del</Button>
    </>
  );
};

export default TaskSettingsTab;
