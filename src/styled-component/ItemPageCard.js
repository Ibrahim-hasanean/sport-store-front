import styled from "styled-components";
import Card from "./ItemCard"
const ItemPageCard = styled(Card)`
        grid-template-areas: "top top icons"
                        "leftButton middle rightButton"
                        "team slider price" ;
                    
    height: 500px;
    width:400px; 
    margin:0;    
    color:whit;
    @media only screen and  (max-width: 1024px) and (min-width: 768px)  {
    height: 700px;
    width: 600px; 
    }
    `
 export default ItemPageCard;   