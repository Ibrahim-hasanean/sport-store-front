import styled from "styled-components";
import ItemCard from "./ItemCard";

let Card =styled(ItemCard)`
    grid-template-areas: "top top icon"
                        "leftButton middle rightButton"
                        "team slider discount" ;
                    
    height: 500px;
    width:700px; 
    margin:0;    
    color:whit;    
    @media only screen and (width:768px){
        height:700px
    }
    @media only screen and  (max-width: 1024px) and (min-width: 800px)  {
        width: 950px;
        height: 700px;
    }
    `    
export default Card
