import React from "react";
import {Row,Col} from 'reactstrap'
import {Link} from 'react-router-dom'
import QRDisplay from './QRDisplay'
import "./styles.css";

const styles = {
  container: {
    width: "100%",
    padding: "5%"
  },
  instructions: {},
  row: {
    margin: 0
  }
};

const Mobile = props => {
  return (
    <div style={styles.container}>
      <h5>To login with the mobile app,</h5>
        <Row style={styles.row}>
          <Col sm={12} md={8} style={{}}>
            <ol>
              <li style={{fontSize: "1.2em"}}>
                Open <b>OnTask</b> on your phone
              </li>
              <li style={{fontSize: "1.2em"}}>
                Go to <kbd>settings</kbd> and select <i>OnTask Web</i>
              </li>
              <li style={{fontSize: "1.2em"}}>Point your phone to this screen to capture the code</li>
            </ol>
          </Col>
          <Col sm={12} md={4} className="image">
            <QRDisplay />
          </Col>
        </Row>
        <h6 style={{textAlign: "center"}}>Don't have an account? <Link to="/signup">Create One</Link></h6>
    </div>
  );
};

export default Mobile;
