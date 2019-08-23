import React, { useEffect, useState } from "react";
import SENDER from '../../utils/SENDER'
import { Clock } from "styled-icons/feather/Clock";
import {Github} from 'styled-icons/boxicons-logos/Github'
import ProfilePicture from '../../components/ProfilePicture'
import {Link2} from 'styled-icons/feather/Link2'
import './UserProfile.css'
import { Row, Col, Card, CardBody } from "reactstrap";

const UserProfile = props => {
  const [userData,setUserData] = useState([])
  const [lname,setLName] = useState("")

  useEffect(
      () => {
            SENDER.get("/users/" + props.id).then(res => {
              setUserData(res.data);
            });
        
            setLName(userData.lname ? userData.lname: "")  
      },[props.id]
  )
  return (
    <>
      <Row>
      <Col sm="6" lg="3">
      <ProfilePicture id={props.id}/>
      </Col>
      <Col lg="5" className="middle_column">
      <h3>{userData.fname + " "+lname}</h3>
      {userData.bio ? userData.bio : <h6>Your <i>About me</i> is empty</h6>}
      </Col>
      <Col sm="6" lg="4">
          <div style={{display: "flex",flexDrection: "row"}}>
            <div></div>
            <div></div>
          </div>
          <Card className="border-light">
              <CardBody style={{padding: 0,display: userData.email ? "flex" : "none",flexDirection: "column"}}>
              <div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
              <i class="fa fa-envelope" style={{fontSize: "20px"}}/>
              <p style={{margin: "0.5%",marginLeft: "1.5%"}}>{userData.email}</p>
              </div>                         
              <div style={{display: userData.mobile ? "flex" : "none",flexDirection: "row",alignItems: "center"}}>
              <i class="fa fa-phone" style={{fontSize: "20px"}}></i>
              <p style={{margin: "0.5%",marginLeft: "1.5%"}}>{userData.mobile}</p>
              </div>
              <div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
              <i class="fa fa-map-marker" style={{fontSize: "20px"}}></i>
              <p style={{margin: "0.5%",marginLeft: "1.5%"}}>Sri Lanka</p>
              </div>
              <div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
              <Clock size={15} />
              <p style={{margin: "0.5%",marginLeft: "1.5%"}}>Member for 2 years</p>
              </div>
              <div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
              <Github size={15} />
              <p style={{margin: "0.5%",marginLeft: "1.5%"}}>https://github.com/pavinduLakshan</p>
              </div>
              <div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
              <Link2 size={15} />
              <p style={{margin: "0.5%",marginLeft: "1.5%"}}>https://pavindulakshan.com</p>
              </div>
              </CardBody>
          </Card>
      </Col>
    </Row>
    <Row style={{marginTop: "1%"}}>
      <Col sm={12} lg={6}>
        <Card style={{padding: "2%",display: "flex",backgroundColor: "#1FDC75",flexDirection: "row",alignItems: "center"}}>
        <i class="fa fa-graduation-cap"></i>
          <h5>Education</h5>
        </Card>
      </Col>
      <Col sm={12} lg={6}>
      <Card style={{padding: "2%",display: "flex",backgroundColor: "#1FDC75",flexDirection: "row",alignItems: "center"}}>
      <i class="fa fa-briefcase"></i>
      <h5>Work</h5>
      </Card>
      </Col>
    </Row>
    </>
  );
};

export default UserProfile;
