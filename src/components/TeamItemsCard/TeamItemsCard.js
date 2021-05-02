import React from "react";
import "./TeamItemsCard.css";
import LikeComponent from "../likeComponent/likeComponent";
import { useHistory } from "react-router-dom";
import Card from "../../styled-component/TeamItemCard";

const TeamItemsCard = ({ item }) => {
  const history = useHistory();
  let onCardClick = () => {
    history.push(`/item/${item._id}`);
  };

  return (
    <Card imageURL={item.mainImage}>
      <div className="teamCardItem">
        <p>
          {item.gender} {item.category} {item.season}
        </p>
      </div>
      <LikeComponent item={item} />
      <div id="teamPrice">${item.price}</div>
      <div onClick={onCardClick} id="teamCard"></div>
    </Card>
  );
};

export default TeamItemsCard;
