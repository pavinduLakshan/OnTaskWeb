import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import Pusher from "pusher-js";
import pusher from "../../utils/PusherObject";
import RequireAuth from "../../utils/PrivateRoute";
import GroupHeader from "../../components/GroupHeader";
import TaskItem from "../../components/TaskItem";
import SENDER from "../../utils/SENDER";
import NewTaskForm from "../../components/NewTaskForm";
import MemberItem from "../../components/GroupMemberItem";
import TaskViewer from "../TaskViewer";
import {
  ButtonDropdown,
  Popover,
  PopoverBody,
  PopoverHeader,
  Progress,
  Button,
  ButtonGroup,
  ListGroupItem,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import NewNoticeForm from "../../components/NewNoticeForm";
import NoticeViewer from "../../components/NoticeViewer/NoticeViewer";

const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
const brandWarning = getStyle("--warning");
const brandDanger = getStyle("--danger");

class Group extends Component {
  constructor(props) {
    super(props);
    // Enable pusher logging - don't include this in production

    this.groupDesc = React.createRef();

    var channel = pusher.subscribe("group_" + this.props.match.params.gid);
    channel.bind("new_task", this.hha);
  }

  hha = data => {
    console.log("Evt data: ");
    console.log(data);
  };

  handleDesChange = () => {
    this.setState({ desEditable: false });
    SENDER.post("/groups/" + this.props.match.params.gid + "/edit-desc", null, {
      params: {
        editedBy: localStorage.getItem('id'),
        desc: this.groupDesc.current.innerText,
      },
    })
      .then(
        res => {}
        //alert("Description Updated")
      )
      .catch(err => alert("Error"));
  };

  state = {
    trig: false,
    inviteLink: "",
    groupData: [],
    announcements: [],
    notices: [],
    groupActivities: [],
    tasks: [],
    admins: [],
    members: [],
    taskCount: 0,
    isAdmin: false,
    selectedNotice: null,
    selectedTask: null,
    popoverOpen: false,
    memberCount: 0,
    percentage: 0,
    description: "",
    desEditable: false,
  };

  componentDidMount() {
    SENDER.get('/exists/group/'+this.props.match.params.gid).then(res => {
      if(res.status > 400){
        this.props.history.push('/')
      }
    })
    const params = new URLSearchParams(this.props.location.search);
    const itoken = params.get("itoken");

    if (itoken) {
      SENDER.post("/member/" + itoken,null,{
        params: {
          user_id: localStorage.getItem('id')
        }
      })
        .then(res => {
          alert("You have been added to group");
          this.setState(prevState => ({ trig:  !prevState.trig}));
        })
        .catch(err => console.log(err));
    }

    SENDER.get("/groups/" + this.props.match.params.gid)
      .then(res => {
        this.setState({
          groupData: res.data,
          description: res.data.description,
        });
      })
      .catch(err => console.log(err));

    // SENDER.get("/groups/" + this.props.match.params.gid)
    //   .then(res => this.setState({ groupActivities: res.data }))
    //   .catch(err => console.log(err));

      SENDER.get("/groups/" + this.props.match.params.gid+"/activity")
      .then(res => this.setState({ groupActivities: res.data }))
      .catch(err => console.log(err));

    SENDER.get(
      "/member/" +
        this.props.match.params.gid +
        "/is-admin/" +
        localStorage.getItem("id")
    )
      .then(res => {
        console.log("admin " + res.data);
        this.setState({ isAdmin: res.data });
      })
      .catch(err => console.log(err));

    SENDER.get("/" + this.props.match.params.gid + "/tasks")
      .then(res => {
        console.log("group tasks");
        console.log(res.data);
        this.setState({ tasks: res.data, TaskCount: res.data.length });
        //props.sendTaskCount(res.data.length);
      })
      .catch(err => console.log(err));

    SENDER.get("/notices/group/" + this.props.match.params.gid)
      .then(res => {
        console.log(res.data);
        this.setState({ notices: res.data });
      })
      .catch(err => console.log(err));

    SENDER.get("/member/" + this.props.match.params.gid)
      .then(res => {
        console.log(res.data);
        this.setState({ memberCount: res.data.length });
        const admins = res.data.filter(member => member.role == "admin");
        const members = res.data.filter(member => member.role == "member");
        this.setState({ admins: admins });
        this.setState({ members: members });
      })
      .catch(err => console.log(err));
  }

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  };

  getClickedTask = task => {
    this.setState({ selectedTask: task });
  };

  updateTaskList = () => {
    SENDER.get("/" + this.props.match.params.gid + "/tasks")
    .then(res => {
      console.log("group tasks");
      console.log(res.data);
      this.setState({ tasks: res.data, TaskCount: res.data.length });
      //props.sendTaskCount(res.data.length);
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div style={{}}>
        <GroupHeader
          name={this.state.groupData.name}
          groupId={this.props.match.params.gid}
        />
        <Row style={{ marginTop: "0.5%" }}>
          <Col xs="12" sm="6" lg="3" style={{  }}>
            <Card className="border-light">
              <CardHeader>
                <b>Tasks</b>
                <div className="card-header-actions">
                  <NewTaskForm
                    groupId={this.props.match.params.gid}
                    onAdd={this.updateTaskList}
                    isAdmin={this.state.isAdmin}
                  />
                </div>
              </CardHeader>
              <CardBody style={{ backgroundColor: "#D6E0E3", padding: 0 }}>
                {this.state.tasks.length > 0 ? (
                  this.state.tasks.map(task => {
                    return (
                      <TaskItem
                        style={{
                          cursor: "pointer",
                          padding: "2.5%",
                          margin: 0,
                        }}
                        key={task.id}
                        task={task}
                        sendTask={this.getClickedTask}
                      />
                    );
                  })
                ) : (
                  <div className="text-center" style={{display: this.state.isAdmin ? "block" : "none"}}>
                    No tasks. Add some tasks from top right + sign in this
                    widget
                  </div>
                )}
              </CardBody>
              <TaskViewer
                name={
                  this.state.selectedTask ? this.state.selectedTask.name : ""
                }
                groupId={this.props.match.params.gid}
                id={this.state.selectedTask ? this.state.selectedTask.id : ""}
                isAdmin={this.state.isAdmin}
                group={this.state.groupData.name}
              />
            </Card>
          </Col>
          
          <Col xs="12" sm="6" lg="4" style={{}}>
            

            <Card style={{ margin: 0 }}>
              <CardHeader>
                <b>Group Activity</b>
                <div className="card-header-actions" />
              </CardHeader>
              <CardBody style={{padding: 0}}>
                {this.state.groupActivities.length > 0 ? this.state.groupActivities.map(activity => (
                  <ListGroupItem
                    action
                    style={{
                      padding: "2%",
                      //paddingLeft: "1%",
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    key={activity.id}
                    className="list-group-item-accent-warning"
                  >
                    <div style={{ marginLeft: "1%" }}>{activity.description} </div>
                  </ListGroupItem>
                )):
                <></>}
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3" style={{ paddingLeft: 0 }}>
          <Card>
              <CardBody style={{ display: "flex", flexDirection: "column" }}>
                <h5>{this.state.percentage}% completed</h5>
                <Progress
                  className="progress-xs mt-2"
                  color="success"
                  value={this.state.percentage}
                />
              </CardBody>
            </Card>
            <Card style={{marginBottom: 0,marginTop: "1%",borderBottom: 0}}>
              <CardHeader>
                <b>About</b>
                <div className="card-header-actions">
                  <i
                    className="fa fa-edit float-right"
                    onClick={() => this.setState({ desEditable: true })}
                    style={{
                      display: this.state.isAdmin ? "block" : "none",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </CardHeader>
              <CardBody>
                <div
                  ref={this.groupDesc}
                  contentEditable={this.state.desEditable}
                  style={{
                    border: this.state.desEditable ? "1px solid gray" : "none",
                    padding: this.state.desEditable ? "5%" : 0,
                    textAlign: "justify",
                    borderRadius: "5px",
                  }}
                >
                  {this.state.description}
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    style={{
                      marginTop: "1%",
                      display: this.state.desEditable ? "block" : "none",
                    }}
                    onClick={this.handleDesChange}
                    color="success"
                  >
                    update
                  </Button>
                  <p
                    style={{
                      margin: "3% 0% 0% 1%",
                      color: "red",
                      display: this.state.desEditable ? "block" : "none",
                      cursor: "pointer",
                    }}
                    onClick={() => this.setState({ desEditable: false })}
                  >
                    Cancel
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card className="card-accent-secondary" style={{}}>
              <CardHeader>
                <b>Announcements</b>
                <div className="card-header-actions">
                  <NewNoticeForm
                    groupId={this.props.match.params.gid}
                    isAdmin={this.state.isAdmin}
                  />
                </div>
              </CardHeader>
              <CardBody style={{ padding: 0 }}>
                {this.state.notices.map(notice => {
                  return (
                    <Card
                      style={{ margin: 0, cursor: "pointer" }}
                      className="border-light"
                      onClick={() =>
                        this.setState({ selectedNotice: notice.id })
                      }
                      key={notice.id}
                    >
                      <CardBody
                        style={{
                          padding: "3% 0% 3% 2%",
                          flex: 1,
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <h6 style={{ margin: 0 }}>{notice.title}</h6>
                        <i className="fa fa-calendar" />{" "}
                        <b>{notice.date.slice(0, 10)}</b>
                        <i
                          className="fa fa-user"
                          style={{ marginLeft: "5%" }}
                        />{" "}
                        <b>{notice.createdBy}</b>
                      </CardBody>
                    </Card>
                  );
                })}
                <NoticeViewer
                  id={
                    this.state.selectedNotice ? this.state.selectedNotice : ""
                  }
                  groupId={this.props.match.params.gid}
                />
              </CardBody>
            </Card>
          </Col>
          
          <Col xs="12" sm="6" lg="2" style={{ padding: 0 }}>
            <Card style={{margin: 0,height: "82vh"}}>
              <CardBody style={{ padding: 0 }}>
                <CardHeader>
                  <b>Admins</b>
                </CardHeader>
                {this.state.admins.map(admin => {
                  const lname = admin.lname ? admin.lname : "";
                  return (
                    <MemberItem
                      id={admin.userId}
                      key={admin.fname}
                      img={admin.propicURL}
                      name={admin.fname + " " + lname}
                    />
                  );
                })}
                <CardHeader>
                  <b>Members</b>
                </CardHeader>
                {this.state.members.length > 0 ? (
                  this.state.members.map(member => {
                    const lname = member.lname ? member.lname : "";
                    return (
                      <MemberItem
                        id={member.userId}
                        key={member.fname}
                        img={member.propicURL}
                        name={member.fname + " " + lname}
                      />
                    );
                  })
                ) : (
                  <ListGroupItem>
                                      <div className="text-center">
                                      No members.Invite someone to join the group
                  </div>
                  </ListGroupItem>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RequireAuth(Group);
