import Admin from "./admin";
import {useState, useEffect} from 'react'
import axios from "axios";
import Loader from "./loader.js";
import {useNavigate} from 'react-router-dom'

function Action(){
   
    const navigate=useNavigate();
    useEffect(function(){
      try{
        const token=localStorage.getItem("token");
         axios({
          url:'https://rento-com.onrender.com/validateadmin',
          method:'get',
          headers:{
             "Content-Type":"application/json",
             "Authorization":token
          }
        }).then(res=>{
          const input=res.data
          console.log(input)
          if(input.msg==='Authorization denied'){
            alert("You are not Authorized to use this page");
            navigate('/Signup');
          }else{
            console.log("welcome");
          }
  
        })
      }catch{
        console.log("error");
      }
  
    },[])


    const [data,setdata]=useState({
        items:[]
    })
    const [search,setsearch]=useState({
        value:"",
    })
    function searchHandler(e){
        setsearch({
         value:e.target.value
        })
    
    }
    function submitHandler(e){
        e.preventDefault();
        const data={
            value:search.value
        }
        try{
            axios.post('https://rento-com.onrender.com/admin',data).then(res=>{
                const user=res.data;
                setdata({
                    items:user
                })
            })
        }catch{
            console.log('errro while fetching items')
        }
    }  
    useEffect(()=>{
        try{
            axios.get('https://rento-com.onrender.com/getdata').then(res=>{
            setdata({
              items:res.data
            })
    })
          console.log(data.items[0]);
        }catch(err){
          console.log("error while fetching data",err);
        }
      },[])

    function deleteHandler(e){
        e.preventDefault();
        try{
            const id=e.target.name;
            console.log(id);
            axios.delete(`https://rento-com.onrender.com/delete/${id}`);
            alert("deleted successfully");
        }
        catch{
            console.log("erro while deleting items")
        }
    }  
       return(
        <>
        <Admin/>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-10 mt-5">
                  <form className="d-flex p-2 bg-primary border" onSubmit={submitHandler}>
                    <input required onChange={searchHandler} type="search" placeholder="Search and Delete items"  className="form-control"/>
                    <input type="submit" value="Search" className="btn btn-primary"></input>
                  </form>            
                </div>
            </div>
        </div>
        <h6 className="text-center text-muted mt-1">{data.items.length} items matching your search</h6>
        <div className="container mb-5">
            <div className="row  justify-content-center">
             {
               data.items.length>0?
               data.items.reverse().map((value,i)=>{
                return <div className='col-md-3 shadow mt-3 mb-3'>
                  <img src={`https://rento-com.onrender.com/public/${value.image}`} style={{width:"100%",height:'30vh'}}></img>
                  <p>{value.housename}</p>
                  <p>{value.houseaddress}</p>
                  <p>{value.state}</p>
                  <form>
                      <input onClick={deleteHandler} type="submit" value="Delete" name={value._id} className="btn btn-danger form-control mb-3"></input>
                  </form>
                </div>
              }): <Loader/>
             }

            </div>
        </div>
        </>
    );
}
export default Action;