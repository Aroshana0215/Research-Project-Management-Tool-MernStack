import React from 'react';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'


function Header() {
    const auth = useSelector(state => state.auth)
    const {user , isLogged} = auth

    const userLink = () =>{
        return <li>
            <Link>
                <img src = {user.avatar} alt=""/> {user.name}
            </Link>
        </li>
    }

  return (
      <header>
          <div className='logo'>
              <h1><Link to="/" >Research Management Tool</Link></h1>
          </div>

          <ul>
              <li><Link to="/"><i className='fas fa-shopping-cart' ></i>Cart</Link></li>
              {
                  isLogged
                  ? userLink()
                  : <li><Link to="/login"><i className='fas fa-user' ></i>Login</Link></li>
              }
              
          </ul>
      </header>
  ); 
}

export default Header