import React,{useState} from 'react'
import {Link} from "react-router-dom"
import authContext from "../../context/AuthContext"
import "./nav.css"
const  Nav = (props)=> {
    let {isToken,logout,userData} = authContext();    
    let {isAdmin} = userData   
    const [location,setLocation] = useState(String(window.location.pathname))
    let admin;
    if(isAdmin) admin= <li><Link to="/admin">Admin page</Link></li>
    const changeLocation = (e)=>{
            let location = window.location.pathname
            setLocation(String(location))
    }
     
    return (
        <div>         
            <nav id="nav">   
            {             
            isToken?
            <><ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/profile">profile</Link></li>  
                        {admin}             
                </ul>
                <button onClick={logout}  id="loginButton">logout</button>
                
            </>
            :<> {location === "/signup"?
                <button onClick={changeLocation}  id="loginButton"><Link onClick={changeLocation} to="/login" >login</Link></button>:  
                <button onClick={changeLocation} id="loginButton"><Link onClick={changeLocation} to="/signup" >sign up</Link></button>
                 }   
             </>                   
                    }              
            </nav>          
        </div>
    )
}

export default Nav