import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import RequireAuth from "../../utils/PrivateRoute";
import SENDER from "../../utils/SENDER";
import DefaultAside from '../../containers/DefaultLayout/DefaultAside'
import ProfilePicture from '../../components/ProfilePicture'
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
    SENDER.get("/user/" + localStorage.getItem("id")).then(res => {
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
      <Col xs="12" sm="6" lg="3">
      <Card>
          <CardBody>
            <ProfilePicture />
            {/* <img src={this.state.propic} alt="" style={{width: "100%",height: "35vh"}}/> */}
          </CardBody>
          <CardHeader><h3>{this.state.userData.fname + " "+this.state.lname}</h3></CardHeader>
        </Card>
      </Col>
      <Col xs="12" sm="6" lg="9" style={{paddingLeft: 0}}>
      <Card>
          <CardBody>
            <DefaultAside />
          </CardBody>
        </Card>
      </Col>
      </Row>  
    );
  }
}

export default RequireAuth(Profile);
