import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Signup(){
    const [user,setuser]=useState({
        name:"",
        email:"",
        phone:""
    })
    const navigate=useNavigate();
    function changeHandler1(e){
        setuser({
            ...user,name:e.target.value
        })
    }
    function changeHandler2(e){
        setuser({
            ...user,email:e.target.value
        })
    }
    function changeHandler3(e){
        setuser({
            ...user,phone:e.target.value
        })
    }
    function submitHandler(e){
        e.preventDefault();
        const userdata={
            name:user.name,email:user.email,phone:user.phone
        }
        try{
            axios.post('https://rento-com.onrender.com/Signup',userdata).then(res=>{
                const resdata=res.data;
                if(resdata==='user already exist'){
                    alert("Email already exist !!");
                }else{
                    localStorage.setItem('token',resdata);
                    alert("Signup successfull !!");
                    navigate('/');
                }
            });
        }catch{
            console.log("error while adding user");
        }
    }
    return(
        <>
         <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-6 col-11 m-auto">
                    <form className="p-5 shadow bg-dark text-white" onSubmit={submitHandler}>
                        <h1 className="text-center">Not have an account? Please Signup</h1>
                        <label htmlFor="name">Your Name</label>
                        <input minlength="3" type="text" id="name" placeholder="enter your name" name="name" className="form-control" onChange={changeHandler1} required/>
                        <label htmlFor="email" className="mt-3">Your Email</label>
                        <input minlength="12" maxlength="100" type="email" id="email" name="email" placeholder="Enter your Email" className="form-control" onChange={changeHandler2} required></input>
                        <label htmlFor="phone" className='mt-3'>Phone No.</label>
                        <input minlength="10" maxlength="10" type="tel" name="phone" id="phone" placeholder="Enter Your Phone Number" className="form-control" onChange={changeHandler3} required></input>
                        <input type="submit" value="submit" className="btn btn-primary form-control mt-3"></input>
                    </form>
                </div>
            </div>
         </div>
        </>
    );
}

export default Signup;