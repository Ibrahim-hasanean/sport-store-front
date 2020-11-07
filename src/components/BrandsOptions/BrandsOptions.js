import React from 'react';
const BrandsOptions = ({imageSrc,name,filter,setFilter}) => {    
    let property = filter.brands;  
    const select = (e)=>{       
        let value = e.target.name;                
        console.log(property)
        if(property !== value){
            setFilter({...filter,brands:value})            
        }else if(property === value){            
            setFilter({...filter,brands:null})            
        }else{               
            setFilter({...filter,brands:value})        
        }          
    }
    
    return (   
        filter.brands === name?     
            <img className="selected" onClick={select} alt="adidas" src={imageSrc} name={name}/>:
            <img onClick={select} alt="adidas" src={imageSrc} name={name}/>
    )
}

export default BrandsOptions
