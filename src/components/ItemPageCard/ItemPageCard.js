import React from 'react'
import getCard from "../ItemCard/ItemCard";
import styled from "styled-components";
import "./itemPageCard.css"
const ItemDetails = ({item}) => {   
    let card = getCard(item.imageURL)
    const Card = styled(card)`
        grid-template-areas: "top top icons"
                        "leftButton middle rightButton"
                        "team slider price" ;
                    
    height: 500px;
    width:400px; 
    margin:0;    
    color:whit;
    `
    
    
    return (
        <Card id="hotDeals">                              
                <div id="itemDetaisTeam">
                    <h2>{item.team}</h2>
                    <p>{item.type+""+  item.season}</p>
                </div>
                <div id="slider">                    
                </div>
                <div id="itemDetaisDiscount">                   
                    <p>${item.price}</p>
                </div>
        </Card> 
    )
}

export default ItemDetails
