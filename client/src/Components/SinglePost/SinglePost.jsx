import React, { useContext, useEffect, useState } from "react";
import "./singlepost.css";
import { Link, useLocation } from "react-router-dom";
import axiosInstanse from "../../Services/axiosInstanse";
import { UserContext } from "../../Context/userContext";

export default function SinglePost() {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const [post, setPost] = useState();

  const { userData } = useContext(UserContext);

  const PF = "http://localhost:5000/images/";

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const fetchPost = async () => {
    const res = await axiosInstanse.get("/posts/" + postId);
    console.log("res", res);
    setPost(res.data);
    setTitle(res.data.title);
    setDesc(res.data.desc);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleDelete = async () => {
    await axiosInstanse.delete("/posts/" + postId, {
      data: { username: userData?.username },
    });
    window.location.replace("/");
  };

  const handleUpdate = async () => {
    try {
      await axiosInstanse.put("/posts/" + postId, {
        title,
        desc,
        username: userData?.username,
      });
      window.location.reload();
      setUpdateMode(false);
    } catch (err) {}
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post?.photo && (
          <img src={PF + post?.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="singlePostTitleInput"
            autoFocus
          />
        ) : (
          <h1 className="singlePostTitle">
            {post?.title}
            {post?.username === userData?.username && (
              <div
                className="singlePostEditContainer"
                onClick={() => setUpdateMode(true)}
              >
                <i className="singlePostIcon fa-solid fa-pen-to-square"></i>
                <i
                  className="singlePostIcon fa-solid fa-trash"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <Link to={`/?user=${post?.username}`} className="link">
            <span className="singlePostAuthor">
              Author :<b>{post?.username}</b>
            </span>
          </Link>
          <span className="singlePostDate">
            {new Date(post?.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        ) : (
          <p className="singlePostDesc">{post?.desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
