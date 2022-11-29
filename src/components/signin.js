
import {useState} from 'react'
import axios  from 'axios';
import {useNavigate}  from 'react-router-dom'



function Signin(){
    const [data,setdata]=useState({
        name:"",
        email:""
    })
    const navigate=useNavigate();
    function changeHandler1(e){
        setdata({
            ...data,name:e.target.value
        })
    }
    function changeHandler2(e){
        setdata({
            ...data,email:e.target.value
        })
    }
    function submitHandler(e){
        e.preventDefault();
        const userdata={
            name:data.name,
            email:data.email
        }
        try{
            axios.post('https://rento-com.onrender.com/login',userdata).then(res=>{
                if(res.data!='user not found'){
                    const token=res.data;
                    localStorage.setItem('token',token);
                    alert("SignIn successfull");
                    navigate('/');
                }else{
                    alert("user not found");
                }
            });
        }catch(err){
            console.log("error while login user",err);
        }
    }
    return(
        <>
         <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-6 col-11 m-auto">
                    <form className="p-5 shadow bg-dark text-white" onSubmit={submitHandler}>
                        <h1 className="text-center">Welcome back !! Please Signin</h1>
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" placeholder="enter your name" name="name" className="form-control" onChange={changeHandler1} required ></input>
                        <label htmlFor="email" className="mt-3">Your Email</label>
                        <input type="email" name="email" id="email" placeholder="Enter your Email" className="form-control" onChange={changeHandler2} required></input>
                        <input type="submit" value="submit" className="btn btn-primary form-control mt-3"></input>
                    </form>
                </div>
            </div>
         </div>
        </>
    );
}

export default Signin;