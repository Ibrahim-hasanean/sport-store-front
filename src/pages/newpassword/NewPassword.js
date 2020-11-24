import "../login/login.css";
import React,{useState} from 'react'
import axios from "axios"
import {Redirect} from "react-router-dom"
import useAuth from "../useAuth/useAuth";
function NewPassword(props) {
    let url = process.env.REACT_APP_BACKEND_URL; 
    let {state} = props.location    
    const [resetpassword,setResetPassword] = useState(false)
    let {password,validPassword ,errors,setErrors,validatePassword } =useAuth()

        let submit = (e)=>{
            e.preventDefault();
            if(!validPassword){
                setErrors({...errors,password:"must be 8 charchters"})
            }else{
                axios.post(`${url}/api/v1/newpassword`,{password,email:state.email})
                .then(response=>{
                    console.log(response)
                    if(response.status===200){
                        setResetPassword(true)
                    }
                }).catch(e=>{
                    console.log(e)
                })
            }
            
        }
        if(!state){
            return  <Redirect to="/forgetpassword"/>
        }
        if(resetpassword){    
            alert("reset password success")        
            return  <Redirect to="/login"/>           
            
        }
    return (
        <div>
        <form id="form" onSubmit={submit}>
        {resetpassword?<p>password reset successful</p>:<p></p>}
            <h3>new password</h3>
            <input onChange={validatePassword} className="text" id="email" type="password" placeholder="password"/>       
            {<p>{errors.password}</p>}               
            <input id="submit" type="submit" value="reset password"/> 
        </form>
        </div>
    )
}

export default NewPassword


