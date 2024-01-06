import React, { useContext, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axiosInstance from "../../Services/axiosInstanse";
import { UserContext } from "../../Context/userContext";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUserData } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      setUserData(res.data);
      //res.data && window.location.replace("/");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>UserName</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
      <Link to="/register">
        <button className="loginRegisterButton">Register</button>
      </Link>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong!
        </span>
      )}
    </div>
  );
}
