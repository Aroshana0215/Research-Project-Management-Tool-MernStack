import React from "react"
import { Route, Switch } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Login from "./auth/Login";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import AdminHome from "./auth/AdminHome";

function Body() {
  const auth = useSelector(state => state.auth)
  const {user , isLogged} = auth

  console.log(isLogged)
  return (
    <div>
      <Switch>
        <Route path="/login" component={isLogged ? AdminHome : Login}  exact/>
        <Route path="/register"  component={Register}  exact/>
        <Route path="/user/activate/:activation_token"  component={ActivationEmail} exact />
      </Switch>
    </div>
  )
}

export default Body;