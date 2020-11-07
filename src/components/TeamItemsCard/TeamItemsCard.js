import React,{useState} from 'react';
import getCard from "../ItemCard/ItemCard";
import styled from "styled-components"
import "./TeamItemsCard.css";
import LikeComponent from "../likeComponent/likeComponent"
import { Redirect } from 'react-router-dom';
const TeamItemsCard = ({item}) => {
    const [selectItem,setSelectItem] = useState(false)
    const card = getCard(item.mainImage);
    const Card= styled(card)`   
        height:350px;
        display:grid;
        grid-template-areas:"card card fav"
                            " card card ."
                            "team . price";
    `
    let onCardClick=()=>{
        setSelectItem(true)
        // window.location.href = `/item/${item._id}`;
    }
    if(selectItem){
        return <Redirect to={{
            pathname: `/item/${item._id}`
        }} />
    }
    return (
        <Card>
            <div className="teamCardItem">
                <p>{item.gender} {item.category} {item.season}</p>
            </div>
            <LikeComponent item={item}/>
            <div id="teamPrice">${item.price}</div>
            <div onClick={onCardClick} id="teamCard"></div>
        </Card>
    )
}

export default TeamItemsCard
