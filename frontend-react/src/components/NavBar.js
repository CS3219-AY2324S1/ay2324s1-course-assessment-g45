import { Link, useNavigate} from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import React, { useState, useEffect, useRef } from 'react';
import { useUserContext } from "../hooks/useUserContext"
import logo from '../assets/images/logo.svg'
import { useWaitingBanner } from '../hooks/useWaitingBanner';
import WaitingBanner from "./WaitingBanner";

const NavBar = () => {
  const { user } = useUserContext()
  const { logout } = useLogout()
  const [isClicked, setIsClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { state } = useWaitingBanner();
  let menuRef = useRef();


  useEffect(() => {
    // Only set up the event listeners if the user is logged in
    if (user) {
      let handler = (e) => {
        if (!menuRef.current.contains(e.target)) {
          setOpen(false)
        }
      };
  
      document.addEventListener("mousedown", handler)
  
      // Cleanup event listener when component is unmounted or when user logs out
      return () => {
        document.removeEventListener("mousedown", handler)
      };
    }
  }, [user]);

  const handleLogout = () => { 
    logout()
    setOpen(false)
  }

  const navigateToProfile = () => {
    setOpen(false)
    navigate('/Profile')
  }

  return (
    <>
    <nav>
 
     
      <div className="navdiv" > 
      <Link to = "/match">
      <img className = "logoImage" src={logo}>
            </img>      
      </Link>
      <h4 className="card-title ms-2" style={{color: 'white'}}>Peer Prep</h4>
      {user &&
        <ul id = "navbar" 
         className = {isClicked ? "#navbar active" : "#navbar"}
        > 
         <li><Link className={location.pathname === "/match" ? "active" : ""}
          to = "/match"> Home </Link></li>  
         <li><Link className={location.pathname === "/" ? "active" : ""}
          to = "/"> Questions </Link></li>  
          {user && user.role === "maintainer" &&
          <li><Link className={location.pathname === "/maintainer" ? "active" : ""}
          to = "/maintainer"> Dashboard </Link></li>  }
        </ul>
         }
      </div>  

      <div>
            {state.showBanner && <div><WaitingBanner></WaitingBanner></div>}
            {/* ... other navbar contents ... */}
        </div>


      
      {user &&
      <div className='menu-container' ref={menuRef}>
          <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          <img src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350">
            </img>
          </div>
          <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}> 
            <h3>{user.username}<br/>{user.role != "user" && <span>Role: {user.role}</span>}</h3>
            <ul>
              <DropdownItem img = {"https://img.icons8.com/ios-filled/50/user-male-circle.png"} text = {"My Profile"} onClick ={navigateToProfile}/>
              <DropdownItem img = {"https://img.icons8.com/ios-filled/50/logout-rounded-left.png"} text = {"Logout"} onClick ={handleLogout}/>
            </ul>
          </div>
      </div>
    }

   {user &&
      <div id = "collapse"> 
        <i id = "bar"
        className = {isClicked ? "fas fa-times" : "fas fa-bars"}
        onClick={() => setIsClicked(prevState => !prevState)}
        >
        </i>
      </div>
    }
      </nav>
      </>
  )
}

function DropdownItem(props) {
  return (
    <li className="dropdownItem">
      <img src={props.img}></img>
      <a onClick={props.onClick}> {props.text}</a>
    </li>
  );
}


export default NavBar