import "./ProfileWishItemsCard.css"
import React,{useState} from 'react';
import LikeComponent from "../likeComponent/likeComponent";
import {Redirect} from "react-router-dom";
import Card from "../../styled-component/ProfileWishItemsCard"
function ProfileWishItemsCard({item,width,className}) {   
    const [selectItem,setSelectItem]= useState(false)
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
        <Card width={width} imageURL={item.mainImage} className={className}>
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

export default ProfileWishItemsCard

