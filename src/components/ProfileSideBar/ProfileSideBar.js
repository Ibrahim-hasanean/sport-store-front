import React from 'react'
import profileImage from "../../assets/icons/profile.png";
import wishList from "../../assets/icons/wishList.png";
import orders from "../../assets/icons/orders.png";
import settingsIcon from "../../assets/icons/settings.png";
import helpCenter from "../../assets/icons/hekpCenter.png";
import aboutUs from "../../assets/icons/aboutus.png";
import shippingAddress from "../../assets/icons/shippingAddress.png";
import useContext from "../../context/AuthContext";
import "./ProfileSideBar.css";
const ProfileSideBar = ({setShowItems,showItems}) => {
    let {userData} = useContext(); 
    const selectShowItems = (e)=>{
        let name=  e.target.getAttribute("name")
        setShowItems(name)
    }
    console.log(showItems)
    return (
        <div  id="profile">
                <div id="userProfileName">
                    <div>
                        <h2>{userData.name}</h2>
                        <p>{userData.email}</p>
                    </div>   
                    <img src={profileImage} alt="profile" />            
                </div>
                <div className="profileContainer">     
                {   showItems ==="wishList"?      
                        <label  name="wishList" className="profileItemsSelect"><img name="wishList" src={wishList} alt="wish list"/>  <b name="wishList">Wish List</b></label>:
                        <label onClick={selectShowItems}  name="wishList"><img name="wishList" src={wishList} alt="wish list"/>  <b name="wishList">Wish List</b></label>
                }
                { showItems ==="orders"? 
                        <label className="profileItemsSelect" name="orders"><img src={orders} alt="orders"/> <b>Orders</b></label>:
                        <label onClick={selectShowItems} name="orders"><img name="wishList" src={orders} alt="orders"/> <b name="orders">Orders</b></label>
                }
                        <p>to be shipped</p>
                        <p>shipped</p>
                </div>
                <div className="profileContainer">                
                        <label><img src={settingsIcon} alt="wish list"/>  <b>Settings</b></label>
                        <label><img style={{height:"25px"}} src={shippingAddress} alt="orders"/> <b>Shipping Address</b></label>
                        <label><img src={helpCenter} alt="wish list"/>  <b>Help Center</b></label>
                        <label><img src={aboutUs} alt="orders"/> <b>About Us</b></label>                    
                </div>
            </div>
    )
}

export default ProfileSideBar
