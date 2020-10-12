import React,{useState} from 'react'
import "../login/login.css"
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import useAuth from "../useAuth/useAuth"
const ForgetPassword = (props) => {
    const [isCodeSend,setIsCodeSend] = useState(false)    
    let {email,validEmail,errors, setErrors,validateEmail }  = useAuth()
    let submit = (e)=>{
        console.log(email,validEmail)
        e.preventDefault();
        if(!validEmail){
            setErrors({...errors,email:"email is required"})
        }else{
        //.then(response => response.json())
        axios.post("https://sportstore1.herokuapp.com/api/v1/forgetpassword",{email})        
        .then(data=>{
            console.log(data)
            setIsCodeSend(true)
            
        }).catch(e=>{console.log(e.response.data)
            setErrors({...errors,email:e.response.data.message})
        })
    }
    }    
    if(isCodeSend){
        return <Redirect  to={{pathname:"/confirmcode" ,state:{email:email}}}/>
    }    
    return (
        <div> 
            <form id="form" onSubmit={submit}>
            <h2>forget password</h2>
                <input onChange={validateEmail} className="text" id="email" type="text" placeholder="enter your email"/>                
                {<p className="error">{errors.email}</p>}
                <input id="submit"  type="submit" placeholder="send code" />                
                {isCodeSend?<p>check your email</p>:<p></p>}               
            </form>     
        </div>
    )
}

export default ForgetPassword
