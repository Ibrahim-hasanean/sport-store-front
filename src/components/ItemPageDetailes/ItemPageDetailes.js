import React from 'react'
import "./ItemPageDetailes.css"
const ItemPageDetailes = ({onchange,increaseQuantity,decreaseQuantity,quantity}) => {   
    
    return (                   
            <div  className="itemDetailes">
                <label className="pageDetailesLabel">Size</label>
                <select name="size" onChange={onchange}>
                    <option value="x-large">XL</option>
                    <option value="xx-large">XXL</option>
                    <option value="large">L</option>
                    <option value="medium">M</option>
                </select>
                <label className="pageDetailesLabel">Quantity</label>
                <button name="quantity" onClick={increaseQuantity} >+</button>
                <label className="pageDetailesLabel" id="quantity" onChange={onchange}>{quantity}</label>                        
                <button onClick={decreaseQuantity} name="quantity">-</button>
            </div>          
       
    )
}

export default ItemPageDetailes
