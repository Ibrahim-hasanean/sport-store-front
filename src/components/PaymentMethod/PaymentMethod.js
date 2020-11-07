import React from 'react';
import "./PaymentMethod.css";
import paypal from "../../assets/icons/paypal.png";
import mastercard from "../../assets/icons/mastercard.png";
import visa from "../../assets/icons/visa.png"
const PaymentMethod = ({setPaymentMethod,paymentMethod}) => {
    let electPaymentMethod = (e) =>{
        if(paymentMethod === e.target.name ){
           return setPaymentMethod(null)
        }
        setPaymentMethod(e.target.name)
    }
    return (
        <div id="paymentMethod">
            <p>payment methods</p>
            <div>
            {paymentMethod === "paypal"?
                <img className="paymentMethod" name="paypal" onClick={electPaymentMethod} src={paypal} alt="paypal" />:
                <img name="paypal" onClick={electPaymentMethod} src={paypal} alt="paypal" />

            }
            {paymentMethod === "mastercard"?
                <img className="paymentMethod" name="mastercard" onClick={electPaymentMethod} src={mastercard} alt="mastercard" />:
                <img name="mastercard" onClick={electPaymentMethod} src={mastercard} alt="mastercard" />
            }
            {paymentMethod === "visa"?
                <img className="paymentMethod" name="visa" onClick={electPaymentMethod} src={visa} alt="visa" />:
                <img name="visa" onClick={electPaymentMethod} src={visa} alt="visa" />
            }
            </div>
        </div>
    )
}

export default PaymentMethod
