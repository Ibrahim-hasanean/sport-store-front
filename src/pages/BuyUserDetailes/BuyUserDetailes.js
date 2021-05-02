import React, { useState } from "react";
import "./BuyUserDetailes.css";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import usePaymentCotext from "../../context/PaymentContext";
const BuyUserDetailes = (props) => {
  let url = process.env.REACT_APP_BACKEND_URL;
  // const [userDetailes, setUserDetailes] = useState({});
  const [userDetailesId, setUserDetailesId] = useState(null);
  const { userDetailes, setUserDetailes } = usePaymentCotext();
  let items = props.location.state?.items;
  const history = useHistory();
  let inputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserDetailes({ ...userDetailes, [name]: value });
  };
  let submitUserDetailes = async () => {
    console.log(userDetailes);
    try {
      let token = localStorage.getItem("token");
      const sendUserDetailes = await axios.post(
        `${url}/api/v1/payments/userDetailes`,
        userDetailes,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setUserDetailesId(sendUserDetailes.data.userDetailes._id);
      console.log(sendUserDetailes);
    } catch (e) {
      console.log(e.response);
    }
  };
  if (userDetailesId) {
    history.push({
      pathname: "/items/payment/buy",
      state: { userDetailesId, items },
    });
  }
  return (
    <div className="userDetailesContainer">
      <div>
        <h2>shipping</h2>
      </div>
      <div className="userDetailes">
        <label>Full Name</label>
        <input
          value={userDetailes.fullName}
          onChange={inputChange}
          type="text"
          name="fullName"
        />
      </div>
      <div className="userDetailes">
        <label>E-mail</label>
        <input
          value={userDetailes.email}
          onChange={inputChange}
          type="email"
          name="email"
        />
      </div>
      <div className="userDetailes">
        <label>Phone (optional)</label>
        <input
          value={userDetailes.phoneNumber}
          onChange={inputChange}
          type="number`"
          name="phoneNumber"
        />
      </div>
      <div className="userDetailes">
        <label>Country</label>
        <input
          value={userDetailes.country}
          onChange={inputChange}
          type="text"
          name="country"
        />
      </div>
      <div className="stateCity">
        <div>
          <label>State</label>
          <input
            value={userDetailes.state}
            onChange={inputChange}
            type="text"
            name="state"
          />
        </div>
        <div>
          <label>City</label>
          <input
            value={userDetailes.city}
            onChange={inputChange}
            type="text"
            name="city"
          />
        </div>
      </div>
      <div className="userDetailes postalCode">
        <label>postal code</label>
        <input
          value={userDetailes.postalCode}
          onChange={inputChange}
          type="text"
          name="postalCode"
        />
      </div>
      <div className="submitUserDetailes">
        <button>Cancel</button>
        <button onClick={submitUserDetailes}>Next</button>
      </div>
    </div>
  );
};

export default BuyUserDetailes;
