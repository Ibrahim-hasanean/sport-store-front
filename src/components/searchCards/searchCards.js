import React from 'react'
import getCard from "../ItemCard/ItemCard"
 const SearchCards = ({item}) => {
     
    const Card = getCard(item.mainImage)
    return (
        <Card />
    )
}
export default SearchCards;
