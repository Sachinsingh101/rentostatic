import logo from '../logo.jpg'
import img1 from '../images/1.jpg'
import img2 from '../images/2.jpg'
import img3 from '../images/3.jpg'
import img4 from '../images/4.jpg'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useEffect ,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Loader from './loader.js'
function Home(){
  const [data,setdata]=useState({
    items:[],
  })
  const [search,setsearch]=useState({
    value:"",
  })
  function searchHandler(e){
    setsearch({
     value:e.target.value
    })

  }
  const navigate=useNavigate();
  function submitHandler(e){
    e.preventDefault();
    navigate(`/search/${search.value}`)
  }
  
  useEffect(()=>{
    try{
        axios.get("https://rento-com.onrender.com/getdata").then(res=>{
        setdata({
          items:res.data,
        })
        console.log(process.env.REACT_APP_web_service)
      })
    }catch(err){
      console.log("error while fetching data",err);
    }
  },[])
    return(
        <>
          <div style={{width:"100vw",height:"80vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",color:"white"}} className="container text-center">
                  <img src={logo} style={{height:"85vh",width:"100vw",}} alt="Rento.com"/>
                  <h1 style={{position:"absolute",margin:"auto",marginTop:"-100px"}} >Find Your Desired Rento Home</h1><br/>
                  <form onSubmit={submitHandler} style={{position:"absolute",marginTop:"50px"}} className="container">
                    <div className='row'>
                      <div className='col-md-6 col-11 m-auto'>
                        <div className='row' style={{border:"5px solid skyblue",backgroundColor:" skyblue",borderRadius:"5px"}}>
                          <input id="search" required type="search" className=' col form-control' style={{width:"90%"}}  placeholder="Search by city, state , Zip" onChange={searchHandler}/>
                          <input type="submit" value="Search" className='col-2 btn text-white' />
                        </div>
                      </div>
                    </div>
                  </form>
          </div>
          <div className='container text-center mt-5 mb-5'>
            <div className='row justify-content-center'>
                <h2>-----Get Started with-----</h2>
                    <div className='col-md col-5 m-2 mt-4'>
                        <a href="#search"><img src={img1} className='col-12 getstartedimg' alt="Rento.com"/></a>
                        <a className='text-decoration-none text-dark' href="#search">Buying a home</a>
                    </div>
                    <div className='col-md col-5 m-2 mt-4'>
                        <a href="#search"><img src={img2} className='col-12 getstartedimg' alt="Rento.com" /></a>
                        <a href="#search" className='text-decoration-none text-dark'>Renting a home</a>
                    </div>
                    <div className='col-md col-5 m-2 mt-4'>
                        <Link to="/Sell/Rent"><img src={img3} className='col-12 getstartedimg' alt="Rento.com" /></Link>
                        <p><Link to="/Sell/Rent" className="text-dark text-decoration-none">Sell/Rent your property</Link></p>
                    </div>
                    <div className='col-md col-5 m-2 mt-4'>
                        <img  src={img4} className='col-12 getstartedimg' alt="Rento.com" />
                        <p >Rento offer upto 50% OFF</p>
                    </div>
            </div>
          </div>
          <div className='container'>
            <div className='row text-center'>
              <h2 id="homes">---Pick your Desired home---</h2>
              
            </div>
          </div>
          <div className='container'>
            <div className='row justify-content-center'>
              
              {
               data.items.length>0?
               data.items.reverse().map((value,i)=>{
                return <div className='col-md-3 shadow mt-3 mb-3'>
                <img alt={value.imgurl} src={`${value.imgurl}`} style={{width:"100%",height:'30vh'}}></img>
                <p>{value.housename}</p>
                <p>{value.houseaddress}</p>
                <p>{value.state}</p>
                <Link to={`/view/${value._id}`}><div className='btn btn-secondary form-control mb-3'>view</div></Link>
              </div>
              }):<Loader/>
              
              }
            </div>
          </div>
          <div className='container mb-3'>
            <div className='row align-items-center'>
              <div className='col m-auto text-center'>
                <Link className='text-decoration-none' to='/search/demo text'>Explore more <i class="fa-solid fa-arrow-right"></i></Link>
              </div>
            </div>
          </div>
        </>
    );
}

export default Home;