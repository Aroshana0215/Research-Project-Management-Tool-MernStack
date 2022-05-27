import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './app.scss'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/header/Header';
import Body from './components/body/Body';

const App = () => {

  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const {user , isLogged} = auth
  console.log(isLogged)

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
      const refreshtoken = sessionStorage.getItem('token')
      if (refreshtoken) {
        const getToken = async () => {
          const res = await axios.post(`http://localhost:5000/user/refresh_token/${refreshtoken}`, null)
          console.log(res)
          dispatch({ type: 'GET_TOKEN', payload: res.data.access_token })
        }
        getToken()
      }

    }
  }, [auth.isLogged])

  return (
    <Router>
      <div>
        <Header />
        <Body />
      </div>
    </Router>
  )
}

export default App;