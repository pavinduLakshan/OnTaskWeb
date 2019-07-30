import React, { Component } from "react"
import {Row,Col,Card,
  CardBody} from 'reactstrap'
import Logo from '../../assets/img/brand/logo.PNG' 
import MobileLogin from './mobile'
import EmailLogin from './email'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const styles = {
    header: {
        display: "flex", justifyContent: "left",paddingBottom: "2%"
    },
    emailLoginBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
        margin: 0,
        marginRight: "5%",
        marginLeft: "5%",
        backgroundColor: "black",
        padding: "1%",
        paddingRight: "0%"
    },
    mobileLoginBox: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "2%"
    },
    background: {
        background: "linear-gradient(180deg, #2858e2 30%, #FFFFFF 70%)",
        height: "100vh"
    }
}

const loginWithMobile = values => {
  console.log(values)
}

class Login extends Component{
  constructor(props) {
    super(props);
    this.state={
      MailConfirmedText: ""
    } 
  }

  componentDidMount(){
    axios.defaults.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    axios
    .get("/api/auth/user/me")
    .then(res => {
      console.log(res);
      alert("You are already logged as "+res.data.fname + ". Try logout first")
      this.props.history.push("/")
    })
    .catch(err => {
      console.log("err: ", err);
    });

    const params = new URLSearchParams(this.props.location.search);
    const token = params.get('token')
    if(token){
      axios
    .post("/api/auth/verify/email/"+token)
    .then(res => {
      console.log(res);
      this.setState({MailConfirmedText: "Email address was successfully verified"})
    })    
    .catch(err => {
      console.log("con err: ", err);
    });
    }
  }

  render(){
    return (
      <div style={{overflowY: "hidden"}}>
        <div style={{display: "flex",justifyContent: "left"}}>
        <img src={Logo} alt="" height="60" width="150"/>
      </div>
      <Row style={{margin: 0}}>
          <Col xs="12" sm="6" lg="9" className="p-3" style={{paddingRight: 0}}>
          <Card>
                    <CardBody>
                    <MobileLogin />
                    </CardBody>
                  </Card>
          </Col>

          <Col xs="12" sm="6" lg="3" className="p-3" >
          <Card style={{paddingLeft: 0}}>
          
                    <CardBody>
                    <EmailLogin history={this.props.history}/>
                    </CardBody>
                  </Card>
          </Col>
          </Row>
      </div>
  )
  }
}

export default withRouter(Login)