import React, { useState, useEffect, useRef } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Modal from "react-bootstrap/Modal";
import { Checklist } from "styled-icons/octicons/Checklist";
import SENDER from "../../utils/SENDER";
import { Clock } from "styled-icons/feather/Clock";
import "./taskviewer.css";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";

const TaskViewer = props => {
  const [show, setShow] = useState(true);
  const [p, setP] = useState(true);
  const [description, setDescription] = useState("");
  const [task, setTask] = useState([]);
  const [resources, setResources] = useState([]);
  const [desEditable, setDesEditable] = useState(false);
  const desc = useRef(null);

  function handleDesChange() {
    setDesEditable(false);
    SENDER.post("/tasks/edit-desc", {
      taskId: props.id,
      description: desc.current.innerText,
    })
      .then(res => alert("Description Updated"))
      .catch(err => alert("Error"));
  }

  useEffect(() => {
    if (props.id && p) {
      setShow(true);
    } else {
      setShow(false);
      if (!p) {
        window.location.reload();
      }
    }

    if (props.id) {
      console.log(props.id);
      console.log(props.isAdmin);
      SENDER.get("/tasks/" + props.id)
        .then(res => {
          setTask(res.data);
          setDescription(res.data.description);
        })
        .catch(err => console.log(err));
    }

    SENDER.get("/task_resources/" + props.taskId)
      .then(res => setResources(res.data))
      .catch(err => console.log(err));
  });

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={() => setP(false)}
        backdrop="static"
        dialogClassName="task_viewer_modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {props.name} <h5 style={{ color: "gray" }}>in {props.group}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{}}>
          <Row style={{ marginTop: "0.5%" }}>
            <Col xs="12" sm="6" lg="4">
              <Card>
                <CardHeader>
                  <b>Asignees</b>
                  <div className="card-header-actions">
                    <i
                      style={{
                        cursor: "pointer",
                        display: props.isAdmin ? "block" : "none",
                      }}
                      className="fa fa-plus float-right"
                    />
                  </div>
                </CardHeader>
                <CardBody />
              </Card>
              <Card>
                <CardHeader>
                  <b>Description</b>
                  <div className="card-header-actions">
                    <i
                      className="fa fa-edit float-right"
                      onClick={() => setDesEditable(true)}
                      title="Edit description"
                      style={{
                        cursor: "pointer",
                        display: !props.isAdmin ? "none" : "block",
                      }}
                    />
                  </div>
                </CardHeader>
                <CardBody>
                  <div
                    ref={desc}
                    contentEditable={desEditable}
                    style={{ 
                      backgroundColor: desEditable ? "yellow" : "none",
                      padding: "5%",
                      textAlign: "justify",
                      borderRadius: "5px" }}
                    onBlur={handleDesChange}
                  >
                    {description}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" sm="6" lg="5">
              <Card>
                <CardHeader>
                  <i className="icon-speech" />
                  <b>Discussion</b>
                </CardHeader>
                <CardBody />
              </Card>
            </Col>
            <Col xs="12" sm="12" lg="3">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Clock size={20} />
                <h6 style={{ marginLeft: "1%" }}>
                  <b>Due </b> {task.dueDate}
                </h6>
              </div>
              <Card>
                <CardHeader>
                  <Checklist size={20} />
                  <b>Subtasks</b>
                  <div className="card-header-actions">
                    <i
                      style={{
                        cursor: "pointer",
                        display: props.isAdmin ? "block" : "none",
                      }}
                      className="fa fa-plus float-right"
                    />
                  </div>
                </CardHeader>
                <CardBody />
              </Card>
              <Card>
                <CardHeader>
                  <b>Resources</b>
                  <div className="card-header-actions">
                    <i
                      style={{ cursor: "pointer" }}
                      className="fa fa-plus float-right"
                    />
                  </div>
                </CardHeader>
                <CardBody />
              </Card>
            </Col>
          </Row>
          {/* <Tabs defaultActiveKey="overview">
            <Tab eventKey="overview" title="Overview">
              <TaskOverviewTab taskId={props.id} isAdmin={props.isAdmin} />
            </Tab>
            <Tab eventKey="resources" title="Resources">
              <TaskResourceTab taskId={props.id} isAdmin={props.isAdmin} />
            </Tab>
            <Tab eventKey="discussion" title="Discussion">
              <TaskDiscussionTab taskId={props.id} isAdmin={props.isAdmin} />
            </Tab>
            <Tab eventKey="settings" title="Settings">
              <TaskSettingsTab taskId={props.id} isAdmin={props.isAdmin} />
            </Tab>
          </Tabs> */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TaskViewer;
