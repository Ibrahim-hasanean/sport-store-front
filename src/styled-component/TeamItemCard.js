import styled from "styled-components"
import Card from "./ItemCard";
const TeamItemCard= styled(Card)`   
    height:350px;
    display:grid;
    grid-template-areas:"card card fav"
                        " card card ."
                        "team . price";

    @media only screen and (max-width:765px){
        width:90%
    }
    @media only screen and  (max-width: 1024px) and (min-width: 768px)  {
        width:45%;
        height:440px;       
    
    }

`

export default TeamItemCard;