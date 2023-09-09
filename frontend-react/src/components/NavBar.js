import { Link } from "react-router-dom"

import React from 'react'

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <Link to="/"><h4> PeerPrep </h4></Link>
        <Link to="/register"><h4> Register </h4></Link>
        <Link to="/login"><h4> Log in </h4></Link>
        <Link to="/profile">
            <span class="material-symbols-outlined small-icons">account_circle</span>  
        </Link>
      </div>
    </div>
  )
}

export default NavBar