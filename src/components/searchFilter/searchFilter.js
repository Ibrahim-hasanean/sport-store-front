import React from 'react'
import "./searchFilter.css";
import FilterDive from "../filterDives/filterDives";
import adidasImage from "../../assets/icons/adida.png"
import pumaImage from "../../assets/icons/puma.png"
import newBalanceImage from "../../assets/icons/new balance.png"
import nikeImage from "../../assets/icons/nike.png"
import BrandOption from "../BrandsOptions/BrandsOptions";

const SearchFilter = ({filter,setFilter,submitFilter}) => {       
        const Reset = ()=>{
            setFilter({gender:undefined,categories:undefined,sizes:[],minPrice:undefined,maxPrice:undefined,brands:undefined,});
        }
    return (
        <div id="filterDetails">
            <div>
                <span></span>
            </div>
                <h3>Filter</h3>
                <FilterDive setFilter={setFilter} filter={filter} name="gender" values={["Man","Woman"]} />                
                <p>Categories</p>                
                <FilterDive setFilter={setFilter} filter={filter}name="categories" values={["t-Shirt","Short","Pants","Jackets","Accessories"]} />                  
                
                <p>Sizes</p>
                <FilterDive setFilter={setFilter} filter={filter}name="sizes" values={["x-small","small","large","x-large","xx-large"]} />
                
                <p>Price</p>
                <div>
                    <input className="price" onChange={(e)=>{setFilter({...filter,minPrice:e.target.value})}} type="text"  placeholder="Min" />
                    <label>-</label>
                    <input className="price"  onChange={(e)=>{setFilter({...filter,maxPrice:e.target.value})}}  type="text" placeholder="Max" />                   
                </div>
                <p>Brands</p>
                <div>
                    <BrandOption filter={filter} setFilter={setFilter} alt="adidas" imageSrc={adidasImage} name="adidas" value=""/>
                    <BrandOption filter={filter} setFilter={setFilter} alt="new balance" imageSrc={newBalanceImage} name="new balance" value=""/>
                    <BrandOption filter={filter} setFilter={setFilter} alt="nike" imageSrc={nikeImage}  name="nike" value=""/>
                    <BrandOption filter={filter} setFilter={setFilter} alt="puma" imageSrc={pumaImage} name="puma" value=""/>
                </div>
                <div className="lastDiv">                    
                    <button onClick={Reset} className="resetButton">Reset</button>
                    <button onClick={submitFilter} className="submitButton" >Done</button>
                </div>
            </div>
    )
}

export default SearchFilter
