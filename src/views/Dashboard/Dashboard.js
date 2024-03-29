import React, { Component } from "react";
import RequireAuth from "../../utils/PrivateRoute";
import TaskItem from "../../components/TaskItem";
import pusher from "../../utils/PusherObject";
import UserNotification from '../../containers/DefaultLayout/UserNotification'
import SENDER from "../../utils/SENDER";
import TaskViewer from "../TaskViewer";
import {
  Card,
  CardBody,
  Col,
  Input,
  Row,
} from "reactstrap";
import GroupItem from "./components/GroupItem";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      groups: [],
      assignedTasks: [],
      feedItems:[],
      selectedTask: null,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  updateFeed = data => {
    this.setState(prevState => ({
      feedItems: [...prevState.feedItems, JSON.parse(data)],
    }));
  };

  async componentDidMount() {
    SENDER.get("/user/" + localStorage.getItem("id") + "/tasks")
    .then(res => {
      this.setState({ assignedTasks: res.data });
    })
    .catch(err => console.log(err));

    await SENDER.get("/" + localStorage.getItem("id") + "/groups")
      .then(res => {
        this.setState({ groups: res.data });
        res.data.map(group => {
          var channel = pusher.subscribe("group_" + group.groupId);
          channel.bind("new_activity", this.updateFeed);
        });
      })
      .catch(err => {
        console.log(err);
      });

    SENDER.get("/user/" + localStorage.getItem("id") + "/u_notifications")
      .then(res => {
        this.setState({ feedItems: res.data })
      })
      .catch(err => console.log(err));
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  getClickedTask = task => {
    this.setState({ selectedTask: task });
  };

  render() {
    return (
      <div className="animated fadeIn" style={{ marginTop: "0.5%" }}>
        <Row>
          <Col xs="12" sm="12" lg="3" style={{}}>
            <Card>
              <CardBody style={{ paddingTop: "1%" }}>
                <h6>My Tasks</h6>
                {this.state.assignedTasks.length > 0 ? this.state.assignedTasks.map(task => {
                  return (
                    <TaskItem
                      style={{
                        cursor: "pointer",
                        
                        margin: 0,
                      }}
                      key={task.id}
                      sendTask={this.getClickedTask}
                      task={task}
                    />
                  );
                }): "No tasks assigned"}
                <TaskViewer
                  name={
                    this.state.selectedTask ? this.state.selectedTask.name : ""
                  }
                  taskId={this.state.selectedTask ? this.state.selectedTask.id : ""}
                  isAdmin={this.state.isAdmin}
                />
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="12" lg="5" style={{}}>
            <div
              className="bg-success"
              style={{
                paddingTop: "6%",
                borderRadius: "5px",
                paddingBottom: "0.5%",
                marginBottom: "1%"
              }}
            >
              <div style={{ marginLeft: "1%" }}>
                <h4>My Day</h4>
                <h6>{new Date().toJSON().slice(0, 10)}</h6>
              </div>
            </div>
            {this.state.feedItems.map( feedItem => { 
               return (
                 <Card style={{marginBottom: 0}}>
                   <CardBody style={{padding: "0.5%",paddingBottom: "2%"}}>
                <UserNotification
              id={feedItem.id }
              key={feedItem.id }
              markAsSeen={() =>this.markNotificationAsSeen(feedItem.id)}
              description={feedItem.description || feedItem.activity.description}
              createdAt={feedItem.createdAt || feedItem.activity.createdAt}
            />
              </CardBody>
                 </Card>
               )
              })}
          </Col>
          <Col xs="12" sm="12" lg="4">
            <Card
              style={{
                padding: 0
              }}
            >
              <CardBody style={{ paddingTop: "1%" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "1%",
                    alignItems: "center",
                  }}
                >
                  <h6>My Groups</h6>
                  <div style={{ flexGrow: 1 }} />
                  <Input
                    style={{ width: "50%" }}
                    type="select"
                    name="select"
                    id="exampleSelect"
                  >
                    <option value="">Filter By</option>
                    <option value="">Personal</option>
                    <option value="">Public</option>
                    <option value="">Private</option>
                  </Input>
                </div>
                {this.state.groups.length > 0 ? (
                  this.state.groups.map(group => {
                    return (
                      <GroupItem
                        key={group.groupId}
                        groupId={group.groupId}
                        groupName={group.name}
                        last_activity={group.lastActivity}
                      />
                    );
                  })
                ) : (
                  <p>No groups</p>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RequireAuth(Dashboard);
