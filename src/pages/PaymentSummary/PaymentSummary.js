import React,{useState,useEffect} from 'react';
import "./PaymentSummary.css";
import SummaryItem from "../../components/PaymentSummaryItems/PaymentSummaryItems"
import { Redirect } from 'react-router-dom';
import PaymentContext from "../../context/PaymentContext";
const PaymentSummary = (props) => {    
    // const [items,setItems] = useState(props.location.state.items);   
    //const [totalPrice,setTotalPrice] = useState(0);
    const [buy,setBuy] = useState(false);
    //const [buyItems,setBuyItems] = useState(null)
    let {totalPrice,setTotalPrice,buyItems,setBuyItems} = PaymentContext();
    useEffect(()=>{
        getTotalPrice(buyItems)
    },[totalPrice,buyItems]);
    const getTotalPrice =async (items)=>{
        let result= 0;
        console.log(totalPrice)
        for(let i = 0; i< items.length;i++){
            //(items[i].price * items[i].quantity)
            console.log(items[i].price)
            if(!items[i].checked) continue;
            result = result +  (items[i].price * items[i].quantity)  
        }
        setTotalPrice(result)
        console.log(totalPrice)
    }

   const buyNow=()=>{
    const items = buyItems.filter(x=>x.checked);
    setBuyItems(items)
    setBuy(true)
   }

   if(buy && buyItems){
      return <Redirect to={{
           pathname:"/items/payment/userDetailes",           
       }} />
   }
    return (
        <div id="summaryContainer">
            <h2>summary</h2>
            <div id="summaryItemsContainer">  
            {  buyItems.map((item,index)=>{
              return  <SummaryItem items={buyItems} setItems={setBuyItems} getTotalPrice={getTotalPrice} key={index} index={index}  item={item} />
            })               
            }
            <div id="paymentResult">
                <div>${totalPrice}</div>
                <button onClick={buyNow}>Buy Now</button>
            </div>            
            </div>
        </div>
    )
}

export default PaymentSummary
