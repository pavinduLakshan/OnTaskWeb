import React from "react";
import { Badge,Card,CardBody } from "reactstrap";

const TaskItem = props => {
  return (
    <Card
      className="mb-sm-2 p-2 m-1"
    >
        <CardBody style={{padding: 0}}>
        <div className="text-muted"       style={{ cursor: "pointer" }} onClick={() => props.sendTask(props.task)}>
        <h6 style={{margin: 0}}>{props.task.name}</h6>
        <p style={{margin: 0}}>due {props.task.dueDate}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h5 style={{ margin: "1%" }}>
          <Badge color="primary">New</Badge>
        </h5>
        {/* <h5 style={{ margin: "1%"}}>
          <Badge color="success">Completed</Badge>
        </h5>
        <h5 style={{ margin: "1%" }}>
          <Badge color="danger">Overdue</Badge>
        </h5> */}
      </div>
        </CardBody>
    </Card>
  );
};

export default TaskItem;
