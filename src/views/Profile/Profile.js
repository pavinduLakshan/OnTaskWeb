import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import RequireAuth from "../../utils/PrivateRoute";
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
    lname: ""
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
      <Col xs="12" sm="6" lg="3">
        <Card>
          <CardHeader>User Activity</CardHeader>
        </Card>
      </Col>
      </Row>  
    );
  }
}

export default RequireAuth(Profile);
