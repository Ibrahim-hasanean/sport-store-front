import React,{useState} from 'react';
import "./PaymentPage.css";
import PaymentMethod from "../../components/PaymentMethod/PaymentMethod";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
const stripe = loadStripe("pk_test_2zDNMKETBDw5qkdtRu2SGBdc00lOXvF9dD")
const PaymentPage = (props) => {
    const [paymentMethod,setPaymentMethod] = useState();
    return (
        <div id="paymentPage">
            {/* <PaymentMethod paymentMethod={paymentMethod}  setPaymentMethod={setPaymentMethod}/> */}
            <Elements stripe={stripe}>  
                 <PaymentForm userDetailesId={props.location.state.userDetailesId} />
            </Elements>
        </div>
    )
}

export default PaymentPage
