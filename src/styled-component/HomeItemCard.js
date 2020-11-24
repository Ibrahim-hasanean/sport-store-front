import style from "styled-components";
import Card from "./ItemCard";
const HomeItemCard = style(Card)`
        grid-template-areas: "card card fav"
                            "card card ."
                            "team . price"
;
    height:400px;
    width:${ ({width}) => `(${width})` || "30%"};
    @media only screen and (max-width: 768px)  {
        width:90%;
        height:450px;
    }
    @media only screen and  (max-width: 1024px) and (min-width: 768px)  {
        width:45%;
        height:450px;
    }
    `    
export default HomeItemCard;