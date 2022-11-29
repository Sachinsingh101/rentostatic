
import axios from "axios";
import {useParams , Link} from 'react-router-dom'
import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Loader from "./loader";

function View(){
    const navigate=useNavigate();
    useEffect(function(){
      try{
        const token=localStorage.getItem("token");
         axios({
          url:'https://rento-com.onrender.com/rent',
          method:'get',
          headers:{
             "Content-Type":"application/json",
             "Authorization":token
          }
        }).then(res=>{
          const input=res.data
          console.log(input)
          if(input.msg==='Authorization denied'){
            alert("Signup or Login to apply for this home");
            navigate('/Signup');
          }else{
            console.log("welcome");
          }
  
        })
      }catch{
        console.log("error");
      }
  
    },[])
    const [value,setvalue]=useState({
        items:""
    })
    const param=useParams();
    const id=param.id;
    useEffect(()=>{
        try{
            axios.get(`https://rento-com.onrender.com/view/${id}`).then(res=>{
                setvalue({
                    items:res.data
                })

            });
        }catch{
            console.log("error while fetching specific home");
        }
    },[])

    function applyHandler(){
        const data=localStorage.getItem('token')
        const applydata={
            token:data,
            id:id
        }
        try{
            axios.post('https://rento-com.onrender.com/apply',applydata);
            console.log("applied successfully");
        }catch(err){
            console.log("error while applying" ,err);
        }
        
    }

    return(
        <>
          
          <div className='container mt-5 mb-5'>
            <div className='row justify-content-center'>
               {
                value.items?
                <div className='col-md-6 shadow'>
                 <img alt="Rento.com" src={`${value.imgurl}`} style={{width:"100%"}}></img>
                 <p>{value.items.housename}</p>
                 <p>{value.items.houseaddress}</p>
                 <p>{value.items.state}</p>
                 <Link className="text-decoration-none text-white"><div className='btn btn-secondary form-control mb-3' onClick={applyHandler}>Instant apply</div></Link>
                </div>:<Loader/>
               }
            </div>
          </div>
        </>
    );
}

export default View;