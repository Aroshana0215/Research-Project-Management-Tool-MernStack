import React from "react"
import { Route, Switch } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Login from "./auth/Login";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import AdminHome from "./auth/AdminHome";
import NotFound from "../utils/NotFound/NotFound";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Profile from "./profile/Profile";
import EditUser from "./profile/EditUser";


function Body() {
  const auth = useSelector(state => state.auth)
  const { isLogged , isAdmin} = auth

  return (
    <div>
      <Switch>
        <Route path="/login" component={isLogged ? NotFound : Login}  exact/>
        <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPassword}  exact/>
        <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPassword}  exact/>
        <Route path="/register"  component={isLogged ? NotFound : Register}  exact/>
        <Route path="/profile"  component={isLogged ? Profile : NotFound }  exact/>
        <Route path="/user/activate/:activation_token"  component={ActivationEmail} exact />
        <Route path="/edit_user/:id"  component={isAdmin ? EditUser : NotFound }  exact/>
        
      </Switch>
    </div>
  )
}

export default Body;