import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import Logo from "../../assets/img/brand/logo.PNG";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { withRouter } from "react-router-dom";
import MobileSignup from "./mobile";
import EmailSignup from "./email";
import axios from "axios";

const styles = {
  header: {
    display: "flex",
    justifyContent: "left",
  },
  emailSignupBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mobileSignupBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    borderRadius: "10px",
    margin: "10px",
  },
  background: {
    background: "linear-gradient(180deg, #1117e1 50%, #FFFFFF 50%)",
    height: "100vh" 
  },
};

class Signup extends Component {
  componentDidMount() {
    axios.get("/api/auth/user/me").then(res => {
      if (res.data.id > 0) {
        //alert("You are already logged in as " + res.data.fname +"\nPlease logout and try again")
        this.props.history.push("/");
      }
    });
  }

  componentDidUpdate() {
    axios.get("/api/auth/user/me").then(res => {
      if (res.data.id > 0) {
        //alert("You are already logged in as " + res.data.fname +"\nPlease logout and try again")
        this.props.history.push("/");
      }
    });
  }

  signupWithMobile = values => {
    console.log(values);
    axios
      .post("/api/auth/signup/mobile", values)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  signupWithEmail = values => {
    // axios.post('/api/auth/signup',values).then(
    //   res => {
    //   if(res.status === 200){
    //     props.history.push("/login")
    //   }}
    // ).catch(err => console.log(err))
  };

  render() {
    return (
      <div style={styles.background}>
        <div style={{ display: "flex", justifyContent: "left" }}>
          <img src={Logo} alt="" height="50" width="150" />
        </div>
        <Row style={{ margin: 0}}>
          <Col
            xs="12"
            sm="6"
            lg="3"
            className="p-3"
            style={{ paddingRight: 0 }}
          />
          <Col
            xs="12"
            sm="12"
            lg="6"
            className="p-3"
            style={{ paddingRight: 0 }}
          >
            <Tabs>
              <TabList style={{ padding: 0 }}>
                <Tab style={{ width: "50%", margin: 0, padding: 0 }}>
                  <h4 style={{ marginTop: "5%", textAlign: "center" }}>
                    Signup with mobile
                  </h4>
                </Tab>
                <Tab style={{ width: "50%", margin: 0, padding: 0 }}>
                  <h4 style={{ marginTop: "5%", textAlign: "center" }}>
                    Signup with Email
                  </h4>
                </Tab>
              </TabList>

              <TabPanel style={{ marginTop: "-1.5%" }}>
                <MobileSignup signupWithMobile={this.signupWithMobile} />
              </TabPanel>
              <TabPanel style={{ marginTop: "-1.5%" }}>
                <EmailSignup signupWithEmail={this.signupWithEmail} />
              </TabPanel>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Signup);
