

import Admin from './admin';
import {useState ,useEffect} from 'react'
import axios  from 'axios';
import {useNavigate} from 'react-router-dom'
import Loader from './loader';
function Recent(){
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
  useEffect(()=>{
    try{
        axios.get('https://rento-com.onrender.com/getapplied').then(res=>{
        setdata({
          items:res.data
        })
      })
    }catch(err){
      console.log("erro while geeting applied user");
    }
  },[])
    return(
        <>
        <Admin/>
          <div className='container'>
            <div className='row justify-content-center'>
                {
                  data.items.length>0?
                  data.items.reverse().map((value,i)=>{
                    return <div className='col-md-7 col-11 radius shadow mt-5 text-dark p-3 text-start'>
                      <h6>Name:- {value.name}</h6>
                      <h6>Email:- {value.email}</h6>
                      <h6>applied for :- {value.housename}</h6>
                      <h6>Address :-{value.houseaddress}</h6>
                      <h6>phone :- {value.phone}</h6>
                    </div>
                  }):<Loader/>
                }

            </div>
          </div> 
        </>
    );
}
export default Recent;