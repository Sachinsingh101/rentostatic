

function Loader(){
    return(
        <>
         <div className="spinner-grow text-center mt-5 mb-5" role="status">
           <span className="visually-hidden">Loading...</span>
         </div>
         <h6 className="text-center text-muted">Wait for a while</h6>
        </>
    );
}

export default Loader;