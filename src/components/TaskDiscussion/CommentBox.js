import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import SENDER from "../../utils/SENDER";
import { Input, Button } from "reactstrap";
import Tab from "react-bootstrap/Tab";
import ReactMarkdown from "react-markdown";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const emojiDeselectedStyle = {
  color: "gray", 
  //textShadow: "0 0 0 red"
}

const emojiSelectedStyle = {
  cursor: "pointer",marginLeft: "auto",paddingTop: "2%"
}



const CommentBox = props => {
  const [input, setInput] = useState("");
  const [isShown, setIsShown] = useState(false);

  function controlEmojiPickerShow() {
    setIsShown(!isShown);
  }

  function handleChange(e) {
    setInput(e.target.value);
  }

  function postComment(event) {
    setInput("");
    event.preventDefault();
    // console.log({
    //     taskId: props.taskId,
    //     content: input,
    //     userId: parseInt(localStorage.getItem('id'))
    // })
    SENDER.post("/comments", {
      taskId: props.taskId,
      content: input,
      userId: parseInt(localStorage.getItem("id")),
    })
      .then(res => {
        if (res.status === 200) {
          //alert("New comment Added")
        }
        //props.onAdd()
      })
      .catch(err => console.log("Comment Error : " + err));
  }

  return (
    <>
      <Tabs defaultActiveKey="write" id="uncontrolled-tab-example">
        <Tab eventKey="write" title="Write" style={{ padding: 0 }}>
          <Input
            type="textarea"
            name="input"
            value={input}
            onChange={handleChange}
          />
        </Tab>
        <Tab eventKey="preview" title="Preview">
          <ReactMarkdown source={input} />
        </Tab>
      </Tabs>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <p style={ isShown ? emojiSelectedStyle : emojiDeselectedStyle} onClick={controlEmojiPickerShow}>
          🙂
        </p>
        <div style={{ flexGrow: 1 }} />
        <Button
          color="success"
          onClick={postComment}
          style={{ marginTop: "1%", float: "right" }}
        >
          Comment
        </Button>
      </div>

      <Picker
        style={{
          display: isShown ? "block" : "none",
          height: "40vh",
          marginTop: "1%",
          overflowX: "hidden",
          zIndex: 10
        }}
        emoji=""
        showSkinTones={false}
        showPreview={false}
        title=""
        set="facebook"
        onSelect={emoji => {
          console.log(emoji);
          setInput(input+emoji.native)
        }}
      />
    </>
  );
};

export default CommentBox;
