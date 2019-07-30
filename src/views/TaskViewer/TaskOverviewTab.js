import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SENDER from "../../utils/SENDER";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { SearchAlt2 } from "styled-icons/boxicons-regular/SearchAlt2";
import { Clock } from "styled-icons/feather/Clock";
import { Checklist } from "styled-icons/octicons/Checklist";
import { AddBox } from "styled-icons/material/AddBox";
import { Description } from "styled-icons/material/Description";

const TaskOverviewTab = props => {
  const [task, setTask] = useState([]);
  const [isVisible,setIsVisible] = useState(false)

  useEffect(() => {
    if (props.taskId) {
      console.log(props.taskId);
      console.log(props.isAdmin);
      SENDER.get("/tasks/" + props.taskId)
        .then(res => {
          setTask(res.data);
        })
        .catch(err => console.log(err));
    }
  }, [props.taskId]);

  return (
    <Row style={{marginTop: "0.5%"}}>
      <Col sm={6}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Description size={20} />
          <h6>
            <b>Description</b>
          </h6>
        </div>
        <div style={{ textAlign: "justify",overflowX: "auto" }}>{task.description}</div>
      </Col>
      <Col sm={2}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h6>
            <b>Assignees</b>
          </h6>
          <AddBox
            size={20}
            style={{ marginTop: "0px", cursor: "pointer",display: props.isAdmin ? "block":"none" }}
            alt="add asignee"
            title="add asignee"
            onClick={() => {
              if(isVisible){
                setIsVisible(false)
              }
              else{
                setIsVisible(true)
              }
            }}
          />
        </div>
        <div style={{display: isVisible ? "block":"none"}}>
        <InputGroup style={{ width: "100%" }} style={{height: "6vh"}}>
                <Form.Control
                  type="text"
                  placeholder="Search Members"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <InputGroup.Append style={{ cursor: "pointer" }}>
                  <InputGroup.Text id="inputGroupPrepend">
                    <SearchAlt2 size={15} />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
        </div>
      </Col>
      <Col sm={4}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Clock size={20} />
          <h6 style={{ marginLeft: "1%" }}>
            <b>Due </b> {task.dueDate}
          </h6>
        </div>
        <div style={{ display: "flex", flexDirection: "row",alignItems: "center" }}>
          <Checklist size={20} />
          <h6 style={{ margin: "1%" }}>
            <b>Subtasks</b> 
          </h6>
          <a href="#" style={{display: props.isAdmin ? "block" : "none"}}>add subtask</a>
        </div>
      </Col>
    </Row>
  );
};

export default TaskOverviewTab;
