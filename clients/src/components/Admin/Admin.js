import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {useSelector} from 'react-redux'
import AdminHome from '../body/auth/AdminHome'
import NotFound from '../utils/NotFound/NotFound'
import UserList from './UserList'
import EditUser from '../body/profile/EditUser'
import AssignmentHome from './Template/AssignmentHome'
import AddAssignment from './Template/AddAssignment'
import EditAssignment from './Template/EditAssignment'
import Register from '../body/auth/Register'


function Admin() {
    const auth = useSelector(state => state.auth)
  const { isLogged , isAdmin} = auth
  return (
    <div>
      <Switch>
      {/* <AdminHome/> */}
        {/* <Route path="/login" component={isLogged ? NotFound : Login}  exact/>
        <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPassword}  exact/>
        <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPassword}  exact/>
        
        <Route path="/profile"  component={isLogged ? Profile : NotFound }  exact/>
        <Route path="/user/activate/:activation_token"  component={ActivationEmail} exact /> */}
        <Route path="/userlist"  component={isAdmin ? UserList : NotFound }  exact/>
        <Route path="/edit_user/:id"  component={isAdmin ? EditUser : NotFound }  exact/>
        <Route path="/assignment" component={isAdmin ? AssignmentHome : NotFound} exact/>
        <Route path="/assignment/add" component={isAdmin ? AddAssignment : NotFound} exact/>
        <Route path="/assignment/edit/:id" component={isAdmin ? EditAssignment : NotFound} exact />
        <Route path="/register"  component={isLogged ? NotFound : Register}  exact/>
      </Switch>
    </div>
  )
}

export default Admin