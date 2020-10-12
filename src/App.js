import React,{useState} from 'react';
import './App.css';
import Login from "./pages/login/Login"
import{AuthContext} from "./context/AuthContext";
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
function App() {
  let token = localStorage.getItem("token")  || null 
  let [isToken,setIsToken]=  useState(token)  
  let [userData,setUserData]= useState({})
  
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
      <ProtectRoute exact path="/" component={Home}/>
      <ProtectRoute exact path="/admin" component={Admin}/>     
      <ProtectRoute exact path="/profile" component={Profile}/>  
      <ProtectRoute exact path="/item/:id" component={ItemPage}/> 
      <ProtectRoute exact path="/TeamItemsPage" component={TeamItemsPage}/>  
      </Switch>   
      </div>
      </Router> 
      </AuthContext.Provider>  
    </div>    
  );
}

export default App;
