import React,{useState} from 'react';
import "./BuyUserDetailes.css";
import axios from "axios";
import { Redirect } from 'react-router-dom';
const BuyUserDetailes = (props) => {
    const [userDetailes,setUserDetailes] = useState({});
    const [userDetailesId,setUserDetailesId] = useState(null);
    let inputChange=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setUserDetailes({...userDetailes,[name]:value})
    }
    let submitUserDetailes = async()=>{
        console.log(userDetailes)
        try {
            let token = localStorage.getItem("token");
            const sendUserDetailes = await axios.post("https://sportstore1.herokuapp.com/api/v1/payments/userDetailes",userDetailes,{
                headers:{
                    "x-access-token": token
                }
            })
            setUserDetailesId(sendUserDetailes.data.userDetailes._id)
            console.log(sendUserDetailes)
        } catch (e) {
            console.log(e.response)
        }
       
    }
    if(userDetailesId){
        return <Redirect to={{
            pathname:"/items/payment/buy",  
            state : {userDetailesId}         
        }} />
    }
    return (
        <div className="userDetailesContainer">
            <div>
                <h2>shipping</h2>
            </div>
            <div className="userDetailes">
                <label>Full Name</label>
                <input onChange={inputChange} type="text" name="fullName" />
            </div>
            <div className="userDetailes">
                <label>E-mail</label>
                <input onChange={inputChange} type="email" name="email" />
            </div>
            <div className="userDetailes">
                <label>Phone (optional)</label>
                <input onChange={inputChange}  type="number`" name="phoneNumber" />  
            </div>  
            <div className="userDetailes">   
                <label>Country</label>
                <input onChange={inputChange} type="text" name="country" />
            </div>     
            <div className="stateCity">
                <div>
                    <label>State</label>
                    <input onChange={inputChange} type="text" name="state" />
                </div>
                <div>
                    <label>City</label>
                    <input onChange={inputChange} type="text" name="city" />
                </div>
            </div>
            <div className="userDetailes postalCode">
                <label>postal code</label>
                <input onChange={inputChange} type="text" name="postalCode" />
            </div>
            <div className="submitUserDetailes"> 
                <button>Cancel</button>
                <button onClick={submitUserDetailes}>Next</button>
            </div>
        </div>
    )
}

export default BuyUserDetailes
