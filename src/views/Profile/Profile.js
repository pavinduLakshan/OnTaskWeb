import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import RequireAuth from "../../utils/PrivateRoute";
import { Activity } from 'styled-icons/feather/Activity'
import SENDER from "../../utils/SENDER";
import ProfilePane from './ProfilePane'
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

class Profile extends Component {
  state = {
    userData: "",
    lname: "",
    education: []
  };

  componentDidMount() {
      SENDER.get("/users/" + this.props.match.params.id).then(res => {
        this.setState({userData: res.data});
      });
  
      this.setState({lname: this.state.userData.lname ? this.state.userData.lname: ""})  
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      
    }
  }

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  render() {
    return (
      <Row style={{ marginTop: "0.5%" }}>
      
      <Col xs="12" sm="12" lg="9" style={{paddingRight: 0}}>
      <Card>
          <CardBody>
            <ProfilePane id={this.props.match.params.id}/>
          </CardBody>
        </Card>
      </Col>
      <Col xs="12" sm="12" lg="3">
      <Card style={{marginTop: "1%",padding: "1%",display: "flex",backgroundColor: "#1FDC75",flexDirection: "row",alignItems: "center"}}>
        <Activity size={25}/>
          <h5>User Activity</h5>
        </Card>
        
      
      </Col>
      </Row>  
    );
  }
}

export default RequireAuth(Profile);
