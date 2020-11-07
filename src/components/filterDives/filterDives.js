import React from 'react'
import FilterSelectedButton from "../FilterSelectButton/FilterSelectButton";
const FilterDives = ({name,values,filter,setFilter}) => {
    return (
        <div>
        {
            values.map((value,index)=><FilterSelectedButton setFilter={setFilter} filter={filter} onClick={onclick} key={index} name={name} value={String(value).toLowerCase()}/>)
        }
       </div>
    )
}

export default FilterDives
