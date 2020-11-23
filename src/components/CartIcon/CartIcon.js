import React,{useState} from 'react';
import "./CartIcon.css";
import ShoppingIcon from "../../assets/icons/shopping.png";
import style from "styled-components";
import PaymentContext from "../../context/PaymentContext";
import { Redirect } from 'react-router-dom';
let Icon = style.div`
position: fixed;
width: 80px;
height: 80px;
top: 100px;   
background-image: url(${ShoppingIcon});
background-size: 100% 100%;
background-repeat: no-repeat;  
z-index:4;
@media (max-width: 480px){        
    width: 60px;
    height: 60px;
    top: 60px;
    left: 0;    
} 
@media only screen and  (max-width: 1024px) and (min-width: 768px)  {
    width: 100px;
    height: 100px; 
} 
  
`;
const CartIcon = () => {
    let {buyItems} = PaymentContext();
    const [showCartItems,setShowCartItems] = useState(false)
   
    let getCartItems = ()=>{
        if(buyItems.length>0) setShowCartItems(true);       
    }
    if(showCartItems){
        return <Redirect to={{
            pathname:"/items/payment/summary"
        }} />
    }
    return (
        <Icon  onClick={getCartItems} className="cartIcon">
            <p>{buyItems.length}</p>
        </Icon>
    )
}

export default CartIcon
