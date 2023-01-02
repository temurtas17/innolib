import React, { useState } from "react";
import httpClient from "../httpClient";

const AddProjects = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userid, setUserid] = useState(props.id);
  const [name, setName] = useState(props.name);

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
    </div>
  );
};

export default AddProjects;
