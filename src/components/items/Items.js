import React,{useState}from 'react';
import HomeItemCard from '../homeItemsCard/HomeItemCard';
import "./items.css";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';
let popularPage =0;
let newPage =0;
function Items({popular,sales,newItems,setPopularItems , setNewItems,setSalesItems}) {
    let url = process.env.REACT_APP_BACKEND_URL; 

    const [showItem,setShowItem] = useState("popular");  
    let setShow=(e)=>{
        console.log(e.target.name) 
        setShowItem(e.target.name)
    }
        
    const loadMorePopular =async ()=>{
        let token = localStorage.getItem("token");
        let skip;  
        popular.items.length>0?
         skip=popular.skip+15:
         skip=0;
        let items =await axios.get(`${url}/api/v1/items?sortBy=likesNumber&skip=${skip}&limit=${15}`,{
            headers:{
                "x-access-token":token
            }
        })
        console.log(items);
        if(items.data.items.length>0) {       
        let prevItems= popular.items;          
        popularPage++;     
        setPopularItems({...popular,items:[...prevItems,...items.data.items],skip:skip});   
        console.log(popular) 
        
    }else{
        setPopularItems({...popular,hasMore:false})
    }     
    }
    const loadMorenew =async ()=>{
        let token = localStorage.getItem("token");
        let skip ;          
        newItems.items.length>0?
         skip=popular.skip+15:
         skip=0;      
        let items =await axios.get(`${url}/api/v1/items?sortBy=createdAt&skip=${skip}&limit=${15}`,{
            headers:{
                "x-access-token":token
            }
        })
        console.log(items);
        if(items.data.items.length>0){
        let prevItems= newItems.items; 
        newPage++;       
        setNewItems({...newItems,items:[...prevItems,...items.data.items],skip:skip});               
        }else{
            setNewItems({...newItems,hasMore:false})
        }
    }
    const loadMoreSales =async ()=>{
        let token = localStorage.getItem("token");
        let skip ;          
        sales.items.length>0?
         skip=popular.skip+15:
         skip=0;      
        let items =await axios.get(`${url}/api/v1/items?sortBy=salesTimes&skip=${skip}&limit=${15}`,{
            headers:{
                "x-access-token":token
            }
        })
        console.log(items);
        if(items.data.items.length>0){
        let prevItems= sales.items; 
        newPage++;       
        setSalesItems({...sales,items:[...prevItems,...items.data.items],skip:skip});               
        }else{
            setSalesItems({...sales,hasMore:false})
        }
    }
    return (
        <div id="allItems">
            <h3>All Items</h3>
            <div id="itemsList">
            { showItem === "popular"?
                <button onClick={setShow}  name="popular" style={{color:"#2F7EB8" }} >
                Popular 
                <p className="focusBorder"></p>
                </button>:
                <button onClick={setShow} name="popular">Popular</button>
            }
            { showItem === "new"?
                <button onClick={setShow}  name="new" style={{color:"#2F7EB8"}} >
                New
                <p className="focusBorder"></p>
                </button>:
                <button onClick={setShow} name="new"  >New</button>
            }
            { showItem === "sale"?
                <button onClick={setShow}  name="sale" style={{color:"#2F7EB8"}} >
                Sale
                <p className="focusBorder"></p>
                </button>:
                <button onClick={setShow} name="sale"  >Sale</button>
            }
            </div>
            <div id="itemsContainer">  
            { (()=>{              
                 switch(showItem){
                    case "new": return      <InfiniteScroll
                                                pageStart={newPage}
                                                loadMore={loadMorenew}
                                                hasMore={newItems.hasMore}
                                                loader={<div className="loader" key={0}>Loading ...</div>}
                                            >
                                                <div id="new">
                                                    { newItems.items?
                                                        newItems.items.map((item,index) => {           
                                                        return <HomeItemCard item={item} key={index} />
                                                        }):<div><h2>Loading...</h2></div>
                                                    }   
                                                </div>
                                            </InfiniteScroll>
                    case "sale": return      <InfiniteScroll
                                                pageStart={newPage}
                                                loadMore={loadMoreSales}
                                                hasMore={sales.hasMore}
                                                loader={<div className="loader" key={0}>Loading ...</div>}
                                            >
                                                <div id="new">
                                                    { sales.items?
                                                        sales.items.map((item,index) => {           
                                                        return <HomeItemCard item={item} key={index} />
                                                        }):<div><h2>Loading...</h2></div>
                                                    }   
                                                </div>
                                            </InfiniteScroll>
                    default : return    <InfiniteScroll
                                            pageStart={popularPage}
                                            loadMore={loadMorePopular}
                                            hasMore={popular.hasMore}
                                            loader={<div className="loader" key={0}>Loading ...</div>}
                    
                                        >
                                            <div id="popular">                                                
                                                { popular.items?
                                                    popular.items.map((item,index) => {           
                                                    return <HomeItemCard item={item} key={index} />
                                                    }):<div><h2>Loading...</h2></div>
                                                }                                               
                                            </div>   
                                        </InfiniteScroll>                          
                 }     
                }) ()}                
            </div>           
        </div>
    )
}

export default Items
