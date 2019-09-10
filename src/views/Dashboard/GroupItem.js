import React from 'react'
import { Card,CardBody} from 'reactstrap'
import { Link } from 'react-router-dom'

const GroupItem = props => {
    return (
        <>
          <Link to={"/groups/"+props.id} style={{ textDecoration: 'none' }}>
          <Card style={{padding: "1%"}}>
              <CardBody style={{padding: 0}}>
                <h3 style={{textDecoration: 'none'}}>{props.name}</h3>
                <h6 style={{textDecoration: 'none'}}>{props.last_activity}</h6>
              </CardBody>
            </Card>
          </Link>
        </>
    )
}

export default GroupItem