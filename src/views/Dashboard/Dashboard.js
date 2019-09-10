import React, { Component, lazy, Suspense } from "react";
import { Bar, Line } from "react-chartjs-2";
import RequireAuth from "../../utils/PrivateRoute";
import TaskItem from "../../components/TaskItem";
import SENDER from "../../utils/SENDER";
import TaskViewer from "../TaskViewer";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Progress,
  Row,
  Table,
} from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import GroupItem from "./GroupItem";

const Widget03 = lazy(() => import("../../views/Widgets/Widget03"));

const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
const brandWarning = getStyle("--warning");
const brandDanger = getStyle("--danger");

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      groups: [],
      assignedTasks: [],
      selectedTask: null,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  componentDidMount() {
    SENDER.get("/user/" + localStorage.getItem("id") + "/tasks")
      .then(res => {
        console.log("my tasks: ");
        console.log(res.data);
        this.setState({ assignedTasks: res.data });
      })
      .catch(err => console.log(err));

    SENDER.get("/" + localStorage.getItem("id") + "/groups")
      .then(res => this.setState({ groups: res.data }))
      .catch(err => {
        console.log(err);
      });
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
                <h5>My Tasks</h5>
                {this.state.assignedTasks.map(task => {
                  return (
                    <TaskItem
                      style={{
                        cursor: "pointer",
                        padding: "2.5%",
                        margin: 0,
                      }}
                      key={task.id}
                      sendTask={this.getClickedTask}
                      task={task}
                    />
                  );
                })}
                <TaskViewer
                  name={
                    this.state.selectedTask ? this.state.selectedTask.name : ""
                  }
                  //groupId={this.props.match.params.gid}
                  id={this.state.selectedTask ? this.state.selectedTask.id : ""}
                  isAdmin={this.state.isAdmin}
                  //group={this.state.groupData.name}
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
              }}
            >
              <div style={{ marginLeft: "1%" }}>
                <h4>My Day</h4>
                <h6>{new Date().toJSON().slice(0, 10)}</h6>
              </div>
            </div>
            <Card style={{ margin: "1% 0% 1% 0%", height: "10vh" }}>
              He hehe
            </Card>
            <Card style={{ margin: "1% 0% 1% 0%", height: "10vh" }}>
              He hehe
            </Card>
            <Card style={{ margin: "1% 0% 1% 0%", height: "10vh" }}>
              He hehe
            </Card>
            <Card style={{ margin: "1% 0% 1% 0%", height: "10vh" }}>
              He hehe
            </Card>
            <Card style={{ margin: "1% 0% 1% 0%", height: "10vh" }}>
              He hehe
            </Card>
            <Card style={{ margin: "1% 0% 1% 0%", height: "10vh" }}>
              He hehe
            </Card>
            <Card style={{ margin: "1% 0% 1% 0%", height: "10vh" }}>
              He hehe
            </Card>
            <Card style={{ margin: "1% 0% 1% 0%", height: "10vh" }}>
              He hehe
            </Card>
            <Card style={{ margin: "1% 0% 1% 0%", height: "10vh" }}>
              He hehe
            </Card>
            <Card style={{ margin: "1% 0% 1% 0%", height: "10vh" }}>
              He hehe
            </Card>
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
                        id={group.groupId}
                        name={group.name}
                        last_activity="last activity"
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
