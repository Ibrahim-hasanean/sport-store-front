import React,{useState} from 'react'
import "./header.css";
import axios from "axios";
function Header({setSearchItems,setSearchText}) {
    const [searchValue,setSearchValue]= useState(null);
    const search = async()=>{
        if(searchValue){
            let token = localStorage.getItem("token");
        try{
                console.log(token)
        let result = await axios.get(`https://sportstore1.herokuapp.com/api/v1/items?search=${searchValue}`,{
            headers:{
                "x-access-token":token
            }
        });
        console.log(result)
        setSearchItems([...result.data.items])
        setSearchText(searchValue)
        }catch(e){
            console.log(e.response)
        }
    }
    }
    return (
        <div id="header">
            <p>K <b>S</b> <b>T</b> <b>O</b> <b>R</b> <b>R</b> <b>E</b>  </p>
            <div>
                <input onChange={(e)=>{setSearchValue(String(e.target.value).toLowerCase())}} type="text" id="search" placeholder="Search Kits, accessories..."/>
                <button onClick={search} id="searchButton"></button>
            </div>
        </div>
    )
}

export default Header
