import {useState , useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
function Rent(){
  const navigate=useNavigate();
  useEffect(function(){
    try{
      const token=localStorage.getItem("token");
       axios({
        url:'http://localhost:5000/rent',
        method:'get',
        headers:{
           "Content-Type":"application/json",
           "Authorization":token
        }
      }).then(res=>{
        const input=res.data
        console.log(input)
        if(input.msg==='Authorization denied'){
          alert("Signup or Login to access this page");
          navigate('/Signup');
        }else{
          console.log("welcome");
        }

      })
    }catch{
      console.log("error");
    }

  },[])

  


    const [home,sethome]=useState({
        housename:"",
        houseaddress:"",
        country:"",
        state:"",
        pincode:"",
        type:"",
        image:null,
    })

    function changeHandler1(e){sethome({...home,housename:e.target.value})}
    function changeHandler2(e){sethome({...home,houseaddress:e.target.value})}
    function changeHandler3(e){sethome({...home,country:e.target.value})}
    function changeHandler4(e){sethome({...home,state:e.target.value})}
    function changeHandler5(e){sethome({...home,pincode:e.target.value})}
    function changeHandler6(e){sethome({...home,type:e.target.value})}
    function changeHandler7(e){sethome({...home,image:e.target.files[0]})}
    
    


    function submitHandler(e){
        e.preventDefault();
        const formdata=new FormData();
        formdata.append('image',home.image)
        formdata.append('housename',home.housename)
        formdata.append('houseaddress',home.houseaddress)
        formdata.append('country',home.country)
        formdata.append('state',home.state)
        formdata.append('pincode',home.pincode)
        formdata.append('type',home.type)
        try{
          axios.post('https://rento-com.onrender.com/renthome',formdata);
          console.log("home added successfully");
        }catch(err){
            console.log("error while adding renthome",err);
        }
    }


    return(
        <>
         <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-7 col-12 m-auto">
                    <form className="p-5 bg-dark text-white" encType='multipart/form-data' onSubmit={submitHandler}>
                        <h3 className="text-center">Sell/Rent Your home</h3>
                        <label for="house">Apartment Name</label>
                        <input type="text" id="house" className="form-control" placeholder="Enter Apartment name" onChange={changeHandler1}></input>
                        <label for="address" className="mt-3">Apartment Address</label>
                        <input type="text" id="address" className="form-control" placeholder="Enter Apartment Address" onChange={changeHandler2}></input>
                        <label for="country" className="mt-3">Country of Origin</label>
                        <input type="text" id="country" className="form-control" placeholder="Enter Country name" disabled value="India" onChange={changeHandler3}></input>
                        <label for="state" className="mt-3">State</label>
                        <input type="text" id="state" className="form-control" placeholder="Enter Your state" onChange={changeHandler4}></input>
                        <label for="pincode" className="mt-3">Pincode</label>
                        <input type="text" id="pincode" className="form-control" placeholder="Enter Your pincode" onChange={changeHandler5}></input>
                        <label for="house" className="mt-3">Rent type</label>
                        <select className="form-select" onChange={changeHandler6}>
                            <option selected>Room</option>
                            <option>Home</option>
                            <option>Hotel</option>
                            <option>Other</option>
                        </select>
                        <label for="house" className="mt-3">Apartment/Room Photo</label>
                        <input type="file" name="image" className="form-control" placeholder="Enter Apartment/Room actual Photo" onChange={changeHandler7}></input>
                        <input type="submit" value="submit" className='form-control btn btn-success mt-3'></input>
                    </form>
                </div>
            </div>
         </div>
        </>
    );
}
export default Rent;
