import React, { useEffect } from "react";
import "./PaymentPage.css";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import usePaymentContext from "../../context/PaymentContext";
import { useHistory } from "react-router-dom";
const stripe = loadStripe("pk_test_2zDNMKETBDw5qkdtRu2SGBdc00lOXvF9dD");
const PaymentPage = (props) => {
  const { buyItems, buyOneItem } = usePaymentContext();
  let userDetailsId = props.location.state?.userDetailesId;
  let items = props.location.state?.items;
  let history = useHistory();
  useEffect(() => {
    console.log(buyItems.length, buyOneItem, userDetailsId);
    if ((buyItems.length === 0 && buyOneItem.length === 0) || !userDetailsId) {
      history.push("/");
    }
  }, [buyItems, buyOneItem, userDetailsId, history]);

  return (
    <div id="paymentPage">
      {/* <PaymentMethod paymentMethod={paymentMethod}  setPaymentMethod={setPaymentMethod}/> */}
      <Elements stripe={stripe}>
        <PaymentForm items={items} userDetailesId={userDetailsId} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
