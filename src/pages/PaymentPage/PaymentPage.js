import React from 'react';
import "./PaymentPage.css";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
const stripe = loadStripe("pk_test_2zDNMKETBDw5qkdtRu2SGBdc00lOXvF9dD")
const PaymentPage = (props) => {
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
