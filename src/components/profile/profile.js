import React , {useEffect,useState} from 'react'
import useContext from "../../context/AuthContext";
import "./profile.css"
import axios from "axios";
let  Profile =  ()=> {
    let {logout,userData,setUserData} = useContext()  
    const [isLoading,setIsLoading] = useState(false)   
    
    useEffect(()=>{  
        let getUseData = ()=>{
            let token = localStorage.getItem("token")
             axios.get("https://sportstore1.herokuapp.com/api/v1/users/profile",{headers:{"x-access-token":token}})
            .then(response => {
                let {email,name} = response.data;
                setUserData({...userData,name ,email})
                setIsLoading(true)
            }).catch(e=>{
                console.log(e)
                if(e.response.status === 401){
                    logout()                   
                }
            })     
        }      
    if(Object.keys(userData).length===0){
        getUseData()
    }else{
        setIsLoading(true)
    }    
})  

    if(!isLoading){
     return   <div id="profile">...Loading</div>
    }
    return (
        <div  id="profile">
            <h1>welocome {userData.email}</h1>
        </div>
    )    
}
export default Profile