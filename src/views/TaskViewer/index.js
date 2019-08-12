import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { withRouter} from 'react-router-dom'
import TaskAsignee from "../../components/TaskAsignee";
import TaskDiscussion from "../../components/TaskDiscussion";
import SubTasks from "../../components/SubTasks";
import SENDER from "../../utils/SENDER";
import { Clock } from "styled-icons/feather/Clock";
import TaskResItem from "../../components/TaskResItem";
import { File } from "styled-icons/boxicons-regular/File";
import { Description } from "styled-icons/material/Description";
import "./taskviewer.css";
import { Row, Col, Card, CardBody, CardHeader,Button,Progress } from "reactstrap";

const TaskViewer = props => {
  const [show, setShow] = useState(false);
  const [wasOpened, setWasOpened] = useState(false);
  const [percentage,setPercentage] = useState(0)
  const TaskResUploader = useRef(null);
  const [p, setP] = useState(true);
  const [description, setDescription] = useState("");
  const [task, setTask] = useState([]);
  const [resources, setResources] = useState([]);
  const [desEditable, setDesEditable] = useState(false);
  const desc = useRef(null);

  const showOpenFileDlg = () => {
    TaskResUploader.current.click();
  };

  function fileChangedHandler(event) {
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("name", event.target.files[0].name);

    SENDER.post(
      "/task_resources/" +
        parseInt(localStorage.getItem("id")) +
        "/" +
        parseInt(props.id),
      formData
    )
      .then(res => {
        if (res.status === 200) {
          alert("uploaded successfully");
          setP(false);
        }
      })
      .catch(err => alert("err"));
  }

  function handleDesChange() {
    setDesEditable(false);
    SENDER.post("/tasks/edit-desc", {
      taskId: props.id,
      description: desc.current.innerText,
    })
      .then(res => alert("Description Updated"))
      .catch(err => alert("Error"));
  }

  const closeModal = () => {
    setShow(false);
    //window.location.reload();
    props.history.push('/groups/'+props.groupId)
    console.log(wasOpened);
  };

  const getSubTaskStats = (completed,total) => {
    if (total !== 0){
      const value = ( completed / total ) * 100
      setPercentage(value)
    }
  }

  useEffect(() => {
    if (props.id) {
      console.log("id tv: " + props.id);
      setShow(true);
    }

    SENDER.get("/tasks/" + props.id)
      .then(res => {
        setTask(res.data);
        setDescription(res.data.description);
      })
      .catch(err => console.log(err));

    SENDER.get("/task_resources/" + props.id)
      .then(res => {
        console.log(res.data);
        setResources(res.data);
      })
      .catch(err => console.log(err));
    
    
  }, [props.id]);

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={closeModal}
        style={{ height: "100vh" }}
        backdrop="static"
        dialogClassName="task_viewer_modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {props.name}{" "}
            <span style={{ color: "gray", fontSize: "0.8em" }}>
              in {props.group}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minHeight: "60vh" }}>
          <Row style={{ marginTop: "0.5%" }}>
            <Col xs="12" sm="12" lg="3">
              <Card>
                <CardHeader>
                  <Description size={20} />
                  <b>Description</b>
                  <div className="card-header-actions">
                    <i
                      className="fa fa-edit float-right"
                      onClick={() => setDesEditable(true)}
                      title="Edit description"
                      style={{
                        cursor: "pointer",
                        display: props.isAdmin ? "block" : "none",
                      }}
                    />
                  </div>
                </CardHeader>
                <CardBody style={{ padding: "1%" }}>
                  <div
                    ref={desc}
                    contentEditable={desEditable}
                    style={{
                      border: desEditable ? "1px solid gray" : "none",
                      padding: "5%",
                      textAlign: "justify",
                      borderRadius: "5px",
                    }}
                  >
                    {description}
                  </div>
                  <div style={{display: "flex",flexDirection: "row"}}>
                  <Button style={{marginTop: "1%",display: desEditable ? "block" : "none"}} onClick={handleDesChange} color="success">update</Button>
                  <p style={{margin: "3% 0% 0% 1%",color: "red",display: desEditable ? "block" : "none",cursor: "pointer"}} onClick={() => setDesEditable(false)}>Cancel</p>
                  </div>

                </CardBody>
              </Card>
              <TaskAsignee isAdmin={props.isAdmin} taskId={props.id} />
            </Col>
            <Col xs="12" sm="12" lg="5" style={{ padding: 0 }}>
              <Card>
                <CardBody style={{display: "flex",flexDirection: "column"}}>
                <h5>{percentage}% completed</h5>
                <Progress className="progress-xs mt-2" color="success" value={percentage} />
                </CardBody>
              </Card>
              <TaskDiscussion taskId={props.id} />
            </Col>
            <Col xs="12" sm="12" lg="4">
              <Card>
                <CardBody>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Clock size={20} />
                    <h6 style={{ marginLeft: "1%" }}>
                      <b>Due </b> {task.dueDate}
                    </h6>
                  </div>
                </CardBody>
              </Card>
              <SubTasks isAdmin={props.isAdmin} taskId={props.id} sendSubTaskStats={getSubTaskStats}/>
              <Card>
                <CardHeader>
                  <File size={20} />
                  <b>Resources</b>
                  <div className="card-header-actions">
                    <i
                      style={{ cursor: "pointer" }}
                      className="fa fa-plus float-right"
                      onClick={showOpenFileDlg}
                    />
                    <input
                      ref={TaskResUploader}
                      onChange={fileChangedHandler}
                      type="file"
                      style={{ display: "none" }}
                    />
                  </div>
                </CardHeader>
                <CardBody style={{ padding: 0 }}>
                  {resources.map(resource => {
                    return (
                      <TaskResItem
                        src={resource.uri}
                        name={resource.uri.split("/")[5].replace(/%20/g, "_")}
                        addedBy={resource.username}
                        cdate={resource.addedOn.slice(0, 10)}
                      />
                    );
                  })}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default withRouter(TaskViewer)
