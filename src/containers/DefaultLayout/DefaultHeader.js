import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import NewGroupForm from '../../components/NewGroupForm'
import SENDER from '../../utils/SENDER'
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.PNG'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  state = {
    noOfNotis: 0,
    groups: [],
    propic: ""
  }

  async componentDidMount(){
    await SENDER.get("/" + localStorage.getItem("id") + "/groups")
        .then(res => this.setState({groups: res.data}))
        .catch(err => {
          console.log(err);
          //alert("Error");
        });
    
        SENDER.get("/user/" + localStorage.getItem("id") + "/pro-pic").then(res => {
          this.setState({propic: res.data});
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
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 45, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
       
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          {/* <NavItem className="px-3">
            <Link to="/tasks" className="nav-link">Tasks</Link>
          </NavItem> */}
          <UncontrolledDropdown nav direction="bottom">
            <DropdownToggle caret nav>
              Groups
              {/* <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
            </DropdownToggle>
            <DropdownMenu left="true">
            {this.state.groups.map( group => {
              return   <DropdownItem  key={group.groupId} className="text-center"><Link to={"/groups/"+group.groupId}><strong>{group.name}</strong></Link></DropdownItem>
            })}
              
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Nav className="ml-auto" navbar>
        <NewGroupForm />
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">{this.state.noOfNotis}</Badge></NavLink>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={this.state.propic} className="img-avatar" width="30" height="30" alt="" />
            </DropdownToggle>
            <DropdownMenu right={true}>
              <DropdownItem><i className="fa fa-user"></i>
              <Link to="/profile">Profile</Link> </DropdownItem>
              {/* <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem> */}
              {/* <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
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
