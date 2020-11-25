import React ,{useEffect,useState} from 'react';
import "./home.css";
import Header from "../../components/homeHeader/Header";
import TeamsSlider from "../../components/teamsSlider/TeamsSlider";
import HotItemsContainer from "../../components/hotDealsContainer/HotDealsContainer"
import Items from '../../components/items/Items';
import axios from "axios";
import SearchItems from '../../components/searchItems/searchItems';
import useContext from "../../context/AuthContext";
import CartIcon from "../../components/CartIcon/CartIcon";
import paymentContext from "../../context/PaymentContext";
let  Home=() => {    
    let {logout,isToken} = useContext()  
    let {paymentSuccess,setPaymentSuccess} = paymentContext();
    const [popular, setPopularItems]= useState({limit:15,skip:0 ,items:[],hasMore:true});
    const [newItems, setNewItems]= useState({limit:15,skip:0,items:[] ,hasMore:true});
    const [sales, setSalesItems]= useState({limit:15,skip:0,items:[] ,hasMore:true});   
    const [search,setSearchItems] = useState([]);   
    const [searchText,setSearchText] = useState();  
    const hotItemsArray = 
    [{_id:"5f915682fdeaaa43d094e9bc",team:"manchester United",type:"Home",catagory:"shirt",season:"19/20",discount:"14%",price:"$60",mainImage:"https://storage.googleapis.com/sport-store-290016.appspot.com/1601390679976cover.jpg?GoogleAccessId=firebase-adminsdk-4jbpj%40sport-store-290016.iam.gserviceaccount.com&Expires=16447010400&Signature=NtVZ4YPNlD3WWVG1hCNoKkD%2FqWxnI6vQzts%2FmrefbJdLBBOQhBwm3GqF%2FAQw5rZPp2QIJIdVNia9ouxXWCsdEQeFAnwszv3uqLjW95XqAi4cTEtYDl479FNiO51R%2FZjq4yaoetJYEVQNI8y1ownORPGWBPCAngizo3Y29TbdJNgyWLAP56iOUDVXB4J8cj4M2T4srgXwvrTk0OtyZOy5t9kDFhgD0uN04pU4U8Qes0eH6TiGHYCzslyJUv7J71elwGaV4CAF%2Fhsu7y7k6Is3eo28jpUMp5yyQeOnXOcHHz%2FmEACQqF8DuB1GZkVLitf8R5hFMly4utB36GcF9NVf%2Bg%3D%3D"},
    {_id:"5f7748ed1872bd00179a1b78",team:"Real Madrid",type:"Home",catagory:"shirt",season:"19/20",discount:"14%",price:"$60",mainImage:"https://storage.googleapis.com/sport-store-290016.appspot.com/1601652973234cover1.jpg?GoogleAccessId=firebase-adminsdk-4jbpj%40sport-store-290016.iam.gserviceaccount.com&Expires=16447017600&Signature=SJMICg2ypTsV%2Fk7u%2F0TOrO5O2jQiQJFFhAWry6Xh9yKQ3UAjxl9S8PfBW1zDzRDPQZ8iG9Dtkfsm2JR9TRfxUVsimuSEhiG2oUyXf2U%2BqVkoN8dnr5FawafRRPz%2B4Jv3JukgfS%2FtOqFg905y5oqXo0BbBtcn5REOkX0N4CGxiMf9PHSEwS%2FYUOSXJRpPjAkFl0JsIJvfoFsYTgjD54EtrMMYg1H5MCBVlXVUk9FXa6xPLCzbg7gmiL07K8ezpLFjhGFg%2BQ6A4Jt8ZMEcJlEmh4%2BrFT8Ml%2FTD0Z8FvpoL36YlPfGqkHpqEsmx8SFaN06jP%2Fylx0m7A1apy5dDYO00iA%3D%3D"},
    {_id:"5f73433bc2ee9125c0144a8a",team:"Barcelona",type:"Home",catagory:"shirt",season:"19/20",discount:"14%",price:"$60",mainImage:"https://storage.googleapis.com/sport-store-290016.appspot.com/1601389371577cover1.jpg?GoogleAccessId=firebase-adminsdk-4jbpj%40sport-store-290016.iam.gserviceaccount.com&Expires=16447010400&Signature=qMNRq%2FrRpBXHoCu8ia9Gw2jIZyLVdSUYNxv%2BHIV2DTFmbEeTg7RGp7%2FEhuciJvKpOnfXd3pfiuMAFrJ%2F7IBU0MPOIvNc5TnTdP6VtENKClHWeqx1hDqoDJu9l6ePwCHwu9G0CmhvrsEbDGTDp93m37waLWM0oJ%2BEij0yak5SUeEcc8d4Z38iNmmNFXYPfWS%2FmWi4UIx%2FpfjFpEWUVwgnr1Px92Rq4Ufrd4oc1vY8kkuTs1gWN2mujEtfTcUAQqkj87Kg6rEZ0jb9ONzZXL3uxEZDj%2BZfBZAee1NnJnc2bCnPbSl%2FS15WJIeO8sdH7FNtyqiBzNNbqXmhmBN%2BINLCQQ%3D%3D"},
    {_id:"5f7748ed1872bd00179a1b78",team:"Real Madrid",type:"Home",catagory:"shirt",season:"19/20",discount:"14%",price:"$60",mainImage:"https://storage.googleapis.com/sport-store-290016.appspot.com/1601652973234cover1.jpg?GoogleAccessId=firebase-adminsdk-4jbpj%40sport-store-290016.iam.gserviceaccount.com&Expires=16447017600&Signature=SJMICg2ypTsV%2Fk7u%2F0TOrO5O2jQiQJFFhAWry6Xh9yKQ3UAjxl9S8PfBW1zDzRDPQZ8iG9Dtkfsm2JR9TRfxUVsimuSEhiG2oUyXf2U%2BqVkoN8dnr5FawafRRPz%2B4Jv3JukgfS%2FtOqFg905y5oqXo0BbBtcn5REOkX0N4CGxiMf9PHSEwS%2FYUOSXJRpPjAkFl0JsIJvfoFsYTgjD54EtrMMYg1H5MCBVlXVUk9FXa6xPLCzbg7gmiL07K8ezpLFjhGFg%2BQ6A4Jt8ZMEcJlEmh4%2BrFT8Ml%2FTD0Z8FvpoL36YlPfGqkHpqEsmx8SFaN06jP%2Fylx0m7A1apy5dDYO00iA%3D%3D"},
    {_id:"5f73433bc2ee9125c0144a8a",team:"Barcelona",type:"Home",catagory:"shirt",season:"19/20",discount:"14%",price:"$60",mainImage:"https://storage.googleapis.com/sport-store-290016.appspot.com/1601389371577cover1.jpg?GoogleAccessId=firebase-adminsdk-4jbpj%40sport-store-290016.iam.gserviceaccount.com&Expires=16447010400&Signature=qMNRq%2FrRpBXHoCu8ia9Gw2jIZyLVdSUYNxv%2BHIV2DTFmbEeTg7RGp7%2FEhuciJvKpOnfXd3pfiuMAFrJ%2F7IBU0MPOIvNc5TnTdP6VtENKClHWeqx1hDqoDJu9l6ePwCHwu9G0CmhvrsEbDGTDp93m37waLWM0oJ%2BEij0yak5SUeEcc8d4Z38iNmmNFXYPfWS%2FmWi4UIx%2FpfjFpEWUVwgnr1Px92Rq4Ufrd4oc1vY8kkuTs1gWN2mujEtfTcUAQqkj87Kg6rEZ0jb9ONzZXL3uxEZDj%2BZfBZAee1NnJnc2bCnPbSl%2FS15WJIeO8sdH7FNtyqiBzNNbqXmhmBN%2BINLCQQ%3D%3D"}
    ]   
    console.log(process.env.REACT_APP_SECRET)
    useEffect(()=>{          
        homeItems()
        showPaymentSuccess()
    },[]) 
    let showPaymentSuccess =()=>{
        setTimeout(() => {
            let elemnt = document.getElementById("paymentSuccess");
            if(elemnt){
            elemnt.style.opacity=0;                  
            }
        }, 3000);
        setTimeout(() => {
            setPaymentSuccess(false) 
        }, 5000);  
    }
    const homeItems = async ()=>{
            try{
            let token = localStorage.getItem("token") || isToken;
            let url = process.env.REACT_APP_BACKEND_URL 
            let items = await axios.get(`${url}/api/v1/items/home`,{headers:{"x-access-token":token}})
            setPopularItems({...popular,items:[...items.data.popular]})
            setNewItems({...newItems,items: [...items.data.new]})
            setSalesItems({...sales,items: [...items.data.sales]})            
            }catch(e){
                if(e.response){
                    if(e.response.status === 401){
                        logout()                   
                    }
                }
            }
        }   
    return (       
        <div id="home">
        {search.length === 0?
            <>   {paymentSuccess?
                <div id="paymentSuccess">Your Payment Success</div>:
                <div></div>            
            }
                <CartIcon />                 
                <Header setSearchItems={setSearchItems} setSearchText={setSearchText}/>           
                <HotItemsContainer hotItems={hotItemsArray}/>
                <TeamsSlider/>             
                <Items setSalesItems={setSalesItems} setNewItems={setNewItems} setPopularItems={setPopularItems}  popular={popular} newItems={newItems} sales={sales} />    
            </>
            :<SearchItems searchText={searchText} items={search} />
        
        }
        </div>
    ) 
}
export default Home