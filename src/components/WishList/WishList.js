import React,{useState,useEffect} from 'react';
import axios from "axios";
import "./WishList.css";
// import Card from "../homeItemsCard/HomeItemCard"
import Card from "../ProfileWishItemsCard/ProfileWishItemsCard"
const WishList = ({items}) => {
    let url = process.env.REACT_APP_BACKEND_URL; 

    const [wishList,setWishList] = useState([])
    const [isLoading,setIsLoading] = useState(true);
    useEffect(()=>{
        getWishList()
    },[])
    const getWishList = async ()=>{
        let token = localStorage.getItem("token"); 
        try {
            let result =  await axios.get(`${url}/api/v1/items?wishList=true`,{
                headers:{
                    "x-access-token":token
                }
            })
            console.log(result)
            setWishList(result.data.items)
            setIsLoading(false)
        } catch (e) {
            console.log(e)
        }   
        

    }
    if(isLoading){
        return <div id="wishListContainer">...Loading</div>
    }

    return (
        <div id="wishListContainer">
        <h3>Your Wish List</h3>       
            <div  id="wishList">
                {wishList.length === 0?
                    <h3>there is no wish list</h3>:
                    wishList.map((item,index)=><Card width="40%" key={index} item={item} /> )
                }
            </div>
            
        </div>
    )
}

export default WishList
