import React from 'react'
import {Redirect, Route} from "react-router-dom"
import AuthContext from "../context/AuthContext"
let  ProtectRoute= ({component:Component,...rest})=> {
    const {isToken} = AuthContext();    
    return(
        <Route {...rest} render={
            props=> isToken? <Component  {...props}/>: <Redirect to={{ pathname:"/login", referer: props.location}}/>
        }/>
    )
}
export default ProtectRoute