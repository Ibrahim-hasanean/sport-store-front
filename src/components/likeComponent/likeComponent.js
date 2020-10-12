import React from 'react';
import axios from "axios";
import "./likeComponent.css"
const LikeComponent = ({item}) => {   
    let addFav= async (e)=>{       
        let token = localStorage.getItem("token")
        let fav = e.target.parentElement;       
        if(!item.fav){
            fav.setAttribute("class", "addFav");
            try{
            let setFav = await axios.post("https://sportstore1.herokuapp.com/api/v1/favorite",{itemId:item._id},{
                headers:{
                    "x-access-token":token
                }
            })
            console.log(setFav)
            item.fav=true
         }catch(e){
             console.log(e)
         }
        }else{
            fav.classList.remove("addFav");
            try{
                let setFav = await axios.delete(`https://sportstore1.herokuapp.com/api/v1/favorite/${item._id}`,{
                    headers:{
                        "x-access-token":token
                    }
                })
                console.log(setFav)
                item.fav=false
             }catch(e){
                 console.log(e.response)
             }
        }        
       
    }
     
        if(item.fav)
        return <div id="fav" className="addFav">
                    <div onClick={addFav} className="fav1" >
                    </div>
                    <div  onClick={addFav} className="fav2">
                    </div>
                </div>            
           if(!item.fav) 
        return <div id="fav">
                    <div onClick={addFav} className="fav1" >
                    </div>
                    <div  onClick={addFav} className="fav2">
                    </div>
                </div>
}
    


export default LikeComponent
