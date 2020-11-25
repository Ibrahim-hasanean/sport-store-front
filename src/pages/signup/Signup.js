import React,{useState} from 'react'
import "../signup/signup.css"
import axios from "axios"
import useAuthContext from "../../context/AuthContext"
import { Redirect } from 'react-router-dom'
import useAuth from "../useAuth/useAuth";
import {BeatLoader} from "react-spinners";
import FacebookLogin from "react-facebook-login"
import GoogleLogin from 'react-google-login';
const Signup = () => {
    let url = process.env.REACT_APP_BACKEND_URL; 
    const [isLoading,setIsLoading] = useState(false)
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
            setIsLoading(true)     
             axios.post(`${url}/api/v1/signup`,{            
             email,password,name
         },
         ).then(async response=>{
             console.log(response)
             let {token,status,email,name} = response.data
             if(status===200){
             console.log(token)
             setIsLoading(false) 
              setToken(token)  
              setUserData({...userData,email,name})   
             setSignupSuccess(true)                    
             }              
             
         } ).catch(e=>{
             console.log(e.response)  
             setIsLoading(false)             
             if(e.response.status === 409){
                setErrors({...errors,email:"email already signed up"})

             }
         })  
        
     }else{
        setIsLoading(false) 
         setValidEmail(false)
         setValidPassword(false)
         setErrors({...errors,email:"email is required",password:"password is required"})
     }                 
 }    
 let facebbokRespose = async(response)=>{
    console.log(response)
    try{
    setIsLoading(true)
    let sendToken = await axios.post(`${url}/api/v1/facebooklogin`,{accessToken:response.accessToken});
        let {token,status,email,name,isAdmin} = sendToken.data;
        console.log(sendToken.data)
        if(status === 200){
            console.log(token)
            setIsLoading(false)
            setToken(token)
            setUserData({email,name,isAdmin})
            setSignupSuccess(true)
    }            
    }catch(e){
        if(e.response.status === 409){
            setErrors({...errors,email:"email already signed up localy"})
            setIsLoading(false)
        }
        }

    }
let responseGoogle = async(response)=>{
    console.log(response)        
    try{
     setIsLoading(true)
    let sendToken = await axios.post(`${url}/api/v1/googlelogin`,{id_token:response.tokenId});
        let {token,status,email,name} = sendToken.data;
        if(status === 200){
            console.log(token)
            setIsLoading(false)
            setToken(token)
            setUserData({email,name})
            setSignupSuccess(true)
    }            
    }catch(e){
        console.log(e)  
        setIsLoading(false)      
        }
    }
    if(signupSuccess){
        return <Redirect to="/"/>
    }
  
    return (
        <div>
        <form id="form" onSubmit={submit}>       
            <h2>sign up</h2> 
            <input onChange={validateEmail} name="email" className="text" id="emai" type="email" placeholder="Email"/>           
            {<p className="error">{errors.email}</p>}      
            <input onChange={(e)=>{setName(e.target.value)}}  name="name" className="text" id="name" type="text" placeholder="Name"/>                                          
            <input onChange={validatePassword} name="password" className="text" id="password" type="Password" placeholder="password"/> 
            <div>
                {isLoading?
                    <BeatLoader loading />:
                    <div></div>
                }
            </div>
            {<p className="error">{errors.password}</p>}
            <input disabled={isLoading}  id="submit" type="submit" value="signup"/>  
            <div className="socialLoginContainer">
            <FacebookLogin
                appId={process.env.REACT_APP_Facebook_AppId}
                autoLoad={false}
                fields="name,email,picture"               
                callback={facebbokRespose}
                cssClass="socialLogin"
                textButton=" Login with google"  
                icon="fa-facebook" 
                isDisabled={isLoading}                                            
                 />               
                 <GoogleLogin
                    clientId={process.env.REACT_APP_Google_ClitenID}
                    buttonText="Login with google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    className="socialLogin"
                    disabled={isLoading}
                    
                />     
        </div> 
        </form> 
        </div>
    )


}

export default Signup
