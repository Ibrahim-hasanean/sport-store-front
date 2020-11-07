import React , {useState} from 'react';
import CardSection from "../CardSection/CardSection";
import PaymentContext from "../../context/PaymentContext";
import {CardElement ,useElements,useStripe} from "@stripe/react-stripe-js";
import "./paymentForm.css";
import axios from "axios";
import { Redirect } from 'react-router-dom';
const PaymentForm = ({userDetailesId}) => {
    let {totalPrice,buyItems,setBuyItems,setPaymentSuccess} = PaymentContext();
    const [confirmPayment,setConfirmPayment] = useState(false)
    const elements = useElements();
    const stripe = useStripe()
    console.log(buyItems)
    let handleSubmit = async event => {
        event.preventDefault();    
        //const { stripe, elements } = props;
        if (!stripe || !elements) {
          return;
        }   
        
      try{
        let token = localStorage.getItem("token")
        const response= await axios.post("https://sportstore1.herokuapp.com/api/v1/payments",{
          items:buyItems,userDetailesId,amount:totalPrice
        },{headers:{
          "x-access-token":token
        }})
        
        const card = elements.getElement(CardElement);
        const paymentMethod = await stripe.createPaymentMethod({
        type:"card",
        card
      })
      const confirmCardPayment = await stripe.confirmCardPayment(response.data.clientSecret,{
        payment_method:paymentMethod.paymentMethod.id
      })
      setConfirmPayment(true)
        } catch (e) {
          console.log(e)
        }     
           
      };  

    if(!totalPrice){
      return <Redirect to={{
       pathname : '/'
      }} />
    }

    if(confirmPayment){
      setBuyItems([]);
      setPaymentSuccess(true)
      return <Redirect to={{
        pathname : '/'
       }} />
    }

    return (
        <div className="paymentForm">    
          <form onSubmit={handleSubmit}>
              <CardSection />
              <div className="totalPrice">
                <p>Total Price </p>
                <p>${totalPrice}</p>
              </div>
              <button>Buy Now</button>
              <button>Cancel</button>
          </form>
        
        </div>
    )
}

export default  PaymentForm;
// export default function  InjectedCheckoutForm() {
//     return (
//       <ElementsConsumer>
//         {({ stripe, elements }) => (
//           <PaymentForm stripe={stripe} elements={elements} />
//         )}
//       </ElementsConsumer>
//     );
//   }
