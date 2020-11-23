import React from 'react';
import axios from "axios";
import "./likeComponent.css";
import {AiFillHeart,AiOutlineHeart} from "react-icons/ai";
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
        return <AiFillHeart size="1em" id="fav" className="addFav" onClick={addFav} />                
        if(!item.fav) 
        return <AiOutlineHeart id="fav" onClick={addFav} />
      
}
    


export default LikeComponent
