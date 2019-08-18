import React from 'react';
import { Input,ListGroupItem } from 'reactstrap'
import {Minus} from 'styled-icons/boxicons-regular/Minus'
import SENDER from '../../utils/SENDER'

const TaskAsigneeItem = props => {

    function removeAsignee(){
        SENDER.delete('/task-asignee/'+props.id,null,{
            params: {
                task_id: props.taskId
            }
        }).then(
            res => {
                console.log(res.data)
                props.onRemove()
            }
        ).catch(err => console.log(err))
    }

    return (
        <ListGroupItem action style={{display: "flex",flexDirection: "row",alignItems: "center",minHeight: "4vh"}}>
        <img src={props.propic} height="30" width="30" alt="" />
        <h6 style={{margin: "0% 0% 0% 5%"}}>{props.name}</h6>
        <div style={{flexGrow: 1}} />
        <Minus size={20} style={{cursor: "pointer"}} alt="Remove" onClick={removeAsignee}/>
</ListGroupItem>
    );
};

export default TaskAsigneeItem;