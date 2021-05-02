import React, { useState } from "react";
import "./PaymentSummaryItems.css";
import SummaryItemDetailes from "../PaymentItemDetailes/PaymentItemDetailes";
import checked from "../../assets/icons/checked.png";
const PaymentSummaryItems = ({
  item,
  getTotalPrice,
  items,
  index,
  setItems,
  size,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [itemChecked, setItemChecked] = useState(item.checked);
  const toggleChecked = () => {
    console.log("toggle checked");
    let toggleItem = item;
    toggleItem.checked = !toggleItem.checked;
    console.log(toggleItem);
    const newItems = items;
    newItems[index] = toggleItem;
    setItems(newItems);
    setItemChecked(toggleItem.checked);
    getTotalPrice(newItems);
  };

  return (
    <div className="summaryItem">
      <div className="summaryItemImg">
        <img src={item.mainImage} alt="item cover" />
      </div>
      <div className="summaryItemTeam">
        <h3>{item.team}</h3>
        <p>
          {item.type} {item.category} {item.season}
          {item.playerName || ""}
        </p>
      </div>
      <div className="summaryItemChecked">
        {itemChecked ? (
          <img onClick={toggleChecked} src={checked} alt="checked" />
        ) : (
          <div onClick={toggleChecked} className="unchecked"></div>
        )}
      </div>
      <div className="summaryItemPrice">
        <p>${item.price}</p>
      </div>
      <SummaryItemDetailes
        items={items}
        index={index}
        setItems={setItems}
        getTotalPrice={getTotalPrice}
        setQuantity={setQuantity}
        quantity={quantity}
        size={item.size}
      />
    </div>
  );
};

export default PaymentSummaryItems;
