import React from "react";
import { Route, Switch , Link } from 'react-router-dom'
import AssignmentHome from "../../Admin/Template/AssignmentHome";
import UserList from "../../Admin/UserList";
import Profile from "../profile/Profile";
import "./admin.scss";
import axios from "axios";

export default function AdminHome() {

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      //window.location.href = "/";
    }
  };


  return (
    <div className="fmwrapper">
            <div className="fmsidebar">
            <h3>Admin<br></br> Dashboard</h3>
                <ul>
                    <li><i className="fa fa-home"></i> <Link className="nav-link" to="/profile">Profile</Link></li>
                    <li><i className="fa fa-user"></i> <Link className="nav-link" to="/assignments">Template / Assignments</Link></li>
                    <li><i className="fa fa-user"></i> <Link className="nav-link" to="/userlist">User List</Link></li>
                    <li><i className="fa fa-user"></i><Link  className="nav-link" to="/" onClick={handleLogout} style={{ textDecoration: "none" }} > Logout </Link></li>
                </ul>
                </div>
                <div className="fmmain_content">
                <Switch>
                <Route path = "/a/assignment/" exact component = {AssignmentHome}/>
                </Switch>

                <div className="fminfo">

                <Switch>
                <Route path = "/profile"  component = {Profile}/>
                <Route path = "/userlist" component = {UserList}/>

                </Switch>
                
                
                </div>
                </div>
              
        </div>
  );
}
