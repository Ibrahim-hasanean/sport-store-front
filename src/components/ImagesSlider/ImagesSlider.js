import React,{useState} from 'react';
import ItemDetails from "../ItemPageCard/ItemPageCard";
function ImagesSlider({images}) {    
   const [index,setIndex]= useState(0)     
   const  slideToRight = async()=>{
    let hotDeal = document.getElementById("hotDealsContainer")       
     hotDeal.style.transform ="translateX(-"+(400*(index+1))+"px)";
     setIndex(index+1)
    
   } 
   const  slideToLeft = ()=>{
    let hotDeal = document.getElementById("hotDealsContainer");      
     hotDeal.style.transform ="translateX(-"+(400*(index-1))+"px)";
     setIndex(index-1)    
   }
    return (
        <div id="container" style={{height:"500px", width:"500px", margin:0,marginTop:"30px"}}>     
         {index===0?         
            <button disabled  id="leftButton" >{"<"}</button>:
            <button onClick={slideToLeft} id="leftButton" >{"<"}</button>
            }
        {index < images.length-1?
            <button onClick={slideToRight} id="rightButton">{">"}</button>:
            <button disabled  id="rightButton">{">"}</button>
            }  
                <div className="cardContainer" style={{height:"500px",width:"400px"}}>   
                <div id="hotDealsContainer" style={{height:"500px"}}>  
                {     images.map((image,index)=>{ 
                        return  <ItemDetails image={image} key={index} />  
                })    
                }  
                </div>  
                </div> 
                <div id="slider">  
                {
                images.map((item,itemIndex)=>{
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


export default ImagesSlider
