import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import RequireAuth from "../../utils/PrivateRoute";
import GroupHeader from '../../components/GroupHeader'
import SENDER from "../../utils/SENDER";
import NewTaskForm from "../../components/NewTaskForm";
import MemberItem from "../../components/GroupMemberItem"
import TaskViewer from '../TaskViewer'
import {
  ButtonDropdown,
  Popover, PopoverBody, PopoverHeader,
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
import NoticeViewer from "../../components/NoticeViewer/NoticeViewer"

const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
const brandWarning = getStyle("--warning");
const brandDanger = getStyle("--danger");

// Card Chart 1
const cardChartData1 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandPrimary,
      borderColor: "rgba(255,255,255,.55)",
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent",
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent",
        },
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      },
    ],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 2
const cardChartData2 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandInfo,
      borderColor: "rgba(255,255,255,.55)",
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent",
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent",
        },
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      },
    ],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,255,255,.2)",
      borderColor: "rgba(255,255,255,.55)",
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

class Group extends Component {
  state = {
    trig: 0,
    groupData: [],
    announcements: [],
    notices: [],
    tasks: [],
    admins: [],
    members: [],
    taskCount: 0,
    isAdmin: false,
    selectedNotice: null,
    selectedTask: null,
    popoverOpen: false,
    memberCount: 0
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search)
    const itoken = params.get("itoken")

    if(itoken){
      SENDER.post("/member/" + itoken)
      .then(res => {
        alert("You have been added to group")
        this.setState({trig: 1})
      })
      .catch(err => console.log(err));
    }

    SENDER.get("/groups/" + this.props.match.params.gid)
      .then(res => {
        this.setState({ groupData: res.data });
      })
      .catch(err => console.log(err));

      SENDER.get("/member/"+this.props.match.params.gid+"/is-admin/"+localStorage.getItem('id'))
      .then(res => {
        console.log("admin "+res.data)
        this.setState({isAdmin:res.data})
      })
      .catch(err => console.log(err));

      SENDER.get("/" + this.props.match.params.gid + "/tasks")
      .then(res => {
        this.setState({tasks: res.data,TaskCount: res.data.length})
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
        this.setState({memberCount: res.data.length})
        const admins = res.data.filter( member => member.role=="admin")
        const members = res.data.filter( member => member.role=="member")
        this.setState({admins: admins})
        this.setState({members: members})
      })
      .catch(err => console.log(err));


  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      SENDER.get("/groups/" + this.props.match.params.gid)
        .then(res => {
          this.setState({ groupData: res.data });
        })
        .catch(err => console.log(err));

        SENDER.get("/" + this.props.match.params.gid + "/tasks")
        .then(res => {
          this.setState({tasks: res.data});
          //props.sendTaskCount(res.data.length);
        })
        .catch(err => console.log(err));

        SENDER.get("/member/"+this.props.match.params.gid+"/is-admin/"+localStorage.getItem('id'))
        .then(res => {
          console.log("admin"+ res.data)
          this.setState({isAdmin:res.data})
        })
        .catch(err => console.log(err));

