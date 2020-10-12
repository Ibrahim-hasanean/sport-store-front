import React,{useState,useEffect} from 'react';
import "./itemPage.css";
import ImagesSlider from "../../components/ImagesSlider/ImagesSlider";
import ItemPageDetailes from "../../components/ItemPageDetailes/ItemPageDetailes";
import axios from "axios";
import ItemPageNaming from "../../components/ItemPageNaming/ItemPageNaming";
import ItemPageBuy from "../../components/ItemPageBuy/ItemPageBuy";
const ItemPage= (props)=> {
    const[items,setItems] = useState();     
    const [loading,setIsLoading] = useState(true)    
    const [itemData,setItemData]= useState({quantity:1});
    const[item,setItem] = useState();
    useEffect(()=>{
        getItem()
    },[])      
    const getItem = async()=>{
        let id = props.match.params.id;
        let token = localStorage.getItem("token")        
        try{
        let item= await axios.get(`https://sportstore1.herokuapp.com/api/v1/items/${id}`,{headers:{
            "x-access-token":token
        }})  
        setItem(item.data.item)          
       const array= item.data.item.imagesURL.map(image => {
            return {
                team:item.data.item.team,
                gender:item.data.item.gender,
                type:item.data.item.type,
                category:item.data.item.category,
                season: item.data.item.season,
                price:item.data.item.price,
                imageURL:image.imageURL
            }
        });
        //console.log(array)
        let mainImage={
            team:item.data.item.team,
            gender:item.data.item.gender,
            type:item.data.item.type,
            category:item.data.item.category,
            season: item.data.item.season,
            price:item.data.item.price,
            imageURL:item.data.item.mainImage
        }
        setItems([mainImage ,...array])
        setIsLoading(false)        
        }catch(e){
            console.log(e.response)
        }
    }
  
   const handleChange = (e)=>{
       let name = e.target.name;
       let value = e.target.value
       setItemData({...itemData,[name]:value})
   }
   const increaseQuantity = ()=>{ 
       let quantity=itemData.quantity  
        setItemData({...itemData,quantity:quantity+1})
       
}
const decreaseQuantity = ()=>{ 
    let quantity=itemData.quantity  
   if(quantity >0){            
    setItemData({...itemData,quantity:quantity-1})

   }                
}
    return (
        <div id="itemPageContainer">                     
                {   loading?
                    <div><h2>Loading</h2></div>:                    
                    <ImagesSlider  items={items} />                                  
                }
              <ItemPageDetailes quantity={itemData.quantity} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} onchange={handleChange} />
              <ItemPageNaming />
              <ItemPageBuy item={item}  />
        </div>
    )
}
export default ItemPage
