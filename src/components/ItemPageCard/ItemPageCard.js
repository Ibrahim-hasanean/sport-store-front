import React from 'react'
import "./itemPageCard.css"
import Card from "../../styled-component/ItemPageCard";
const ItemDetails = ({image,className}) => {          
    return (
        <Card imageURL={image} className={className} id="hotDeals"> 
                <div id="slider">                    
                </div>
        </Card> 
    )
}

export default ItemDetails
