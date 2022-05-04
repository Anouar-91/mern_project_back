import React, {useContext, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'
import {UidContext} from '../AppContext'
import Logout from '../Log/Logout'

const Navbar = () => {
  const uid = useContext(UidContext)
  const userData = useSelector(state => state.userReducer )
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact="true" to="/">
            <div className="logo">
              <img src="./img/chapeau_de_paille.png" alt="icon"/>
              <h3>LineUp</h3>
            </div>
          </NavLink>
        </div>
        {uid ? 
        (<ul>
          <li className="welcome"><NavLink exact="true" to="/profil"><h5>Bienvenue {userData.pseudo} </h5></NavLink></li>
          <Logout/>
        </ul>) 
        : 
        (<ul>
          <li></li>
          <li><NavLink exact="true" to="/profil"><img src="./img/icons/login.svg" alt="login"/></NavLink></li>
        </ul>)}
      </div>

    </nav>
  )
}

export default Navbar