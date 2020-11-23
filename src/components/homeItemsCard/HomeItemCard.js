import React,{useState} from 'react';
import "./homeItemCard.css";
import LikeComponent from "../likeComponent/likeComponent";
import Card from "../../styled-component/HomeItemCard";
import {Redirect} from "react-router-dom"
function HomeItemCard({item,width,className}) {   
    const [selectItem,setSelectItem]= useState(false);
    let onCardClick=()=>{
        setSelectItem(true)
    }
    if(selectItem){
        return <Redirect to={{
            pathname:`/item/${item._id}`
        }       
        } />
    }
    return (
        <Card imageURL={item.mainImage} width={width} className={className}>
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
