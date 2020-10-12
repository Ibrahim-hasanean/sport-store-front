import React from 'react';
import "./ItemPageBuy.css";
import LikeComponent from "../likeComponent/likeComponent"
const ItemPageBuy = ({item}) => {           
    console.log(item)
    return (
        item === undefined ?
         <div><h3>...Loading</h3></div>:
        <div id="itemBuyContainer">        
            <div id="likeDivContainer">
            <LikeComponent item={item}/>            
            </div>
            <button>Buy now</button>
            <button>Add cart</button>         
        </div>
        
    )
}

export default ItemPageBuy
