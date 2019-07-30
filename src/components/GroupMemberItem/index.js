import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Progress, TabContent, TabPane, ListGroup, ListGroupItem } from 'reactstrap';

class GroupMemberItem extends Component {
    render() {
        return (
            <ListGroupItem action tag="a" href="#" style={{padding: "1%",alignItems: "center",display: "flex",flexDirection: "row"}} className="list-group-item-accent-warning">
                
                  <img style={{margin: "1%"}}className="img-avatar" width="30" height="30" src={this.props.img} alt=""></img>
                  <div style={{marginLeft: "1%"}}>{this.props.name} </div>
              </ListGroupItem>
        );
    }
}

export default GroupMemberItem;