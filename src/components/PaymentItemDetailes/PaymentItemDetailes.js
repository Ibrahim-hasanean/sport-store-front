import React from 'react'
import "./PaymentItemDetailes.css";
const PaymentItemDetailes = ({quantity,setQuantity,onchange,getTotalPrice,items,index,setItems}) => {
    const increaseQuantity = ()=>{        
        setQuantity(quantity+1)        
        let newItems = items;       
        newItems[index].quantity= quantity+1; 
        setItems(newItems)
        getTotalPrice(newItems)              
       
    } 
    const decreaseQuantity = ()=>{
        if(quantity>1){
            setQuantity(quantity-1);           
            let newItems = items;       
            newItems[index].quantity= quantity-1;             
            setItems(newItems)
            getTotalPrice(newItems);
        }
    } 
    return (
        <div className="summaryItemDetailes">
                <label>Size</label>
                <select name="size" onChange={onchange}>
                    <option value="x-large">XL</option>
                    <option value="xx-large">XXL</option>
                    <option value="large">L</option>
                    <option value="medium">M</option>
                </select>
                <label>Quantity</label>
                <button name="quantity" onClick={increaseQuantity} >+</button>
                <label id="quantity" onChange={onchange}>{quantity}</label>                        
                <button onClick={decreaseQuantity} name="quantity">-</button>
            </div>     
    )
}

export default PaymentItemDetailes
