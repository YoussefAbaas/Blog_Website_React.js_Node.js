import React, { useContext } from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

export default function TopBar() {
  const { userData: user, setUserData } = useContext(UserContext);
  const handleLogout = () => {
    setUserData(null);
  };
  const PF = "http://localhost:5000/images/";
  return (
    <div className="top">
      <div className="topLeft">
        <i class="topIcon fa-brands fa-square-facebook"></i>
        <i class="topIcon fa-brands fa-square-twitter"></i>
        <i class="topIcon fa-brands fa-square-pinterest"></i>
        <i class="topIcon fa-brands fa-square-instagram"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <Link to="/" className="link">
            <li className="topListItem">Home</li>
          </Link>
          <Link to="/about" className="link">
            <li className="topListItem">About</li>
          </Link>
          <Link to="/contact" className="link">
            <li className="topListItem">Contact</li>
          </Link>
          <Link to="/write" className="link">
            <li className="topListItem">Write</li>
          </Link>
          <Link to="/login" className="link">
            {user && (
              <li className="topListItem" onClick={handleLogout}>
                Logout
              </li>
            )}
          </Link>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF + user.profilePicture} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <Link to="/login" className="link">
              <li className="topListItem">Login</li>
            </Link>
            <Link to="/register" className="link">
              {<li className="topListItem">Register</li>}
            </Link>
          </ul>
        )}
        <i class="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}
