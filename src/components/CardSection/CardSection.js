import React from 'react'
import {CardElement} from "@stripe/react-stripe-js";
import "./cardSection.css";
const CardSection = () => {
    let CARD_SECTION_OPTION = {
        iconStyle: "solid",
        hidePostalCode: true,
        style: {
          base: {
            iconColor: "rgb(240, 57, 122)",
            color: "rgb(240, 57, 122)",
            fontSize: "16px",
            fontFamily: '"Open Sans", sans-serif',
            fontSmoothing: "antialiased",
            "::placeholder": {
              color: "#CFD7DF"
            },
            "@media only screen and (width:768px)":{
              fontSize: "25%",
              width:"80%"
            },
            

          },        
          invalid: {
            color: "#e5424d",
            ":focus": {
              color: "#303238"
            }
          }
        }
    }
    return (
    <div className="cardsElements">    
    <CardElement className="card" options={CARD_SECTION_OPTION}/>   
     {/* <CardNumberElement className="card" options={CARD_SECTION_OPTION}/>
      <div>
        <CardCvcElement className="card" options={CARD_SECTION_OPTION}/>
        <CardExpiryElement className="card" options={CARD_SECTION_OPTION}/>
      </div>  */}
    </div>   
      
    )
}

export default CardSection
