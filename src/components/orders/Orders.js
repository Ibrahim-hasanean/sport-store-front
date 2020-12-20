import React,{useState,useEffect} from 'react';
import "./orders.css";
import OrderCard from "../OrderCard/OrderCard";
import axios from "axios";
const Orders = () => {
    let url = process.env.REACT_APP_BACKEND_URL; 

    const [orders,setOrders] = useState([]);
    const [isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        getOrders()
    },[])
    const getOrders = async ()=>{
        let token = localStorage.getItem("token")
        try {
            const getOrders = await axios.get(`${url}/api/v1/items?orders=true`,{
                headers:{
                    "x-access-token":token
                }
            })
            setOrders(getOrders.data.items)
            console.log(getOrders.data.items)
            setIsLoading(false)
        } catch (e) {
            console.log(e)
        }
        
    }

    if(isLoading){
        return(
        <div id="ordersContainer">
            <div>...Loading</div>
        </div>
        )
    }
    return (
        <div id="ordersContainer">
            <h2>Your Orders</h2>
                <div id="orders">
                    {
                        orders.length ===0? <h3>you do  not orders </h3>
                        :
                        orders.map((order,index)=>{
                            return <OrderCard order={order} key={index} />
                        })
                    }
                </div> 
        </div>
    )
}

export default Orders
