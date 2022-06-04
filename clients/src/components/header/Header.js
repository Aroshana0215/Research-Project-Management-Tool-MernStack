import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./header.css";

function Header() {
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  const handleProfile = async () => {
    try {
      window.location.href = "/profile";
    } catch (err) {
    }
  };

  const handleLogin = async () => {
    try {
      window.location.href = "/login";
    } catch (err) {
    }
  };

  const userLink = () => {
    return (
      <li className="drop-nav">
        <Link to="/" className="avatar" style={{ textDecoration: "none" }}>
          <img src={user.avatar} width="30" height="35" alt="" /> {user.name}{" "}
        </Link>
        <ul class="dropdown">
          <li class="dropdown-item">
            <Link to="/profile" style={{ textDecoration: "none" }}>
              Profile
            </Link>
          </li>
          <li class="dropdown-item">
            <Link
              to="/"
              onClick={handleLogout}
              style={{ textDecoration: "none" }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </li>
    );
  };

  const transForm = {
    transform: isLogged ? "translateY(-5px)" : 0,
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={require("./SLIIT_Logo_Crest.png")}
            alt=""
            width="40"
            height="45"
            className="m-2"
          />
          Research Project Management Tool
        </a>

        <a className="navbar-brand" href="/"></a>
        <br />

        <form className="d-flex">
          {!user.name ? (
            <h4>
              <Link 
              className="m-3"
              to="/login"
              style={{ textDecoration: "none" ,  }}
            >
              Login
            </Link>
            </h4>
          ) : (
            <>
              <Link
                className="nav-link active transperent"
                aria-current="page"
                to="/profile"
                style={{ textDecoration: "none" }}
              >
                {user.name}
              </Link>
              <img src={user.avatar} width="40" height="45" alt="" />
            </>
          )}
        </form>
      </div>
    </nav>
    // <header>

    //   <div className="logo">
    //     <h1>
    //       <Link to="/">Research Management Tool</Link>
    //     </h1>
    //   </div>

    //       <ul style={transForm}>
    //           {/* <li><Link to="/"><i className='fas fa-shopping-cart' ></i>Cart</Link></li> */}
    //           {
    //               isLogged
    //               ? userLink()
    //               : <li><Link to="/login"><i className='fas fa-user' ></i>Login</Link></li>
    //           }

    //       </ul>
    //   </header>
  );
}

export default Header;
