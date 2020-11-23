import style from "styled-components";
import Card from "./ItemCard";
let ProfileWishItemsCard = style(Card)`
grid-template-areas: "card card fav"
                    "card card ."
                    "team . price"
;
height:400px;
width:${ ({width}) => (width) || "30%"};
@media only screen and (max-width:765px){
width:90%;
}
`    
export default ProfileWishItemsCard;

