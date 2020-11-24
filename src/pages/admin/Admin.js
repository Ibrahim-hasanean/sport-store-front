import React , {useState,useEffect,useCallback} from 'react'
import {Redirect} from "react-router-dom"
import axios from 'axios'
import "./admin.css"
import useAuthContext from "../../context/AuthContext"
import "../login/login.css";

function Admin() {
    let url = process.env.REACT_APP_BACKEND_URL;
    const [isAdmin,setIsAdmin] = useState(true)
    let {isToken} = useAuthContext()    
    const [isLoading,setIsLoading] = useState(true)
    const [mainFile,setMainFile] = useState(null);
    const [otherFiles,setOtherFiles] = useState([])
    const [itemData,setItemData]= useState({});
    let checkIsAdmin = useCallback(
        async()=>{  
            try{
                let result = await axios.get(`${url}/api/v1/admin/isAdmin`,{headers:{"x-access-token":isToken}});            
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
           },
        [isToken],
    )
    useEffect(()=>{  
        let mount = true 
        if(mount)  
        checkIsAdmin()        
        return ()=> mount =false             
    },[checkIsAdmin])    
       
      const addMain=async(e)=>{
        let  file = e.target.files[0];
       setMainFile(file)
        
      }

      const addOther =async (e)=>{
        let  file = e.target.files;     
        console.log(file)   
        setOtherFiles(file)
       
      } 
      
      const onChange=(e)=> {
          console.log(itemData)
        setItemData({...itemData , [e.target.name]:e.target.value})
      }
    const submit =async (e)=>{
        e.preventDefault()
        const data = new FormData()      
        for(let i=0; i<otherFiles.length;i++){
            data.append("photos",otherFiles[i])
        }    
        data.append("main",mainFile)        
        data.append("category",itemData.category);
        data.append("type",itemData.type);
        data.append("size",itemData.size);
        data.append("brand",itemData.brand);
        data.append("price",itemData.price);
        data.append("gender",itemData.gender);
        data.append("team",itemData.team);
        data.append("discount",itemData.discount/100);
        data.append("season",itemData.season);
        console.log(data)
      
       //https://sportstore1.herokuapp.com
       try{
        let request = await axios.post(`${url}/api/v1/admin/items`,data,{headers:{
           "x-access-token":isToken , 
           'Content-Type': 'multipart/form-data'         
        }})
       console.log(request)
       alert("item added")
    }catch(e){
        alert("somthing wrong")
    }
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
            <input onChange={onChange}   required className="text" type="text" placeholder="category" id="category"  name="category"/>            
            <input onChange={onChange}   required className="text" type="text" placeholder="type" id="type" name="type"/>
            <input onChange={onChange}   required className="text" type="text" placeholder="team" id="team" name="team"/>
            <input onChange={onChange}   required  className="text" type="text" placeholder="brand" id="brand" name="brand"/>
            <input onChange={onChange}   required  className="text" type="text" placeholder="season" id="season" name="season"/>
            <input onChange={onChange}   required  className="text" type="number" placeholder="price"  id="price" name="price"/>
            <input onChange={onChange}   required  className="text" type="text" placeholder="gender" id="gender" name="gender"/>
            <input onChange={onChange}   className="text" type="number" placeholder="% percentage" id="discount" name="discount"/>
            <label><h4>main image</h4></label>
            <input  type="file" placeholder="main" onChange={addMain} name="main"/>
            <label><h4>other images</h4></label>     
            <input   type="file" placeholder="other" onChange={addOther} name="photos" multiple/>
           
            <input id="submit" type="submit" placeholder="add item" />
            
        </form>
        </div>
    )
}

export default Admin
