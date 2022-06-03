import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {useSelector} from 'react-redux'


function Admin() {
    const auth = useSelector(state => state.auth)
  const { isLogged , isAdmin} = auth
  return (
    <div></div>
  )
}

export default Admin