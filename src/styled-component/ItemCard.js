import style from "styled-components";
const Card = style.div`
        background-image:  ${({imageURL}) => `url(${imageURL})`};
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: relative;
        display: grid;
        grid-template-columns: 3fr 2fr 1fr;
        grid-template-rows: 1fr 2fr 1fr;
            grid-template-areas: "topLeft topcenter topRight"
                                "middleLeft middleCenter  middleRight"
                                "bottomLeft bottomCenter bottomRight"
        ;
        width: 30%;  
        height:300px;   
        margin:15px;
        border-radius:20px;
    `

export default Card