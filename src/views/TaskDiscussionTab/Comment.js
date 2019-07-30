import React from 'react';
import Card from 'react-bootstrap/Card'

const Comment = props => {
    return (
        <Card style={{marginTop: "1%",marginBottom: "1%",height: "15vh"}}>
            <Card.Header>
                <b>{props.fname}</b> commented on {props.createdAt.slice(0,10)} at {props.createdAt.slice(12,19)}
            </Card.Header>
              <Card.Body style={{paddingTop: 0}}>
              <div dangerouslySetInnerHTML={{__html: props.content}}>
        </div>
              </Card.Body>
          </Card>
    );
};

export default Comment;