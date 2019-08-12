import React,{ useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import SENDER from '../../utils/SENDER'
import { Input,Button} from 'reactstrap'
import Tab from 'react-bootstrap/Tab'
import ReactMarkdown from 'react-markdown'

const CommentBox = props => {
    const [input,setInput] = useState("")

    function handleChange(e){
        setInput(e.target.value)
    } 

    function postComment(event){
        event.preventDefault()
        console.log({
            taskId: props.taskId,
            content: input,
            userId: parseInt(localStorage.getItem('id'))
        })
        SENDER.post('/comments',{
            taskId: props.taskId,
            content: input,
            userId: parseInt(localStorage.getItem('id'))
        }).then(
            res => {
                if(res.status === 200){
                    alert("New comment Added")
                }
                setInput("")
                props.onAdd()
            }
        ).catch(err => console.log("Comment Error : "+err))
    }

    return(
        <>
        <Tabs defaultActiveKey="write" id="uncontrolled-tab-example">
  <Tab eventKey="write" title="Write" style={{padding: 0}}>
    <Input type="textarea" name="input" onChange={handleChange} defaultValue={input} id="exampleText" />
  </Tab>
  <Tab eventKey="preview" title="Preview">
    <ReactMarkdown source={input} />
  </Tab>
</Tabs>
<Button color="success" onClick={postComment} style={{marginTop: "1%",float: "right"}}>Comment</Button>
</>
    )
}

export default CommentBox