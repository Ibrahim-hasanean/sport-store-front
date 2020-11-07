import React,{useState} from 'react';
import "./CartIcon.css";
import ShoppingIcon from "../../assets/icons/shopping.png";
import style from "styled-components";
import PaymentContext from "../../context/PaymentContext";
import { Redirect } from 'react-router-dom';
const CartIcon = () => {
    let {buyItems} = PaymentContext();
    const [showCartItems,setShowCartItems,paymentSuccess] = useState(false)
    let Icon = style.div`
        position: fixed;
        width: 80px;
        height: 80px;
        top: 100px;   
        background-image: url(${ShoppingIcon});
        background-size: 100% 100%;
        background-repeat: no-repeat;    
    `;
    let getCartItems = ()=>{
        if(buyItems.length>0) setShowCartItems(true);       
    }
    if(showCartItems){
        return <Redirect to={{
            pathname:"/items/payment/summary"
        }} />
    }
    return (
        <Icon onClick={getCartItems} className="cartIcon">
            <p>{buyItems.length}</p>
        </Icon>
    )
}

export default CartIcon
