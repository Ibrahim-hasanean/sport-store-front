import React from 'react'
import "./FilterSelectButton.css"
const FilterSelectButton = ({name,value,filter,setFilter}) => { 
    let property = filter[name]; 
    const select = (e)=>{       
        let name = e.target.name;
        let value = e.target.value;
         
        console.log(property)
        if(property !== value){
            setFilter({...filter,[name]:value})
            
        }else if(property === value){            
            setFilter({...filter,[name]:null})            
        }else{               
        setFilter({...filter,[name]:value})        
        } 
         
    }
    return (      
        property === value?
        <button className="selected" onClick={select}  name={name} value={String(value).toLowerCase()}>{value}</button>:
        <button  className="default" onClick={select}  name={name} value={String(value).toLowerCase()}>{value}</button>
    )
}

export default FilterSelectButton
