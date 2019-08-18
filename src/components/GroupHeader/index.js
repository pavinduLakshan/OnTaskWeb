import React, { Component } from 'react';
import {   CardBody,Popover, PopoverBody, PopoverHeader,Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import GroupSettings from '../GroupSettings'
import SENDER from '../../utils/SENDER'
import GroupInvite from '../GroupInvite'

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
            <div className="bg-success" style={{width: "100%",display: "flex",flexDirection: "row",alignItems: "center",color: "white",margin: 0,padding: "0.4%"}}>
          <h5>{this.props.name}</h5>
          <GroupInvite groupId={this.props.groupId}/>
          <span style={{flexGrow: 1}}></span>
            <GroupSettings groupName={this.props.name}/>
        </div>
        );
    }
}

export default GroupHeader;