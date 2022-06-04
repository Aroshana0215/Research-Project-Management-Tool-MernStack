import React from 'react'
import { useSelector } from "react-redux";
import axios from "axios";


function MenuBar() {
  const auth = useSelector((state) => state.auth);
  const { isLogged  , isAdmin , isStudent , isSupervisor , isCoSupervisor , isPanelMember } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div ><nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">{isStudent ? <>Student Dashboard</> : isAdmin ? <>Admin Dashboard</> : isSupervisor ?  <>Supervisor Dashboard</> : isCoSupervisor ? <>CoSupervisor Dashboard</> : isPanelMember ? <>Panel Member Dashboard</> : <>Home</> }</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {isAdmin ? (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" href="/userlist" >User List </a>
        </li>
          
          <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/template">Template Management</a>
        </li>
          
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Group Management
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><hr className="dropdown-divider"/></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Group Management
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><hr className="dropdown-divider"/></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
          <a class="nav-link active" href="/" onClick={handleLogout}>Logout</a>
        </li>
        </ul>  
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div> ) : isStudent ? (<div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="/student/template/">Download Template</a>
      </li>
        <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="/student/submission">Submisson</a>
      </li>
        <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Group Details</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Topic Details</a>
      </li>
        <li class="nav-item">
        <a class="nav-link active" href="/" onClick={handleLogout}>Logout</a>
      </li>
      </ul>  
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>) : isCoSupervisor ? (<div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <a class="nav-link active" href="/" onClick={handleLogout}>Logout</a>
      </li>
      </ul>  
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>) : isSupervisor ?  (<div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <a class="nav-link active" href="/" onClick={handleLogout}>Logout</a>
      </li>
      </ul>  
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>) : isPanelMember ? (<div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <a class="nav-link active" href="/" onClick={handleLogout}>Logout</a>
      </li>
      </ul>  
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>) : (<></>) }
    </div>
  </nav></div>
  )
}

export default MenuBar