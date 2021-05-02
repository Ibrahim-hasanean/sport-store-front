import React from "react";
import "./NewProfileSideBar.css";
import defaultProfileImage from "../../assets/icons/profile.png";
const NewProfileSideBar = ({ imageSource }) => {
  return (
    <div className="NewProfileSideBar">
      <img src={imageSource || defaultProfileImage} alt="profile" />
      <h3>Ibrahim Hasanean</h3>
      <p>Ibrahim@asda.com</p>
      <p>Palestine , gaza</p>
      <p>orders number: 10</p>
    </div>
  );
};

export default NewProfileSideBar;
