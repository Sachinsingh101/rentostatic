import axios from "axios";
import {useParams ,Link} from 'react-router-dom'
import {useEffect,useState} from 'react'
import Loader from "./loader";

function Specificsearch(){
  const param=useParams();
  const id=param.id;
    const [value,setvalue]=useState({
        items:[]
    })
    const [data,setdata]=useState({
      value:id 
    })

    function changeHandler3(e){
      setdata({
        value:e.target.value
      })
    }
    function serachHandler(e){
      e.preventDefault();
      try{
        axios.get(`https://rento-com.onrender.com/userchoice/${data.value}`).then(res=>{
            setvalue({
                items:res.data
            })
        
        });
    }catch{
        console.log("error while fetching specific home");
    }
    }
    useEffect(()=>{
        try{
            axios.get(`https://rento-com.onrender.com/userchoice/${id}`).then(res=>{
                setvalue({
                    items:res.data
                })
            
            });
        }catch{
            console.log("error while fetching specific home");
        }
    },[])
    return(
        <>

          <div className='container mt-5 mb-5'>
             
            <div className="row justify-content-center">
              <div className="col-md-7 col-11">
              <form className="d-flex bg-primary p-2" onSubmit={serachHandler}>
               <input type="search" value={data.value} className="form-control" placeholder="Search by state,city,pincode.." onChange={changeHandler3}></input>
               <input type="submit" className="btn btn-primary" value="Submit"></input>
              </form>
             <h6 className="text-center text-muted mt-1 mb-4">{value.items.length} items matching your result !!</h6>
              </div>
            </div>
            <div className='row justify-content-center'>
              {
                value.items.length>0?
                value.items.reverse().map((value,i)=>{
                  console.log(value);
                 return <div className='col-md-3 shadow mb-3'>
                  <img alt="Rento.com" src={`${value.imgurl}`} style={{width:"100%"}}></img>
                  <p>{value.housename}</p>
                  <p>{value.houseaddress}</p>
                  <p>{value.state}</p>
                  <Link to={`/view/${value._id}`}><div className="btn btn-secondary form-control mb-3">View</div></Link>
                </div>
              }):<Loader/>
              }
            </div>
          </div>
        </>
    );
}

export default Specificsearch;