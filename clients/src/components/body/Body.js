import React from "react"
import { Route, Switch } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Login from "./auth/Login";
import ActivationEmail from "./auth/ActivationEmail";
import NotFound from "../utils/NotFound/NotFound";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Profile from "./profile/Profile";
import EditUser from "./profile/EditUser";
import UserList from "../Admin/UserList";
import AssignmentHome from "../Admin/Template/AssignmentHome"
import AddAssignment from "../Admin/Template/AddAssignment"
import EditAssignment from "../Admin/Template/EditAssignment"
import AdminHome from "./auth/AdminHome";
import Register from "./auth/Register";

function Body() {
  const auth = useSelector(state => state.auth)
  const { isLogged , isAdmin} = auth

  return (
    <div>
      
      <Switch>
      <Route path="/admin" component={AdminHome}  exact/>
        <Route path="/login" component={isLogged ? NotFound : Login}  exact/>
        <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPassword}  exact/>
        <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPassword}  exact/>
        <Route path="/register"  component={isLogged ? NotFound : Register}  exact/>
        <Route path="/profile"  component={isLogged ? Profile : NotFound }  exact/>
        <Route path="/user/activate/:activation_token"  component={ActivationEmail} exact />
        <Route path="/userlist"  component={isAdmin ? UserList : NotFound }  exact/>
        <Route path="/edit_user/:id"  component={isAdmin ? EditUser : NotFound }  exact/>
        <Route path="/assignment" component={isAdmin ? AssignmentHome : NotFound} exact/>
        <Route path="/assignment/add" component={isAdmin ? AddAssignment : NotFound} exact/>
        <Route path="/assignment/edit/:id" component={isAdmin ? EditAssignment : NotFound} exact />
      </Switch>
    </div>
  )
}

export default Body;