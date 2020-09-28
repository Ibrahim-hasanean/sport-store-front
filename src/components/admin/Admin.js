import React , {useState,useEffect} from 'react'
import {Redirect} from "react-router-dom"
import axios from 'axios'
import "./admin.css"
import useAuthContext from "../../context/AuthContext"
import "../login/login.css";

function Admin() {
    const [isAdmin,setIsAdmin] = useState(true)
    let {isToken} = useAuthContext()    
    const [isLoading,setIsLoading] = useState(true)
    const [mainFile,setMainFile] = useState(null);
    const [otherFiles,setOtherFiles] = useState([])
   
    useEffect(()=>{  
        let mount = true 
        if(mount)  
        checkIsAdmin()
        console.log(isToken)
        return ()=> mount =false             
    },[])
    //https://sportstore1.herokuapp.com
    let checkIsAdmin = async()=>{  
        try{
            let result = await axios.get("https://sportstore1.herokuapp.com/api/v1/admin/isAdmin",{headers:{"x-access-token":isToken}});            
            setIsLoading(true)
            console.log(result)           
            if(result.status === 200){
                setIsAdmin(true)
                setIsLoading(false)
            }            
        }catch(e){                   
            console.log(e.response)
            setIsLoading(false)
            if(e.response.status === 401){
                setIsAdmin(false)
            }
        }
       }
       
        let   addImage=(e)=>{
            e.preventDefault()
            let form = document.getElementById("form");
            let newFile = document.createElement("input");
            newFile.setAttribute("type","file")
            newFile.setAttribute("name","photos")
            newFile.setAttribute("onChange",addOther)
            form.appendChild(newFile)

       }

      const addMain=async(e)=>{
        let  file = e.target.files[0];
       await setMainFile(file)
        
      }

      const addOther =async (e)=>{
        let  file = e.target.files;     
        console.log(file)   
      await  setOtherFiles(file)
       
      }      
     
      console.log(otherFiles)
    const submit =async (e)=>{
        e.preventDefault()        
        let category = document.getElementById("category").value        
        let size = document.getElementById("size").value
        let type = document.getElementById("type").value
        let team = document.getElementById("team").value
        let brand = document.getElementById("brand").value
        let season = document.getElementById("season").value
        let price = document.getElementById("price").value
        let gender = document.getElementById("gender").value
        let discount = document.getElementById("discount").value /100
        //console.log(otherFiles)
        const data = new FormData()      
        for(let i=0; i<otherFiles.length;i++){
            data.append("photos",otherFiles[i])
        }    
        data.append("main",mainFile)        
        data.append("category",category);
        data.append("type",type);
        data.append("size",size);
        data.append("brand",brand);
        data.append("price",price);
        data.append("gender",gender);
        data.append("team",team);
        data.append("discount",discount);
        data.append("season",season);
        console.log(data)
      
       //https://sportstore1.herokuapp.com
        let request = await axios.post("http://localhost:4000/api/v1/admin/items",data,{headers:{
           "x-access-token":isToken , 
           'Content-Type': 'multipart/form-data'         
        }})
       console.log(request)
      }
       if(isLoading){
           return <div id="admin">Loading...</div>
       }   
       if(!isAdmin){
           return <Redirect to="/profile"/>
       }
       
    return (
        <div id="admin">
        <form id="form" onSubmit={submit}>
            <h2>admin page</h2>                       
            <input   required className="text" type="text" placeholder="category" id="category"/>
            <input   required  className="text" type="text" placeholder="size" id="size"/>
            <input   required className="text" type="text" placeholder="type" id="type"/>
            <input   required className="text" type="text" placeholder="team" id="team"/>
            <input   required  className="text" type="text" placeholder="brand" id="brand"/>
            <input   required  className="text" type="text" placeholder="season" id="season"/>
            <input   required  className="text" type="number" placeholder="price"  id="price"/>
            <input   required  className="text" type="text" placeholder="gender" id="gender"/>
            <input   className="text" type="number" placeholder="% percentage" id="discount"/>
            <label><h4>main image</h4></label>
            <input  type="file" placeholder="main" onChange={addMain} name="main"/>
            <label><strong>other images</strong> <button onClick={addImage}>add more images</button></label>            
            <input required  type="file" placeholder="other" onChange={addOther} name="photos" multiple/>
            {/* <input  type="file" placeholder="other" onChange={addOther} name="photos"/>
            <input  type="file" placeholder="other" onChange={addOther} name="photos"/>     */}
            <input type="submit" placeholder="add item" />
            
        </form>
        </div>
    )
}

export default Admin
