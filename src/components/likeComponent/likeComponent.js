import React,{useState} from 'react';
import axios from "axios";
import "./likeComponent.css";
import {AiFillHeart,AiOutlineHeart} from "react-icons/ai";
const LikeComponent = ({item}) => {   
    const [isFav,setIsFav] = useState(item.fav)
    let addFav= async (e)=>{       
        let token = localStorage.getItem("token")
        let fav = e.target;      
        if(!item.fav){
            fav.setAttribute("class", "addFav");
           item.fav=true
           setIsFav(true)
            try{
            let setFav = await axios.post("https://sportstore1.herokuapp.com/api/v1/favorite",{itemId:item._id},{
                headers:{
                    "x-access-token":token
                }
            })
            console.log(setFav)
           
         }catch(e){
             console.log(e)
         }
        }else{
            fav.classList.remove("addFav");
            setIsFav(false)

            //fav.setAttribute("class", "removeFav");
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
     
        if(isFav)
        return <AiFillHeart size="1em" id="fav" className="addFav" onClick={addFav} />                
        if(!isFav) 
        return <AiOutlineHeart onClick={addFav} id="fav" />
        // return <AiFillHeart className="removeFav" id="fav" onClick={addFav} />
      
}
    


export default LikeComponent
