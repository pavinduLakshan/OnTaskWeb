import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class GroupSettingsModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <>

          <i alt="group settings" title="Group Settings" className="icon-settings" onClick={this.handleShow} style={{cursor: "pointer",marginRight: "5%"}}/>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Group Settings for group <span style={{color: "gray"}}>{this.props.groupName}</span></Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              maxHeight: "calc(100vh - 200px)",
              height: "40vh",
              overflowY: "auto",
            }}
          >

          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default GroupSettingsModal
