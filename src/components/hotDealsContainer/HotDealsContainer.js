import React,{useState} from 'react';
import Card from "../hotDealsCard/HotDealsCard";
import "./hotDealsContainer.css"
function HotDealsContainer({hotItems}) {    
    const [index,setIndex]= useState(0)
   const  slideToRight = async()=>{
    let hotDeal = document.getElementById("hotDealsContainer")       
     hotDeal.style.transform ="translateX(-"+(500*(index+1))+"px)";
     setIndex(index+1)
    
   } 
   const  slideToLeft = ()=>{
    let hotDeal = document.getElementById("hotDealsContainer");      
     hotDeal.style.transform ="translateX(-"+(500*(index-1))+"px)";
     setIndex(index-1)    
   }
    return (
        <div id="container"> 
    
         {index===0?         
            <button disabled  id="leftButton" >{"<"}</button>:
            <button onClick={slideToLeft} id="leftButton" >{"<"}</button>
            }
        {index < hotItems.length-1?
            <button onClick={slideToRight} id="rightButton">{">"}</button>:
            <button disabled  id="rightButton">{">"}</button>
            }  
                <div className="cardContainer">   
                <div id="hotDealsContainer">                     
                    {
                    hotItems.map((item,index)=>{            
                    return <Card index={index} hotItem={item}key={index}  />
                })
                } 
                </div>  
                </div> 
                <div id="slider">  
                {
                hotItems.map((item,itemIndex)=>{
                    if(itemIndex === index){
                        return <div key={itemIndex} className="sliderChildern curruentItem"></div>
                    }
                    return <div key={itemIndex} className="sliderChildern"></div>

                })
                    }   
                </div>          
        </div>
    )
}

export default HotDealsContainer
