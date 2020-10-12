import {useState} from 'react'
import validator from "validator";
const useAuth = () => {
       const  [email,setEmail]=useState();
       const  [password,setPassword]=useState(null);
       const  [validEmail,setValidEmail]= useState(false)
       const  [validPassword,setValidPassword]= useState(false)
       const [errors,setErrors] = useState({})
        
       let validateEmail = (e)=>{           
        let value = e.target.value           
        if(!validator.isEmail(value)){
            setValidEmail(false)
            setErrors({...errors,email:"eamil not valid"})
        }else{
        setValidEmail(true)
        setErrors({...errors,email:""})}     
        setEmail(value)   
    }
   let validatePassword=(e)=>{   
       let value = e.target.value          
    if(value.length<8){
        setValidPassword(false)
        setErrors({...errors,password:"password must be 8 character"})
    }else{
    setValidPassword(true)
    setErrors({...errors,password:""})
    setPassword(value)
}  
    }


    return {email,password,validEmail,validPassword,setValidEmail,setValidPassword ,errors,setErrors,validateEmail,validatePassword }  
            
}

export default useAuth
