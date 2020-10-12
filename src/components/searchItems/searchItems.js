import React from 'react';
import "./searchItems.css";
//import Card from "../searchCards/searchCards";
import Card from "../homeItemsCard/HomeItemCard";
const SearchItems = ({items,searchText}) => {   
    console.log(items) 
    let back=()=>{
        window.location.href = "/";
    }
    return (
        <div id="searchResult">  
        <div id="searchHeader" >                    
            <button onClick={back} id="backButton">{"< Back"}</button>
            <h3>result for: "{searchText}"</h3>            
        </div>
            <div id="searchItemsContainer">        
            {     items.map((item,index)=>{
                    return <Card item={item} key={index}/>
                })}
            </div>   
        </div>   
    )
}

export default SearchItems
