import React, { useEffect, useState } from "react";
import "./sidebar.css";
import axiosInstance from "../../Services/axiosInstanse";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axiosInstance.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sideBarItem">
        <span className="sideBarTitle">About Me</span>
        <img
          className="topImg"
          src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
          alt=""
        />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
          ea a error alias necessitatibus architecto similique autem delectus
          mollitia adipisci! Autem itaque, assumenda odit vitae ratione ducimus
          veniam aliquam eligendi!
        </p>
      </div>
      <div className="sideBarItem">
        <span className="sideBarTitle">Categories</span>
        <ul className="sideBarList">
          {cats?.map((c) => {
            return (
              <Link to={`/?cat=${c.name}`} className="link">
                <li className="sideBarListItem">{c.name}</li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="sideBarItem">
        <span className="sideBarTitle">Follow Us</span>
        <div className="sideBarSocial">
          <i class="sideBarIcon fa-brands fa-square-facebook"></i>
          <i class="sideBarIcon fa-brands fa-square-twitter"></i>
          <i class="sideBarIcon fa-brands fa-square-pinterest"></i>
          <i class="sideBarIcon fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </div>
  );
}
