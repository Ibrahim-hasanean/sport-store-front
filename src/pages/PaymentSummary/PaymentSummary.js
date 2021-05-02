import React, { useState, useEffect, useCallback } from "react";
import "./PaymentSummary.css";
import SummaryItem from "../../components/PaymentSummaryItems/PaymentSummaryItems";
import { Redirect, useHistory } from "react-router-dom";
import PaymentContext from "../../context/PaymentContext";
const PaymentSummary = (props) => {
  const [buy, setBuy] = useState(false);
  const [items, setItems] = useState([]);
  const history = useHistory();
  let {
    totalPrice,
    setTotalPrice,
    buyItems,
    setBuyItems,
    buyOneItem,
  } = PaymentContext();
  const getTotalPrice = useCallback(
    async (items) => {
      let result = 0;
      for (let i = 0; i < items.length; i++) {
        console.log(items[i].price);
        if (!items[i].checked) continue;
        result = result + items[i].price * items[i].quantity;
      }
      setTotalPrice(result);
    },
    [setTotalPrice]
  );
  useEffect(() => {
    setItems([...(buyOneItem.length === 0 ? buyItems : buyOneItem)]);
    getTotalPrice([...(buyOneItem.length === 0 ? buyItems : buyOneItem)]);
    console.log(buyItems);
  }, [getTotalPrice, buyItems, buyOneItem]);

  const buyNow = () => {
    const fiterItems = items.filter((x) => x.checked);
    setBuyItems(fiterItems);
    setBuy(true);
    history.push({
      pathname: "/items/payment/userDetailes",
      state: { items: fiterItems },
    });
  };

  //    if(buy && buyItems){
  //       return <Redirect to={{
  //            pathname:"/items/payment/userDetailes",
  //        }} />
  //    }
  return (
    <div id="summaryContainer">
      <h2>summary</h2>
      <div id="summaryItemsContainer">
        {items.map((item, index) => {
          return (
            <SummaryItem
              items={buyItems}
              setItems={setBuyItems}
              getTotalPrice={getTotalPrice}
              key={index}
              index={index}
              item={item}
            />
          );
        })}
        <div id="paymentResult">
          <div>${totalPrice}</div>
          <button onClick={buyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
