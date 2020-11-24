import React , {useEffect,useState,useCallback} from 'react'
import useContext from "../../context/AuthContext";
import "./profile.css"
import axios from "axios";
import WishList from "../../components/WishList/WishList";
import OrdersList from "../../components/orders/Orders";
import ProfileSideBar from "../../components/ProfileSideBar/ProfileSideBar";
import {AiOutlineBars} from "react-icons/ai"
let  Profile =  ()=> {
    let url = process.env.REACT_APP_BACKEND_URL; 

    let {logout,userData,setUserData} = useContext()  
    const [isLoading,setIsLoading] = useState(false)   
    const [showItems,setShowItems] = useState("wishList")
    const getUseData = useCallback(()=>{
        let token = localStorage.getItem("token")
        axios.get(`${url}/api/v1/users/profile`,{headers:{"x-access-token":token}})
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
    } ,
    [logout,setUserData,userData],
)
    useEffect(()=>{        
    if(Object.keys(userData).length===0){
        getUseData()
    }else{
        setIsLoading(true)
    }    
    },[getUseData,userData])  
        
    
    const showSideBar = ()=>{
        let sideBar  = document.getElementById("profile");
        console.log(sideBar.style.left)
        if(sideBar.style.left=== "0px"){
            sideBar.style.left='-1000px';
        }else{          
            sideBar.style.left=0;
        }
    }

    if(!isLoading){
     return   <div id="profile">...Loading</div>
    }
    return (
        <div id="profileContainer">
            <div className="sideBar" onClick={showSideBar}>
                <AiOutlineBars height="1fr" width="1fr"/>
            </div>
            <ProfileSideBar showItems={showItems} setShowItems={setShowItems}/>
           { showItems === "wishList"?
            <WishList showItems={showItems}  />:
            <OrdersList />
            }  
         </div>
    )    
}
export default Profile