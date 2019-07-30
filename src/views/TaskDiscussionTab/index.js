import React, { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import Comment from "./Comment";
import SENDER from "../../utils/SENDER";

const TaskDiscussionTab = props => {
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
    <div style={{ paddingRight: "1%" }}>
             <CommentBox taskId={props.taskId} onAdd={onAddComment} />
             <div style={{marginBottom: "5%"}}></div>
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
    </div>
  );
};

export default TaskDiscussionTab;
