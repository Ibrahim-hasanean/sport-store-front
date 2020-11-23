import React,{useState,useEffect} from 'react';
import "./itemPage.css";
import ImagesSlider from "../../components/ImagesSlider/ImagesSlider";
import ItemPageDetailes from "../../components/ItemPageDetailes/ItemPageDetailes";
import axios from "axios";
import ItemPageNaming from "../../components/ItemPageNaming/ItemPageNaming";
import ItemPageBuy from "../../components/ItemPageBuy/ItemPageBuy";
const ItemPage= (props)=> {
    const[images,setImages] = useState();     
    const [loading,setIsLoading] = useState(true)    
    const [itemData,setItemData]= useState({quantity:1});
    const[item,setItem] = useState();
    let id = props.match.params.id;

    useEffect(()=>{
        const getItem = async()=>{
            let token = localStorage.getItem("token")        
            try{
            let item= await axios.get(`https://sportstore1.herokuapp.com/api/v1/items/${id}`,{headers:{
                "x-access-token":token
            }})  
            setItem(item.data.item)   
            const imagesURL =  item.data.item.imagesURL.map(image=> image.imageURL)
            const array = [item.data.item.mainImage,...imagesURL]  
            setImages([...array])
            setIsLoading(false)        
            }catch(e){
                console.log(e.response)
            }
        }
      
        getItem()
    },[id])      
   
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
   if(quantity >1){            
    setItemData({...itemData,quantity:quantity-1})
   }                
}
    return (
        <div id="itemPageContainer">                     
                {   loading?
                    <div><h2>Loading</h2></div>:                    
                    <ImagesSlider  images={images} />                                  
                }
            <div id="itemDetailesContainer">
            <h2>item detailes</h2>
            {item?
                <div>
                    <div className="itemPageDetailes">
                        <p><b>team</b>: {item.team}</p>
                        <p><b>type</b>: {item.type}</p>   
                    </div>     
                    <div className="itemPageDetailes">                      
                        <p><b>season</b>: {item.season}</p>                                
                        <p><b>price</b>: ${item.price}</p>
                    </div>  
                </div>
                :
                <div>Loading</div>
            }
                <ItemPageDetailes quantity={itemData.quantity} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} onchange={handleChange} />
                <ItemPageNaming />
                <ItemPageBuy item={item} quantity={itemData.quantity}  />
            </div>
        </div>
    )
}
export default ItemPage
