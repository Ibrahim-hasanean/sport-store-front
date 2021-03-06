import React, { useState } from "react";
import "./hotDeals.css";
import Card from "../../styled-component/hotDealsCard";
import { Redirect, useHistory } from "react-router-dom";

function HotDealsCard({ hotItem, index }) {
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  let onCardClick = () => {
    // setRedirect(true);
    history.push(`/item/${hotItem._id}`);
  };
  // if (redirect) {
  //   return (
  //     <Redirect
  //       from="/"
  //       to={{
  //         pathname: `/item/${hotItem._id}`,
  //       }}
  //     />
  //   );
  // }
  return (
    <Card imageURL={hotItem.mainImage} onClick={onCardClick} id="hotDeals">
      <p id="topIcon">HOT DEALS</p>
      <div id="team">
        <h3>{hotItem.team}</h3>
        <p id="itemSeason">{hotItem.type + "" + hotItem.season}</p>
      </div>
      <div id="slider"></div>
      <div id="discount">
        <p>{hotItem.discount} off</p>
        <p>{hotItem.price}</p>
      </div>
    </Card>
  );
}

export default HotDealsCard;
