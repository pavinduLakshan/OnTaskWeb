import React,{useEffect,useState,useRef} from "react";
import Form from "react-bootstrap/Form";
import { SearchAlt2 } from "styled-icons/boxicons-regular/SearchAlt2";
import { AddBox} from 'styled-icons/material/AddBox'
import InputGroup from "react-bootstrap/InputGroup"
import useForm from '../../utils/useForm'
import SENDER from '../../utils/SENDER'
import Table from 'react-bootstrap/Table'
import axios from 'axios'

const ResourceTab = props => {
  const { values, handleChange, handleSubmit } = useForm(searchResources);

  const TaskResUploader = useRef(null);
  const [resources,setResources] = useState([])
  const [response,setResponse] = useState("")
  const showOpenFileDlg = () => {
    TaskResUploader.current.click();
  };

  function fileChangedHandler(event) {
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("name", event.target.files[0].name);

    SENDER.post(
      "/task_resources/"+ parseInt(localStorage.getItem('id')) + "/"+parseInt(props.taskId),formData
    )
      .then(res => {
        if (res.status === 200) {
          // alert("upload suc");
          setResponse("suc")
        }
      })
      .catch(err => alert("err"));
  }

  function searchResources(){
    alert(values.r_query)
  }

  useEffect(
    () => {
      SENDER.get('/task_resources/'+props.taskId).then(
        res => setResources(res.data)
      ).catch(err => console.log(err))
    },[response]
  )

  return (
    <>
        <Form inline style={{ marginTop: "0.5%" }}>
        <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search Resources"
              name="r_query"
              aria-describedby="inputGroupPrepend"
              onChange={handleChange}
              required
            />
            <InputGroup.Append style={{cursor: "pointer"}}>
              <InputGroup.Text id="inputGroupPrepend">
              <SearchAlt2 size={20} onClick={handleSubmit}/>
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>

          <Form.Group
            controlId="add"
            style={{ cursor: "pointer" }}
          >
              <input
              ref={TaskResUploader}
              onChange={fileChangedHandler}
              type="file"
              style={{ display: "none" }}
            />
            <AddBox size={45} title="add resource" onClick={showOpenFileDlg}/>
          </Form.Group>
        </Form>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th style={{textAlign: "center"}}>Name</th>
      <th style={{textAlign: "center"}}>Added on</th>
      <th style={{textAlign: "center"}}>Added by</th>
    </tr>
  </thead>
  <tbody>
    {resources.map( resource => {
      return <tr>
      <td>{resource.taskResId}</td>
      <td><a href={resource.uri}>{resource.uri.split('/')[5]}</a></td>
      <td>{resource.addedOn.slice(0,10)}</td>
      <td>{resource.username}</td>
    </tr>
    })}
  </tbody>
</Table>

    </>
  );
};

export default ResourceTab;
