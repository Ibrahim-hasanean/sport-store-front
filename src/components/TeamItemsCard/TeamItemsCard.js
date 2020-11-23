import React,{useState} from 'react';
import "./TeamItemsCard.css";
import LikeComponent from "../likeComponent/likeComponent"
import { Redirect } from 'react-router-dom';
import Card from "../../styled-component/TeamItemCard";
const TeamItemsCard = ({item}) => {
    const [selectItem,setSelectItem] = useState(false)   
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
        <Card imageURL={item.mainImage}>
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
