import React, { useState } from "react";
import "./ItemPageBuy.css";
import LikeComponent from "../likeComponent/likeComponent";
import { Redirect, useHistory, Link } from "react-router-dom";
import PaymentContext from "../../context/PaymentContext";
const ItemPageBuy = ({ item, quantity, size }) => {
  const [buyItem, setBuyItem] = useState(false);
  const [isItemInCard, setIsItemInCard] = useState(false);
  const { buyItems, setBuyItems, setBuyOneItem } = PaymentContext();
  const history = useHistory();
  let buyNow = () => {
    setBuyItem(true);
    // setBuyItems([{ ...item, quantity, checked: true }]);
    setBuyOneItem([{ ...item, quantity, checked: true }]);
    history.push("/items/payment/summary");
  };
  let addToCard = () => {
    setBuyItems([...buyItems, { ...item, quantity, checked: true, size }]);
    setIsItemInCard(true);
    localStorage.setItem("cartItems", [
      ...buyItems,
      { ...item, quantity, checked: true },
    ]);
  };
  let removeToCard = () => {
    let items = buyItems.filter((x) => x._id !== item._id);
    setBuyItems([...items]);
    setIsItemInCard(false);
    localStorage.setItem("cartItems", [...items]);
  };

  return item === undefined ? (
    <div>
      <h3>...Loading</h3>
    </div>
  ) : (
    <div id="itemBuyContainer">
      <div id="likeDivContainer">
        <LikeComponent item={item} />
      </div>
      <button onClick={buyNow} className="buybutton">
        Buy now
      </button>
      {isItemInCard ? (
        <button onClick={removeToCard} className="cartbutton">
          remove from cart
        </button>
      ) : (
        <button onClick={addToCard} className="cartbutton">
          Add cart
        </button>
      )}
    </div>
  );
};

export default ItemPageBuy;
