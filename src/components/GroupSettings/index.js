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

          <i alt="group settings" title="Group Settings" className="icon-settings" onClick={this.handleShow} style={{cursor: "pointer"}}/>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          {...this.props}
          size="lg"
        //   aria-labelledby="contained-modal-title-vcenter"
        //   centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Group Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default GroupSettingsModal
