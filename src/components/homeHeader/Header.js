import React,{useState} from 'react';
import "./header.css";
import axios from "axios";
import FilterDetails from "../searchFilter/searchFilter";
function Header({setSearchItems,setSearchText}) {   
    const [searchValue,setSearchValue]= useState(null);  
    const [filter,setFilter] = useState({gender:undefined,categories:undefined,sizes:[],minPrice:undefined,maxPrice:undefined,brands:undefined,});  
    const [showFilterDetails,setShowFilterDetails] = useState(false)
   
    const search = async()=>{
        if(searchValue){
            let token = localStorage.getItem("token");
        try{
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
    const onFocus=()=>{
        // setSearchFilter(true)
        let filter = document.getElementById("filter")
        filter.style.opacity="1";
       
    }
    const onFocusOut=()=>{
        //setSearchFilter(false)
        let filter = document.getElementById("filter")
        filter.style.opacity="0";        
    }
   
    const submitFilter = async()=>{  
        let token = localStorage.getItem("token")
        let gender = filter.gender;   
        let brand = filter.brands;   
        let category = filter.categories;  
        let minPrice = filter.minPrice;
        let maxPrice = filter.maxPrice;
        try{
            const result = await axios.get(`https://sportstore1.herokuapp.com/api/v1/items?category=${category}&brand=${brand}&gender=${gender}&price=${minPrice}-${maxPrice}`,{
                headers:{
                    "x-access-token":token
                }
            });
            setSearchItems([...result.data.items])            
            console.log(result)
        }catch(e){
            console.log(e)
        }
    }

    const showFilter = ()=>{
        let filterDetails = document.getElementById("filterDetails");
        let filterIcon = document.getElementById("filter");
        if(!showFilterDetails){
        filterIcon.style.opacity=1;
        filterDetails.style.display="block";
        filterDetails.style.opacity=1;
        setShowFilterDetails(true)
        }else{            
        filterIcon.style.opacity="0"
        filterDetails.style.display="none";
        filterDetails.style.opacity="0";
        setShowFilterDetails(false)
        }
    }

    return (
        <div id="header">
            <p>K <b>S</b> <b>T</b> <b>O</b> <b>R</b> <b>R</b> <b>E</b>  </p>                       
            <div id="searchContainer">
                <input onBlur={onFocusOut}  onFocus={onFocus} onChange={(e)=>{setSearchValue(String(e.target.value).toLowerCase())}} type="text" id="search" placeholder="Search Kits, accessories..."/>
                <button onClick={search} id="searchButton"></button>           
                    <div onClick={showFilter} id="filter">            
                        <div id="filterIconContainer">
                                <div className="filtericon"></div>
                                <div className="filtericon"></div>
                                <div className="filtericon"></div>
                        </div>
                        <h3>filter</h3>                  
                    </div>
            </div>  
            <FilterDetails submitFilter={submitFilter} filter={filter} setFilter={setFilter} />          
        </div>
    )
}

export default Header
