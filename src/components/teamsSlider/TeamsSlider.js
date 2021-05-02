import React, { useState } from "react";
import "./teamsSlider.css";
import { Redirect, useHistory } from "react-router-dom";
function TeamsSlider({ setSelectTeam }) {
  const [index, setIndex] = useState(0);
  const [team, setTeam] = useState(null);
  const history = useHistory();
  const teamImages = [
    { image: "barcelona.jpg", name: "Barcelona" },
    { image: "real_madrid.jpg", name: "Real Madrid" },
    { image: "ac_milan.jpg", name: "AC Milan" },
    { image: "man_city.jpg", name: "Manchester City" },
    { image: "man_united.jpg", name: "Manchester United" },
    { image: "psg.jpg", name: "Paris Saint Germain" },
    { image: "dortmund.png", name: "Borussia Dortmund" },
    { image: "chelsea.jpg", name: "Chelsea" },
    { image: "arsenal.jpg", name: "Arsenal" },
    { image: "inter_milan.jpg", name: "Inter Milan" },
    { image: "atlatico.jpg", name: "Atletico Madrid" },
    { image: "juventus.jpg", name: "Juventus" },
    { image: "liver.jpg", name: "Liver pool" },
    { image: "bayern.jpg", name: "Bayern Munich" },
    { image: "atlatico.jpg", name: "Atletico Madrid" },
    { image: "juventus.jpg", name: "Juventus" },
    { image: "liver.jpg", name: "Liver pool" },
    { image: "bayern.jpg", name: "Bayern Munich" },
    { image: "atlatico.jpg", name: "Atletico Madrid" },
    { image: "juventus.jpg", name: "Juventus" },
    { image: "liver.jpg", name: "Liver pool" },
    { image: "bayern.jpg", name: "Bayern Munich" },
  ];
  const toRight = () => {
    let slider = document.getElementById("teamsContainer");
    slider.style.transform = "translateX(-" + 70 * (index + 1) + "px)";
    setIndex(index + 1);
  };
  const toLeft = () => {
    let slider = document.getElementById("teamsContainer");
    slider.style.transform = "translateX(-" + 70 * (index - 1) + "px)";
    setIndex(index - 1);
  };
  const clickTeam = async (e) => {
    let name = e.target.name;
    // setTeam(name);
    history.push({ pathname: `/TeamItemsPage`, state: { team: name } });
  };

  // if (team) {
  //   return (
  //     <Redirect
  //       from="/"
  //       to={{
  //         pathname: `/TeamItemsPage`,
  //         state: {
  //           team: team,
  //         },
  //       }}
  //     />
  //   );
  // }

  return (
    <div id="teamSliderContainer">
      <h3>Teams</h3>
      <p>View All</p>
      {index === 0 ? (
        <button disabled onClick={toLeft} id="leftSlid">
          {"<"}
        </button>
      ) : (
        <button onClick={toLeft} id="leftSlid">
          {"<"}
        </button>
      )}
      {index === teamImages.length - 12 ? (
        <button disabled onClick={toRight} id="rightSlid">
          {">"}
        </button>
      ) : (
        <button onClick={toRight} id="rightSlid">
          {">"}
        </button>
      )}
      <div id="teamSlider">
        <div id="teamsContainer">
          {teamImages.map((item, index) => {
            let img = require(`../../assets/icons/${item.image}`);
            return (
              <img
                onClick={clickTeam}
                className="teamImages"
                src={img}
                key={index}
                name={item.name}
                alt={item.name + "image"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TeamsSlider;
