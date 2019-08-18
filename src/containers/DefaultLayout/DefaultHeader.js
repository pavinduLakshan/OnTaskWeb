import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import NewGroupForm from "../../components/NewGroupForm";
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

import {
  AppAsideToggler,
  AppNavbarBrand,
} from "@coreui/react";
import logo from "../../assets/img/brand/logo.PNG";
import sygnet from "../../assets/img/brand/sygnet.svg";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  state = {
    noOfNotis: 0,
    groups: [],
    propic: "",
  };

  async componentDidMount() {
    await SENDER.get("/" + localStorage.getItem("id") + "/groups")
      .then(res => this.setState({ groups: res.data }))
      .catch(err => {
        console.log(err);
        //alert("Error");
      });

    SENDER.get("/user/" + localStorage.getItem("id") + "/pro-pic").then(res => {
      this.setState({ propic: res.data });
    });
  }

  // componentDidUpdate(prevProps){
  //   if(prevProps !== this.props){
  //     SENDER.get("/" + localStorage.getItem("id") + "/groups")
  //       .then(res => this.setState({groups: res.data}))
  //       .catch(err => {
  //         console.log(err);
  //         alert("Error haha");
  //       });

  //       SENDER.get("/user/" + localStorage.getItem("id") + "/pro-pic").then(res => {
  //         this.setState({propic: res.data});
  //       });
  //   }
  // }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        {/* <NavLink to=> */}
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
        {/* </NavLink> */}

        <Nav className="d-md-down-none" navbar>
          <UncontrolledDropdown nav direction="down" style={{display: this.state.groups.length > 0 ? "block" : "none"}}>
            <DropdownToggle caret nav>
              Groups
              {/* <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
            </DropdownToggle>
            <DropdownMenu left="true">
              { this.state.groups.map(group => {
                // return   <DropdownItem  key={group.groupId} className="text-center"><Link to={"/groups/"+group.groupId}><strong>{group.name}</strong></Link></DropdownItem>
                return (
                  <DropdownItem key={group.groupId}>
                    <a
                      href={"/groups/" + group.groupId}
                      style={{ textDecoration: "none",color: "black" }}
                    >
                      {group.name}
                    </a>
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NewGroupForm />
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link">
              <i className="icon-bell" />
              <Badge pill color="danger">
                {this.state.noOfNotis}
              </Badge>
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              {this.state.propic ? <img
                src={this.state.propic}
                className="img-avatar"
                width="30"
                height="30"
                alt=""
              />: <i className="fa fa-user" style={{fontSize: "25px"}}></i>}
            </DropdownToggle>
            <DropdownMenu right={true}>
            <DropdownItem>
                <i className="fa fa-dashboard" />
                <Link to={"/"} style={{textDecoration: "none",color: "black"}}>Dashboard</Link>{" "}
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-user" />
                <Link to={"/users/"+localStorage.getItem('id')} style={{textDecoration: "none",color: "black"}}>Profile</Link>{" "}
              </DropdownItem>
              {/* <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem> */}
              {/* <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
              <DropdownItem onClick={e => this.props.onLogout(e)}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        <AppAsideToggler className="d-lg-none" mobile />
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
