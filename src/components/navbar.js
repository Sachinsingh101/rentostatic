import {Link} from 'react-router-dom'

function Navbar(){
    return(
            <nav class="navbar navbar-expand-lg bg-dark text-white container-fluid">
                <div class="container-fluid">
                <div className="ms-3">
                 <h1 className="h1" id="rento">Rento<span className="h6 ">.com</span></h1>
                 <p style={{marginTop:"-18px",}} className="text-muted">Find your Desired home</p>
                </div>
               <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                 <span class="navbar-toggler-icon"></span>
               </button>
               <div class="collapse navbar-collapse ms-5 " id="navbarSupportedContent">
                 <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                   <li class="nav-item">
                     <a class="nav-link active text-white" aria-current="page"><Link to="/" className="text-white text-decoration-none">Home</Link></a>
                   </li>
                  <li class="nav-item">
                     <a class="nav-link text-white" ><Link to="/aboutus" className='text-decoration-none text-white'>About</Link></a>
                   </li>
                   <li class="nav-item dropdown">
                     <a disabled class="nav-link dropdown-toggle text-white"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                       Services
                     </a>
                     <ul class="dropdown-menu bg-white">
                       <li><a class="dropdown-item text-dark" href="#homes">Book your home now</a></li>
                       <li><a class="dropdown-item text-dark" >24*7 help</a></li>
                       <li><hr class="dropdown-divider dark" /></li>
                       <li><a class="dropdown-item text-white" >Pay advance</a></li>
                     </ul>
                   </li>
                   <li class="nav-item">
                     <Link to='/admin/workground' class="nav-link text-white">Admin</Link>
                   </li>
                 </ul>
                 <span className='me-2'><Link to="/Signup"  className="text-white text-decoration-none">Signup</Link></span>|<span className="ms-2"><Link to="/Signin" className="text-white text-decoration-none">Signin</Link></span>
               </div>
             </div>
           </nav>
    );
}
export default Navbar;