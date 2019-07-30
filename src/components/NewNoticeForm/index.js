import React,{ Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button  from 'react-bootstrap/Button'
import ReactQuill from 'react-quill'
import SENDER from '../../utils/SENDER'
import 'react-quill/dist/quill.snow.css';
import Form from 'react-bootstrap/Form';

class NewNoticeForm extends Component{
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
          name: "",
          text: "",
          content: "",
          title: ""
        };
      }
    
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }
    
      handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
      }

      handleContent = text => {
        console.log(text)
        this.setState({content: text})
      }
    
      handleSubmit = e => {
        e.preventDefault()
        SENDER.post('/notices',{
            userId: localStorage.getItem('id'),
            groupId: this.props.groupId,
            title: this.state.title,
            content: this.state.content
          }).then(res => {
            if(res.status === 200){
              alert("New Notice was added successfully")
            }
          }).catch(err => console.log(err))
    
      }
    
      render() {
        return (
          <>
            <i onClick={this.handleShow} style={{display: this.props.isAdmin ? "block" : "none",cursor: "pointer"}} className="fa fa-plus float-right"></i>
   
            <Modal show={this.state.show} onHide={this.handleClose} backdrop="static">
            <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Announcement
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Control
              onChange={this.handleChange}
              name="title"
              placeholder="Title"
            >
            </Form.Control>
            <ReactQuill 
              value={this.state.content}
              onChange={this.handleContent}
               />
        </Modal.Body>
        <Modal.Footer>
          <p style={{color: "red",cursor: "pointer",marginTop: "4%"}} onClick={this.props.onHide}>Close</p>
          <Button variant="success" onClick={this.handleSubmit}>Create Announcement</Button>
        </Modal.Footer>
            </Modal>
          </>
        );
      }
  }

export default NewNoticeForm