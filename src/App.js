import React,{useState} from 'react';
import './App.css';
import Login from "./pages/login/Login"
import{AuthContext} from "./context/AuthContext";
import{PaymentContext} from "./context/PaymentContext";
import Nav from "./components/nav/nav";
import Home from "./pages/home/home"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Profile from './pages/profile/profile';
import ProtectRoute from "./pages/protectRoute"
import Signup from './pages/signup/Signup';
import ForgetPassword from './pages/forgetpassword/ForgetPassword';
import ConfirmCode from './pages/confirmcode/ConfirmCode';
import NewPassword from './pages/newpassword/NewPassword';
import Admin from './pages/admin/Admin';
import ItemPage from './pages/ItemPage/ItemPage';
import TeamItemsPage from './pages/TeamItemsPage/TeamItemsPage';
import BuyUserDetailes from './pages/BuyUserDetailes/BuyUserDetailes';
import PaymentSummary from './pages/PaymentSummary/PaymentSummary';
import PaymentPage from './pages/PaymentPage/PaymentPage';
function App() {
  let token = localStorage.getItem("token")  || null 
  const [isToken,setIsToken]=  useState(token); 
  const [userData,setUserData]= useState({});
  const [buyItems,setBuyItems] = useState([]);
  const [totalPrice,setTotalPrice] = useState(null);
  const [paymentSuccess,setPaymentSuccess] = useState(false);
  let  setToken = (token)=>{
    localStorage.setItem("token",JSON.parse(JSON.stringify(token)));
    setIsToken(token)    
  }
  let  logout=()=>{
    localStorage.removeItem("token");
    setIsToken(false)   
  }
  return (
    <div className="App">    
     <AuthContext.Provider value={{isToken , setToken, userData,setUserData,logout}}> 
    <Router>
    <Nav/>    
    <div>
    <Switch>   
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={Signup}/> 
      <Route exact path="/forgetpassword" component={ForgetPassword}/>
      <Route exact path="/confirmcode" component={ConfirmCode}/>
      <Route exact path="/newpassword" component={NewPassword}/>
      <ProtectRoute exact path="/admin" component={Admin}/>       
      <PaymentContext.Provider  value={{buyItems,setBuyItems,totalPrice,setTotalPrice,paymentSuccess,setPaymentSuccess}} >
        <ProtectRoute exact path="/" component={Home}/>        
        <ProtectRoute exact path="/profile" component={Profile}/>  
        <ProtectRoute exact path="/item/:id" component={ItemPage}/> 
        <ProtectRoute exact path="/TeamItemsPage" component={TeamItemsPage}/>  
        <ProtectRoute exact path="/items/payment/summary" component={PaymentSummary}/>  
        <ProtectRoute exact path="/items/payment/userDetailes" component={BuyUserDetailes}/>  
        <ProtectRoute exact path="/items/payment/buy" component={PaymentPage}/>  
      </PaymentContext.Provider>
      </Switch>   
      </div>
      </Router> 
      </AuthContext.Provider>  
    </div>    
  );
}

export default App;
