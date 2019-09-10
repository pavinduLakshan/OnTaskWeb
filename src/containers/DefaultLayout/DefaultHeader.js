import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import NewGroupForm from "../../components/NewGroupForm";
import pusher from "../../utils/PusherObject";
import UserNotification from "./UserNotification";
import SENDER from "../../utils/SENDER";
import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from "reactstrap";
import PropTypes from "prop-types";

import { AppAsideToggler, AppNavbarBrand } from "@coreui/react";
import logo from "../../assets/img/brand/logo.svg";
import sygnet from "../../assets/img/brand/sygnet.svg";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    var channel = pusher.subscribe("user_" + localStorage.getItem("id"));
    channel.bind("group_assign", this.updateNotifications);
  }

  state = {
    noOfNotis: 0,
    groups: [],
    notifications: [],
    propic: "",
  };

  updateNotifications = data => {
    this.setState(prevState => ({
      noOfNotis: prevState.noOfNotis + 1,
      notifications: [...prevState.notifications, JSON.parse(data)],
    }));
  };

  markNotificationAsSeen(id){
    SENDER.post("/notifications/"+id+"/seen").then(
      res => {
        alert("seen")
        this.setState(prevState => ({
          noOfNotis: prevState.noOfNotis ? prevState.noOfNotis - 1 : prevState.noOfNotis,
          notifications: prevState.notifications.filter( notification => notification.n_id !== id)
        }));
      }
    ).catch(err => alert(err))
  }

  async componentDidMount() {
    await SENDER.get("/" + localStorage.getItem("id") + "/groups")
      .then(res => {
        this.setState({ groups: res.data });
        res.data.map(group => {
          var channel = pusher.subscribe("group_" + group.groupId);
          channel.bind("new_activity", this.updateNotifications);
        });
      })
      .catch(err => {
        console.log(err);
      });

    SENDER.get("/user/" + localStorage.getItem("id") + "/pro-pic").then(res => {
      this.setState({ propic: res.data });
    });

    SENDER.get("/user/" + localStorage.getItem("id") + "/u_notifications")
      .then(res => {
        console.log("notifications:")
        console.log(res.data)
        this.setState({ notifications: res.data,noOfNotis: res.data.length })
      })
      .catch(err => console.log(err));
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 45, alt: "OnTask" }}
          minimized={{
            src: sygnet,
            width: 30,
            height: 30,
            alt: "CoreUI Logo",
          }}
          href="/dashboard"
        />

        <Nav navbar style={{ height: "3vh" }}>
          <UncontrolledDropdown
            nav
            direction="down"
            style={{
              display: this.state.groups.length > 0 ? "block" : "none",
              marginLeft: "5%",
            }}
          >
            <DropdownToggle caret nav>
              Groups
            </DropdownToggle>
            <DropdownMenu left="true">
              {this.state.groups.map(group => {
                return (
                  <DropdownItem key={group.groupId}>
                    <a
                      href={"/groups/" + group.groupId}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {group.name}
                    </a>
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Nav className="ml-auto" navbar style={{ height: "3vh" }}>
          <NewGroupForm />
          <NavItem>
            <UncontrolledDropdown nav direction="down">
              <DropdownToggle nav>
                <i className="icon-bell" size="10" />
                <Badge pill color="danger">
                  {this.state.noOfNotis}
                </Badge>
              </DropdownToggle>
              <DropdownMenu right={true}>
                {this.state.notifications.map(notification => {
                  return (
                    <UserNotification
                      id={notification.n_id}
                      markAsSeen={() =>this.markNotificationAsSeen(notification.n_id)}
                      description={notification.description || notification.activity.description}
                      createdAt={notification.createdAt || notification.activity.createdAt}
                    />
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              {this.state.propic ? (
                <img
                  src={this.state.propic}
                  className="img-avatar"
                  width="30"
                  height="30"
                  alt=""
                />
              ) : (
                <i className="fa fa-user" style={{ fontSize: "25px" }} />
              )}
            </DropdownToggle>
            <DropdownMenu right={true}>
              <DropdownItem>
                <i className="fa fa-dashboard" />
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Dashboard
                </Link>{" "}
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-user" />
                <Link
                  to={"/users/" + localStorage.getItem("id")}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Profile
                </Link>{" "}
              </DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
