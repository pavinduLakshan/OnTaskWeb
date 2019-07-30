import React, { useState } from 'react'
import axios from 'axios'
import { Route } from "react-router-dom";
import {Redirect} from 'react-router-dom'

const PublicRoute = ({ component: Component, ...rest }) => {
    const [isAuth,setIsAuth] = useState(false)
    axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem("token")

    React.useEffect(()=>{
        getUser();
      }, []);
      
      function getUser(){
        axios.get('/api/auth/user/me').then(
          res => {
            //setIsAuth(false)
            console.log(axios.defaults.headers.common['Authorization'])
          }
        ).catch(err => {console.log(err);setIsAuth(false)})
      }

    return (
        <Route {...rest} render={(props) => (
          !isAuth 
            ? <Component {...props} />
            : <Redirect to='/' />
        )} />
    )
}

export default PublicRoute