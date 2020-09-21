import React from 'react'
import {Link} from "react-router-dom"
import authContext from "../../context/AuthContext"
import "./nav.css"
export default function Nav() {
    let {isToken,logout} = authContext();    
         /* isToken?<button onClick={logout}  id="loginButton">logout</button>
                   :<><button id="loginButton"><Link to="/login" >login</Link></button>  
                       <button id="loginButton"><Link to="/signup" >signup</Link></button>    
                    </> */         
    return (
        <div>
            <nav id="nav">            
               <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profile">profile</Link></li>               
                </ul>
                {             
                    
                    isToken?<button onClick={logout}  id="loginButton">logout</button>
                   :<><button id="loginButton"><Link to="/login" >login</Link></button>  
                       <button id="loginButton"><Link to="/signup" >signup</Link></button>    
                    </>
                    
                    }              
            </nav>          
        </div>
    )
}
