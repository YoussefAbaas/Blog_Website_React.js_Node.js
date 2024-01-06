import React from "react";
import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        src="https://sierranevada.ca.gov/wp-content/uploads/sites/326/2022/10/HazelCreek-meadowBoardwalk.jpg"
        alt=""
        className="headerImage"
      />
    </div>
  );
}
