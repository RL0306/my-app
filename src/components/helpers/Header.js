import "../style/header.css"
import { UserContext } from "../context/UserContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Header = () => {  
  
  const [user, setUser] = useContext(UserContext);
  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("auth");
  }
  
  return (
    <header className="header">
    {user !== null ? 
      <React.Fragment>      
      <div className="header__container">
        <Link to={"/home"}><img src="/logo.png" alt="school logo" className="header__container__image"/></Link>
        <span className="header__container__role">{user.role}</span>
      </div>
      <nav className="navigation">
        <h2 className="navigation__heading">Home</h2>
        <h2 className="navigation__heading">{user.fullName}</h2>
        <h2 onClick={handleLogout} className="navigation__heading">Logout</h2>
      </nav>
      </React.Fragment>  
    : null}  
    </header>
  )
}

export default Header;