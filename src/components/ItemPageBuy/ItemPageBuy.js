import React,{useState} from 'react';
import "./ItemPageBuy.css";
import LikeComponent from "../likeComponent/likeComponent"
import { Redirect } from 'react-router-dom';
import PaymentContext from "../../context/PaymentContext";
const ItemPageBuy = ({item,quantity}) => {  
    const [buyItem,setBuyItem] = useState(false) 
    const [isItemInCard,setIsItemInCard] = useState(false) 
    const {buyItems,setBuyItems} = PaymentContext();
    console.log(quantity)
    let buyNow =  () =>{
        setBuyItem(true)
        setBuyItems([...buyItems,{...item,quantity,checked:true}])        
    }
    let addToCard = ()=>{        
        setBuyItems([...buyItems,{...item,quantity,checked:true}])
        setIsItemInCard(true)
        localStorage.setItem("cartItems",[...buyItems,{...item,quantity,checked:true}])
    }
    let removeToCard = ()=>{
        let items = buyItems.filter(x=>x._id !== item._id)       
        setBuyItems([...items])
        setIsItemInCard(false)
        localStorage.setItem("cartItems",[...items])
    }

    if(buyItem){
        return <Redirect to={{
            pathname:"/items/payment/summary",
            // state:{
            //     items:[{...item,quantity,checked:true}]
            // }          
        }} />
    }
    return (
        item === undefined ?
         <div><h3>...Loading</h3></div>:
        <div id="itemBuyContainer">        
            <div id="likeDivContainer">
                <LikeComponent item={item}/>            
            </div>
            <button onClick={buyNow} className="buybutton">Buy now</button>
            {isItemInCard?
            <button onClick={removeToCard} className="cartbutton">remove from cart</button>:      
            <button onClick={addToCard} className="cartbutton">Add cart</button>  
            }
            
        </div>        
    )
}

export default ItemPageBuy
