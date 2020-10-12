import React from 'react';
import "./homeItemCard.css";
import style from "styled-components";
import itemCard from "../ItemCard/ItemCard";
import LikeComponent from "../likeComponent/likeComponent";
function HomeItemCard({item}) {    
    let getCard = itemCard(item.mainImage)
    const Card = style(getCard)`
        grid-template-areas: "card card fav"
                            "card card ."
                            "team . price"
;
    `    
    let onCardClick=()=>{
        window.location.href = `/item/${item._id}`;
    }
    return (
        <Card>
        <LikeComponent item={item}/>           
            <div id="card" onClick={onCardClick}></div>
                <div id="team">
                <p>{item.team}</p>
                <p>{item.category}  {item.season}</p>
                </div>
                <div id="price">
                    <h2>${item.price}</h2>
            </div>

        </Card>
    )
}

export default HomeItemCard
