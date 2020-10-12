import React,{useEffect,useState} from 'react';
import "./TeamItemsPage.css";
import axios from "axios";
import Card from "../../components/TeamItemsCard/TeamItemsCard"
const TeamItemsPage = (props) => {    
    const [teamItems,setTeamItems]= useState({home:[],away:[],third:[]})
    const {team}= props.location.state;     
    useEffect(()=>{
        fetchTeamItems()
    },[])
    const fetchTeamItems = async()=>{
        let token = localStorage.getItem("token")       
        let teamItems = await axios.get(`https://sportstore1.herokuapp.com/api/v1/items?team=${team}`,{
                headers:{
                    "x-access-token":token
                }
            })
            console.log(teamItems)
            let homeKits = teamItems.data.items.filter(item=>item.type === "home");
            let awayKits = teamItems.data.items.filter(item=>item.type === "away");
            let thirdKits = teamItems.data.items.filter(item=>item.type === "third");
            setTeamItems({home:[...homeKits],away:[...awayKits],third:[...thirdKits]})
                     
    }
    return (
        <div className="teamCardcontainer">
           <p>Home kit </p>
           <div className="teamCardContainer">
            {
                teamItems.home.map((item,index)=>{
                 return   <Card item={item} key={index}/>
                })
            }
           </div>
           <p>Away kit</p>
           <div className="teamCardContainer">
            {
                teamItems.away.map((item,index)=>{
                 return   <Card item={item} key={index}/>
                })
            }
           </div>
           <p>Third kit</p>
           <div className="teamCardContainer">
            {
                teamItems.third.map((item,index)=>{
                 return   <Card item={item} key={index}/>
                })
            }
           </div>
        </div>
    )
}

export default TeamItemsPage
