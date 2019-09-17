import React from 'react'
import SENDER from '../../utils/SENDER'
import { DropdownItem } from "reactstrap";
var HtmlToReactParser = require("html-to-react").Parser;


const UserNotification = props => {
    const CreatedDateFields = new Date(props.createdAt).toString().split(" ");

    const createdDate = CreatedDateFields.slice(1, 4)
      .toString()
      .replace(/,/, "");
    const createdTime = CreatedDateFields[4];
    var htmlToReactParser = new HtmlToReactParser();
  
    return (
      <DropdownItem onClick={props.markAsSeen}>
        <div style={{display: "flex",flexDirection: "row"}}>
        <i className="fa fa-bell" />
                    <h6 style={{ margin: 0 }}>
            {htmlToReactParser.parse(props.description)}
          </h6>
        </div>
          <p style={{ margin: 0 }}>
            {createdDate} at {createdTime}
          </p>
      </DropdownItem>
    )
}

export default UserNotification