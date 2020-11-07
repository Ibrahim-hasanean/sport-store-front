import React from 'react';
import styled from "styled-components";
import "./hotDeals.css";
import itemCard from "../ItemCard/ItemCard"
function HotDealsCard({hotItem,index}) {
    //const [index,setIndex] = useState(0);
    let getCard = itemCard(hotItem.mainImage);
    let Card =styled(getCard)`
        grid-template-areas: "top top icon"
                            "leftButton middle rightButton"
                            "team slider discount" ;
                        
        height: 500px;
        width:700px; 
        margin:0;    
        color:whit;    
    `    
    console.log(hotItem)
    let onCardClick=()=>{
        window.location.href = `/item/${hotItem._id}`;
    }
    return (        
        <Card onClick={onCardClick} id="hotDeals">
                <p id="topIcon">HOT DEALS</p>               
                <div id="team">
                    <h3>{hotItem.team}</h3>
                    <p>{hotItem.type+""+  hotItem.season}</p>
                </div>
                <div id="slider">                   
                </div>
                <div id="discount">                    
                    <p>{hotItem.discount} off</p>
                    <p>{hotItem.price}</p>
                </div>
        </Card>        
    )
}

export default HotDealsCard
