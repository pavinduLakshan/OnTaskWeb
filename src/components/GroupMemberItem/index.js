import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';

class GroupMemberItem extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
            <ListGroupItem action tag="a" href={"/users/"+this.props.id} style={{padding: "1%",alignItems: "center",display: "flex",flexDirection: "row"}} className="list-group-item-accent-warning">
                
                  {this.props.img ? 
                  <img style={{margin: "1%",borderRadius: "50%"}}className="img-avatar" width="25" height="25" src={this.props.img} alt=""></img>
                  : <i className="fa fa-user" style={{fontSize: "25px"}}></i>
                }
                  <div style={{marginLeft: "1%"}}>{this.props.name} </div>
              </ListGroupItem>
        );
    }
}

export default GroupMemberItem;