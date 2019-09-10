import React, { useEffect, useState } from "react";
import SENDER from '../../utils/SENDER'
import { Clock } from "styled-icons/feather/Clock";
import {Github} from 'styled-icons/boxicons-logos/Github'
import ProfilePicture from '../../components/ProfilePicture'
import {Link2} from 'styled-icons/feather/Link2'
import {ScLinkedin} from 'styled-icons/evil/ScLinkedin'
import {StackOverflow} from 'styled-icons/fa-brands/StackOverflow'
import { Row, Col, Card, CardBody } from "reactstrap";

const UserProfile = props => {
  const [userData,setUserData] = useState([])
  const [lname,setLName] = useState("")

  useEffect(
      () => {
            SENDER.get("/users/" + props.id).then(res => {
              console.log("User data: ")
              console.log(res.data)
              setUserData(res.data);
              setLName(res.data.lname ? res.data.lname: "")  
            });
      },[props.trigger]
  )
  return (
    <>
      <Row>
      <Col sm="3" md="3" xs="8" lg="3">
      <ProfilePicture id={props.id}/>
      </Col>
      <Col sm="4" lg="5" className="middle_column">
      <h3>{userData.fname + " "+lname}</h3>
      {userData.bio ? userData.bio : <h6>Your <i>About me</i> is empty</h6>}
      </Col>
      <Col sm="5" lg="4">
          <div style={{display: "flex",flexDrection: "row"}}>
            <div></div>
            <div></div>
          </div>
          <Card className="border-light">
              <CardBody style={{padding: 0,paddingRight: "3%",paddingLeft: "3%",display: userData.email ? "flex" : "none",flexDirection: "column"}}>
              <div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
              <i className="fa fa-envelope" style={{fontSize: "20px"}}/>
              <p style={{margin: "0.5%",marginLeft: "1.5%"}}>{userData.email}</p>
              </div>                         
              <div style={{display: userData.mobile ? "flex" : "none",flexDirection: "row",alignItems: "center"}}>
              <i className="fa fa-phone" style={{fontSize: "20px"}}></i>
              <p style={{margin: "0.5%",marginLeft: "1.5%"}}>{userData.mobile}</p>
              </div>
              <div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
              <i className="fa fa-map-marker" style={{fontSize: "20px"}}></i>
              <p style={{margin: "0.5%",marginLeft: "1.5%"}}>Sri Lanka</p>
              </div>
              <div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
              <Clock size={15} />
              <p style={{margin: "0.5%",marginLeft: "1.5%"}}>Member for 2 years</p>
              </div>
              <div style={{display: userData.githubLink ? "flex": "none",flexDirection: "row",alignItems: "center"}}>
              <Github size={15} />
              <a href={userData.githubLink} style={{margin: "0.5%",marginLeft: "1.5%",color: "black"}}>{userData.githubLink}</a>
              </div>
              <div style={{display:  userData.websiteLink ? "flex" : "none",flexDirection: "row",alignItems: "center"}}>
              <Link2 size={15} />
              <a href={userData.websiteLink} style={{margin: "0.5%",marginLeft: "1.5%"}}>{userData.websiteLink}</a>
              </div>
              <div style={{display:  userData.linkedInLink ? "flex" : "none",flexDirection: "row",alignItems: "center"}}>
              <ScLinkedin size={20} />
              <a href={userData.linkedInLink} style={{margin: "0.5%",marginLeft: "1.5%"}}>{userData.linkedInLink}</a>
              </div>
              </CardBody>
          </Card>
      </Col>
    </Row>
        <Card style={{marginTop: "1%",padding: "1%",display: "flex",backgroundColor: "#1FDC75",flexDirection: "row",alignItems: "center"}}>
        <i className="fa fa-graduation-cap"></i>
          <h5>User Activity</h5>
        </Card>
    </>
  );
};

export default UserProfile;