      SENDER.get("/notices/group/" + this.props.match.params.gid)
        .then(res => {
          console.log(res.data);
          this.setState({ notices: res.data });
        })
        .catch(err => console.log(err));
    }
  }

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  render() {
    return (
      <>
        <GroupHeader 
          name={this.state.groupData.name}
          groupId={this.props.match.params.gid}
        />
        <Row style={{ marginTop: "0.5%" }}>
          <Col xs="12" sm="6" lg="3">
            <Card>
              <CardHeader>
                <b>Tasks</b>
                <div className="card-header-actions">
                  <NewTaskForm groupId={this.props.match.params.gid} isAdmin={this.state.isAdmin}/>
                </div>
              </CardHeader>
              <CardBody style={{padding: 0}}>{
                this.state.tasks.map( task => {
                  return <Card
                  style={{ cursor: "pointer",padding: "2.5%",margin: 0}}
                  key={task.id}
                  onClick={() => this.setState({selectedTask: task})}
                  >
                      {task.name} 
                  </Card>
                })
              }</CardBody>
              <TaskViewer
        name={this.state.selectedTask ? this.state.selectedTask.name : ""}
        id={this.state.selectedTask ? this.state.selectedTask.id : ""}
        isAdmin={this.state.isAdmin}
        group={this.state.groupData.name}
      />
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="6">
            <Row>
              <Col xs="12" sm="6" lg="6">
                <Card className="text-white bg-info">
                  <CardBody className="pb-0 ml-0">
                    <ButtonGroup className="float-right">
                      <ButtonDropdown
                        id="card1"
                        isOpen={this.state.card1}
                        toggle={() => {
                          this.setState({ card1: !this.state.card1 });
                        }}
                      >
                        <DropdownToggle
                          caret
                          className="p-0"
                          color="transparent"
                        >
                          <i className="icon-settings" />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem>Action</DropdownItem>
                          <DropdownItem>Another action</DropdownItem>
                          <DropdownItem disabled>Disabled action</DropdownItem>
                          <DropdownItem>Something else here</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </ButtonGroup>
                    <div className="text-value">65%</div>
                    <div>Completed</div>
                  </CardBody>
                  <div
                    className="chart-wrapper mx-3"
                    style={{ height: "70px" }}
                  >
                    <Line
                      data={cardChartData2}
                      options={cardChartOpts2}
                      height={70}
                    />
                  </div>
                </Card>
              </Col>

              <Col xs="12" sm="6" lg="6" >
                <Card className="text-white bg-primary">
                  <CardBody className="pb-0">
                    <ButtonGroup className="float-right">
                      <Dropdown
                        id="card2"
                        isOpen={this.state.card2}
                        toggle={() => {
                          this.setState({ card2: !this.state.card2 });
                        }}
                      >
                        <DropdownToggle className="p-0" color="transparent">
                          <i className="icon-location-pin" />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem>Action</DropdownItem>
                          <DropdownItem>Another action</DropdownItem>
                          <DropdownItem>Something else here</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </ButtonGroup>
                    <div className="text-value">{this.state.TaskCount}</div>
                    <div>Tasks</div>
                  </CardBody>
                  <div
                    className="chart-wrapper mx-3"
                    style={{ height: "70px" }}
                  >
                    <Line
                      data={cardChartData1}
                      options={cardChartOpts1}
                      height={70}
                    />
                  </div>
                </Card>
              </Col>
              </Row>
              <Row style={{}}>
                <Col  xs="12" sm="12" lg="5" >
                  <Card>
                    <CardHeader>
                      <b>About</b>
                      <div className="card-header-actions">
                        <i className="fa fa-edit float-right" style={{display: this.state.isAdmin ? "block" : "none",cursor: "pointer"}}/>
                      </div>
                    </CardHeader>
                    <CardBody>{this.state.groupData.description}</CardBody>
                  </Card>
                  <Card className="card-accent-secondary">
                    <CardHeader>
                      <b>Announcements</b>
                      <div className="card-header-actions">
                        <NewNoticeForm groupId={this.props.match.params.gid} isAdmin={this.state.isAdmin}/>
                      </div>
                    </CardHeader>
                    <CardBody style={{padding: 0}}>
                      {this.state.notices.reverse().map(notice => {
                        return  <Card 
                        style={{margin: 0,display: "flex",padding: "1%",cursor: "pointer"}}
                        onClick={() => this.setState({selectedNotice: notice.id})}
                        key={notice.id}>
                          <p>{notice.title}</p></Card>
                      })}
                      <NoticeViewer id={this.state.selectedNotice ? this.state.selectedNotice:""}/>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="12" sm="12" lg="7" >
                  <Card className="card-accent-success" style={{margin: 0,width: "inherit"}}>
                    <CardHeader><b>Members</b></CardHeader>
                    <CardBody style={{padding: 0}}>
                    <ListGroupItem action style={{padding: "1%"}} tag="a" href="#">
                      Admins
            </ListGroupItem>
            {this.state.admins.map( admin => {
                        const lname = admin.lname ? admin.lname : ""
                        return <MemberItem 
                          img={admin.propicURL}
                          name={admin.fname+ " "+lname}
                        /> 
                      })}
            <ListGroupItem action style={{padding: "1%"}} tag="a" href="#">
                      Members
            </ListGroupItem>
                      {this.state.members.map( member => {
                        const lname = member.lname ? member.lname : ""
                        return <MemberItem 
                          img={member.propicURL}
                          name={member.fname+ " "+lname}
                        /> 
                      })}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
          </Col>
          <Col xs="12" sm="12" lg="3" style={{ }}>
                <Card style={{minHeight:"80vh"}}>
                    <CardHeader>
                      <b>Recent Activity</b>
                      <div className="card-header-actions">
                        <i className="fa fa-edit float-right" style={{cursor: "pointer"}}/>
                      </div>
                    </CardHeader>
                    <CardBody></CardBody>
                  </Card>
                </Col>
        </Row>
      </>
    );
  }
}

export default RequireAuth(Group);
