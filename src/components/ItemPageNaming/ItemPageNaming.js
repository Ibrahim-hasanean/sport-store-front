import React,{useState} from 'react';
import "./ItemPageNaming.css";
const ItemPageNaming = () => {
    const [selectedName,setSelectedName]=useState("Without")
    const chooseNaming = (e)=>{
        setSelectedName(e.target.name)
    }
    return (
        <div id="namingContainer">
            <label>Naming</label>
            <div id="naming">
            {selectedName === "Without"?
            <button className="selectdName">Without</button>:
            <button onClick={chooseNaming} name="Without" className="naminButton">Without</button>
            }
            {selectedName === "Player"?
            <button  className="selectdName">Player</button>:
            <button onClick={chooseNaming} name="Player" className="naminButton">Player</button>
            }
            {selectedName === "Customize"?
             <button  className="selectdName">Customize</button>:
             <button onClick={chooseNaming} name="Customize" className="naminButton">Customize</button>
            }
            </div>
        </div>
    )
}

export default ItemPageNaming
