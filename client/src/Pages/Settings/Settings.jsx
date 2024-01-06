import React, { useContext, useState } from "react";
import "./settings.css";
import SideBar from "../../Components/SideBar/SideBar";
import { UserContext } from "../../Context/userContext";
import axiosInstance from "../../Services/axiosInstanse";

export default function Settings() {
  const { userData, setUserData } = useContext(UserContext);
  const [username, setUserName] = useState(userData?.username);
  const [email, setEmail] = useState(userData?.email);
  const [password, setPassword] = useState();
  const [file, setFile] = useState("");
  const [success, setSuccess] = useState(false);
  const PF = "http://localhost:5000/images/";

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: userData?._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (e) {}
    }
    try {
      const res = await axiosInstance.put(
        "/users/" + userData?._id,
        updatedUser
      );
      setUserData(res.data);
      setSuccess(true);
    } catch (e) {
      setSuccess(false);
    }
  };
  const handleDelete = () => {
    try {
      axiosInstance.delete("/users/" + userData?._id, {
        data: { userId: userData._id },
      });
      setUserData(null);
      window.location.replace("/login");
    } catch (e) {}
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span onClick={handleDelete} className="settingsDeleteTitle">
            Delete Account
          </span>
        </div>
        <form className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              className=""
              src={
                file ? URL.createObjectURL(file) : PF + userData?.profilePicture
              }
              alt=""
            />
            <label htmlFor="fileInput">
              <i class="settingsPPIcon fa-solid fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>UserName</label>
          <input
            type="text"
            placeholder="Youssef"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Youssef@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="settingsSubmit" onClick={handleUpdate}>
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <SideBar />
    </div>
  );
}
