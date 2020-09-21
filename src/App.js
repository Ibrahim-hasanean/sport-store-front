import React,{useState} from 'react';
import './App.css';
import Login from "./components/login/Login"
import{AuthContext} from "./context/AuthContext";
import Nav from "./components/nav/nav";
import Home from "./components/home/home"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Profile from './components/profile/profile';
import ProtectRoute from "./components/protectRoute"
import Signup from './components/signup/Signup';
import ForgetPassword from './components/forgetpassword/ForgetPassword';
import ConfirmCode from './components/confirmcode/ConfirmCode';
import NewPassword from './components/newpassword/NewPassword';
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
      <ProtectRoute exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={Signup}/> 
      <Route exact path="/forgetpassword" component={ForgetPassword}/>
      <Route exact path="/confirmcode" component={ConfirmCode}/>
      <Route exact path="/newpassword" component={NewPassword}/>
      <ProtectRoute exact path="/profile" component={Profile}/>  
      </Switch>   
      </div>
      </Router> 
      </AuthContext.Provider>  
    </div>    
  );
}

export default App;
