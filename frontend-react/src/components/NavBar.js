import { Link } from "react-router-dom"

import React from 'react'
import { useUserContext } from "../hooks/useUserContext"

const NavBar = () => {
  const { user } = useUserContext()
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
          <h4> Log out </h4>
        }
      </div>
    </div>
  )
}

export default NavBar