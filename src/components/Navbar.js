import React from 'react'
import {Link,useLocation,useHistory} from 'react-router-dom';

export default function Navbar() {
  const history=useHistory();
  const location=useLocation();
  // useEffect(() => {
  // console.log(location.pathname);
  // }, [location])
  const handleLogout=()=>{
localStorage.removeItem('token');
history.push("/login");
  }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">Students Management</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse position-absolute " id="navbarSupportedContent" style={{right:"85px"}}>
      
      {!localStorage.getItem('token')?<form className="d-flex ">
      <Link className="btn btn-outline-success mx-2" to="/login">Login</Link>
        <Link className="btn btn-outline-success" to ="/signup">Signup</Link>
      </form>: <button className="btn btn-outline-success" onClick={handleLogout}>Logout</button> }
    </div>
  </div>
</nav>
        </div>
    )
}
