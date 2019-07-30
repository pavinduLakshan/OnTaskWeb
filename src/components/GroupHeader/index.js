import React, { Component } from 'react';
import {   CardBody,Popover, PopoverBody, PopoverHeader,Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import GroupSettings from '../GroupSettings'
import SENDER from '../../utils/SENDER'

class GroupHeader extends Component {
    state={
        popoverOpen: false,
        email: "",
        message: "I'm working on this project in OnTask and wanted to share it with you!",
        btnTxt: "Invite"
    }

    toggle = () => {
        this.setState({
          popoverOpen: !this.state.popoverOpen,
        });
      }
    
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    sendInvitation = () => {
        SENDER.post('/member/'+this.state.email+'/join/'+this.props.groupId).then(
            res => {
              this.setState({btnTxt: "Sent"})
              setTimeout( () => {
                this.setState({popoverOpen: false})
              },500)
            }
          ).catch(err => console.log(err))   
        }

    render() {
        return (
            <div style={{width: "100%",display: "flex",flexDirection: "row",alignItems: "center",backgroundColor: "#2AA1E2",color: "white",margin: 0,padding: "0.5%"}}>
          <h2>{this.props.name}</h2>
          <Button id="Popover1" color="success" style={{marginLeft: "1%"}} onClick={this.toggle}>
              Invite
            </Button>
            <Popover  placement="bottom-start" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
              <PopoverHeader >Invite User</PopoverHeader>
              <PopoverBody >
                  <Input onChange={this.handleChange} required type="email" name="email" defaultValue={this.state.email} placeholder="Email Address"></Input>
                  <CardBody style={{padding: 0,paddingTop: "1%"}}>
                  <Input style={{height: "20vh"}} onChange={this.handleChange} type="textarea" name="message" defaultValue={this.state.message} id="exampleText" />
                  <Button color="success" onClick={this.sendInvitation} style={{marginTop: "2%",width: "100%"}}>{this.state.btnTxt}</Button>
                  </CardBody>    
            </PopoverBody>
            </Popover>
          <span style={{flexGrow: 1}}></span>
            <GroupSettings />
        </div>
        );
    }
}

export default GroupHeader;