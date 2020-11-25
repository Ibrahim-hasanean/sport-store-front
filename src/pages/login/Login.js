import React , {useEffect,useState} from 'react'
import useAuthContext from '../../context/AuthContext'
import "./login.css"
import axios from "axios"
import { Redirect } from 'react-router-dom'
import useAuth from '../useAuth/useAuth'
import FacebookLogin from "react-facebook-login"
import GoogleLogin from 'react-google-login';
import {BeatLoader} from "react-spinners";
let Login= (props) => {  
    const [isLoading,setIsLoading] = useState(false)
    let url = process.env.REACT_APP_BACKEND_URL; 
    let {setToken,isToken,setUserData,userData} = useAuthContext()    
    let {email,password,validEmail,validPassword 
        ,errors,setErrors,validateEmail,validatePassword,
        setValidPassword,setValidEmail }  = useAuth()
       const referer = props.location.referer || "/"; 
          
     useEffect(()=>{
         let token = localStorage.getItem("token")
         if(token){
            setToken(token)           
        }   
     })

       let submit=async (e)=>{          
           console.log(email,password)
            e.preventDefault();  
            if(validEmail && validPassword ){ 
                setIsLoading(true)      
                axios.post(`${url}/api/v1/login`,{            
                email,password
            },
            ).then(async response=>{
                console.log(response)
                let {token,status,email} = response.data                
                if(status===200){
                console.log(token)
                setIsLoading(false)
                await setToken(token)  
                await setUserData({...userData,email})                          
                }  
                
            } ).catch(e=>{
                console.log(e) 
                setIsLoading(false)
                if(e.response.data.message === "wrong password"){
                    setErrors({...errors,password:"wrong password"})
                }               
            })  
           
        }else{
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
        }            
    }catch(e){
        console.log(e)  
        setIsLoading(false)      
        }
    }
    if(isToken){           
           return <Redirect to={referer}/>        
    }
    return ( 
        <div className="login">                
            <form id="form" onSubmit={submit}>             
            <h2>Login</h2>  
               <input onChange={validateEmail} className="text" id="email" type="email" placeholder="Email"/>
                {<p className="error">{errors.email}</p>}           
                <input onChange={validatePassword} name="password" className="text" id="password" type="Password" placeholder="password"/>
                {<p className="error">{errors.password}</p>}
                <div>
                {isLoading?
                    <BeatLoader loading />:
                    <div></div>
                }
            </div>
                <a href="/forgetpassword">forget password</a>               
                <input disabled={isLoading} id="submit" type="submit" value="login"/>
            </form>
            
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
        </div>
    )
}
export default Login