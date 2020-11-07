import React,{useState} from 'react';
import "./homeItemCard.css";
import style from "styled-components";
import itemCard from "../ItemCard/ItemCard";
import LikeComponent from "../likeComponent/likeComponent";
import {Redirect} from "react-router-dom"
function HomeItemCard({item}) {   
    const [selectItem,setSelectItem]= useState(false)
    let getCard = itemCard(item.mainImage);
    const Card = style(getCard)`
        grid-template-areas: "card card fav"
                            "card card ."
                            "team . price"
;
    height:400px;
    `    
    let onCardClick=()=>{
        //window.location.href = `/item/${item._id}`;
        setSelectItem(true)
    }
    if(selectItem){
        return <Redirect to={{
            pathname:`/item/${item._id}`
        }       
        } />
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
