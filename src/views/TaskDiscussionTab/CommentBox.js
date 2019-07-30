import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import Button from 'react-bootstrap/Button'
import SENDER from '../../utils/SENDER'

const CommentBox = props => {
    const [text,setText] = useState("")

    function handleContent(value){
        setText(value)
    }

    function postComment(event){
        event.preventDefault()
        console.log({
            taskId: props.taskId,
            content: text,
            userId: parseInt(localStorage.getItem('id'))
        })
        SENDER.post('/comments',{
            taskId: props.taskId,
            content: text,
            userId: parseInt(localStorage.getItem('id'))
        }).then(
            res => {
                if(res.status === 200){
                    alert("New comment Added")
                }
                setText("")
                props.onAdd()
            }
        ).catch(err => console.log("Comment Error : "+err))
    }

    return(
        <>
            <ReactQuill 
              value={text}
              onChange={handleContent} 
              placeholder="Write a comment"/>
        <Button variant="success" onClick={postComment} style={{marginTop: "0.5%",float: "right"}}> Add a comment</Button>
        </>
    )
}

export default CommentBox