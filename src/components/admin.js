import {Link} from 'react-router-dom'

function Admin(){

    return(
        <>
          <div className="container-fluid">
            <div className="row bg-secondary p-1 text-white ">
                <Link to="/admin/workgroud/recents" className="col text-decoration-none text-white text-end ">Recents</Link>
                <Link to='/admin/workground/actions' className="col text-decoration-none text-white">Actions</Link>
            </div>
          </div>  
       </>
    );
}
export default Admin;