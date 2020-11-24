import React,{useState} from 'react'
import "../signup/signup.css"
import axios from "axios"
import useAuthContext from "../../context/AuthContext"
import { Redirect } from 'react-router-dom'
import useAuth from "../useAuth/useAuth"
const Signup = () => {
    let url = process.env.REACT_APP_BACKEND_URL; 

    let {setToken,setUserData,userData} = useAuthContext()    
    let {email,password,validEmail,validPassword 
        ,errors,setErrors,validateEmail,validatePassword,
        setValidPassword,setValidEmail }  = useAuth()
       const [name,setName] = useState(null)
       const [signupSuccess,setSignupSuccess]= useState(false)
       //const [errors,setErrors] = useState({})  
       let submit=async (e)=>{ 
        console.log(email,password)
         e.preventDefault();  
         if(validEmail && validPassword && name  ){       
             axios.post(`${url}/api/v1/signup`,{            
             email,password,name
         },
         ).then(async response=>{
             console.log(response)
             let {token,status,email,name} = response.data
             if(status===200){
             console.log(token)
              setToken(token)  
              setUserData({...userData,email,name})   
             setSignupSuccess(true)                    
             }  
            
             
             
         } ).catch(e=>{
             console.log(e.response)  
             if(e.response.status === 409){
                setErrors({...errors,email:"email already signed up"})

             }
         })  
        
     }else{
         setValidEmail(false)
         setValidPassword(false)
         setErrors({...errors,email:"email is required",password:"password is required"})
     }                 
 }    

    if(signupSuccess){
        return <Redirect to="profile"/>
    }
  
    return (
        <div>
        <form id="form" onSubmit={submit}>       
            <h2>sign up</h2> 
            <input onChange={validateEmail} name="email" className="text" id="emai" type="email" placeholder="Email"/>           
            {<p className="error">{errors.email}</p>}      
            <input onChange={(e)=>{setName(e.target.value)}}  name="name" className="text" id="name" type="text" placeholder="Name"/>                                          
            <input onChange={validatePassword} name="password" className="text" id="password" type="Password" placeholder="password"/> 
            {<p className="error">{errors.password}</p>}
            <input  id="submit" type="submit" value="signup"/>   
  
        
        </form> 
        </div>
    )


}

export default Signup
