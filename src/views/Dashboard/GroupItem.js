import React from 'react'
import { Card,CardBody} from 'reactstrap'
import { Link } from 'react-router-dom'
var HtmlToReactParser = require("html-to-react").Parser;

const GroupItem = props => {
  var htmlToReactParser = new HtmlToReactParser();
    return (
        <>
          <Link to={"/groups/"+props.id} style={{ textDecoration: 'none' }}>
          <Card style={{padding: "1%"}}>
              <CardBody style={{padding: 0}}>
                <h3 style={{textDecoration: 'none'}}>{props.name}</h3>
                {htmlToReactParser.parse(props.last_activity)}
              </CardBody>
            </Card>
          </Link>
        </>
    )
}

export default GroupItem