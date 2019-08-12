import React, { useState, useEffect} from "react";
import SENDER from "../../utils/SENDER";
import { Card, CardHeader, CardBody } from "reactstrap";
import CommentBox from "./CommentBox";
import Comment from './Comment'

const TaskDiscussion = props => {
  const [comments, setComments] = useState([]);
  const [addCmntEvt, setEvt] = useState(false);

  useEffect(() => {
    SENDER.get("/comments/" + parseInt(props.taskId))
      .then(res => {
        setComments(res.data);
      })
      .catch(err => console.log(err));
  }, [addCmntEvt]);

  function onAddComment() {
    setEvt(!addCmntEvt);
  }

  return (
    <Card className="border-light">
      <CardHeader>
        <i className="icon-speech" />
        <b>Discussion</b>
      </CardHeader>
      <CardBody style={{ padding: 0 }}>
      {comments.map(comment => {
          return (
            <Comment
              key={comment.id}
              content={comment.content}
              createdAt={comment.createdAt}
              fname={comment.fname}
            />
          );
        })}
        <CommentBox taskId={props.taskId} onAdd={onAddComment} />
      </CardBody>
    </Card>
  );
};

export default TaskDiscussion;
