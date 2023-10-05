import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import React from 'react'
import { useUserContext } from "../hooks/useUserContext"


const NavBar = () => {
  const { user } = useUserContext()
  const { logout } = useLogout()
  const handleClick = () => { 
    logout()
  }

  return (
    <div className="navbar">
      <div className="container">
        <Link to="/"><h4> PeerPrep </h4></Link>
        {/* <Link to="/register"><h4> Register </h4></Link>
        <Link to="/login"><h4> Log in </h4></Link>  */}
        { !user && <Link to="/register"><h4> Register </h4></Link> }
        { !user && <Link to="/login"><h4> Log in </h4></Link> }
        {/* <Link to="/profile">
            <span class="material-symbols-outlined small-icons">account_circle</span>  
        </Link> */}

        {/* TODO: Log out logic*/}
        { user && 
          <div> 
            <button onClick={handleClick}>Log Out</button>
          </div>
        }

        { 
          user && <Link to="/profile"> 
          <span class="material-symbols-outlined small-icons">account_circle</span>
          </Link>
        }
      </div>
    </div>
  )
}

export default NavBar