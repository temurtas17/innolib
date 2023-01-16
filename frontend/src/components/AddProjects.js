import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from "react";
import httpClient from "../httpClient";
import Layout from "./Layout";
import { UserContext } from '../contexts/UserContext'

const AddProjects = () => {
  const { users, updateUser } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userid, setUserid] = useState("");
  const [name, setName] = useState("");

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      return;
    }
    setUserid(users.id);
    setName(users.name);
  });

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        updateUser(resp.data);
        firstUpdate.current = false;
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  const addProject = async () => {
    try {
      const resp = await httpClient.post("//localhost:5000/add", {
        title,
        body,
        userid,
        name,
      });

      window.location.href = "/";
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <>
    {users != null ? (
    <>
    <Layout/>
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Enter Your Project</h3>
          <div className="form-group mt-3">
            <label>Title:</label>
            <input
              type="text"
              className="form-control mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project Title"
            />
          </div>
          <div className="form-group mt-3">
            <label>Description:</label>
            <textarea 
              rows='5' 
              className='form-control' 
              value={body}
              placeholder='Please Enter Project' 
              onChange={(e) => setBody(e.target.value)}/>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="button" className="btn btn-primary" onClick={() => addProject()}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div></>):(null)}
    </>
  );
};

export default AddProjects;
