import React,{useState,useEffect,useCallback} from 'react';
import "./PaymentSummary.css";
import SummaryItem from "../../components/PaymentSummaryItems/PaymentSummaryItems"
import { Redirect } from 'react-router-dom';
import PaymentContext from "../../context/PaymentContext";
const PaymentSummary = (props) => {
    const [buy,setBuy] = useState(false);
    let {totalPrice,setTotalPrice,buyItems,setBuyItems} = PaymentContext();
    const getTotalPrice =useCallback(async (items)=>{
        let result= 0;
            for(let i = 0; i< items.length;i++){           
            console.log(items[i].price)
            if(!items[i].checked) continue;
            result = result +  (items[i].price * items[i].quantity)  
        }
        setTotalPrice(result)
        }
,
    [setTotalPrice],
) 
    useEffect(()=>{
        getTotalPrice(buyItems)
    },[getTotalPrice,buyItems]);
    
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
