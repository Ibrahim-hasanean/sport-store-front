import React,{useState} from 'react'
import "../login/login.css"
import axios from "axios"
import { Redirect } from 'react-router-dom';
const ConfirmCode = (props) => {
    let url = process.env.REACT_APP_BACKEND_URL
    let {state} = props.location;
    const [code ,setCode] = useState(null)
    const [errors,setErrors] = useState({})
    const [isconfirm,setIsConfirm]= useState(false)    
    let submit = (e)=>{
        e.preventDefault();
        if(!code){
            setErrors({...errors,code:"code is required"})
        }else{
        axios.post(`${url}/api/v1/confirmcode`,{code,email:state.email})        
        .then(response=>{
            console.log(response.data)
            if(response.data.status===200)
                 setIsConfirm(true)
        }).catch(e=>{
            console.log(e)
            if(e.response.data.status === 400){
                setErrors({...errors,code:e.response.data.message})
            }
        })
        }
    }
   
    if(!state){
      return  <Redirect to="/forgetpassword"/>
    }
    if(isconfirm){
        return  <Redirect to={{pathname:"/newpassword" , state:{email:state.email}}}/>
    }
    return (
        <div>
            <form id="form" onSubmit={submit}>
            <h2>confirm code</h2>
                <input onChange={(e)=>{setCode(e.target.value)}} className="text" id="email" type="text" placeholder="enter code"/>                 
                {<p className="error">{errors.code}</p>}            
                <input id="submit" type="submit" value="confrim code"/>                                      
            </form>
        </div>
    )
}

export default ConfirmCode
