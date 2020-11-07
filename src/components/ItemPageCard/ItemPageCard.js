import React from 'react'
import getCard from "../ItemCard/ItemCard";
import styled from "styled-components";
import "./itemPageCard.css"
const ItemDetails = ({image}) => {   
    let card = getCard(image)
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
                <div id="slider">                    
                </div>
        </Card> 
    )
}

export default ItemDetails
