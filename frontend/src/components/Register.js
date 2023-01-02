import React, { useState } from "react";
import httpClient from "../httpClient";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [role, setRole] = useState("member");

  const registerUser = async () => {
    try {
      const resp = await httpClient.post("//localhost:5000/register", {
        email,
        password,
        name,
        surname,
        role,
      });

      window.location.href = "/";
    } catch (error) {
      if (error.response.status === 409) {
        alert("User already exists");
      }
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
          </div>
          <div className="form-group mt-3">
            <label>SurName</label>
            <input
              type="text"
              className="form-control mt-1"
              value={surname}
              onChange={(e) => setSurName(e.target.value)}
              placeholder="Your Lastname"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="button" className="btn btn-primary" onClick={() => registerUser()}>
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Already have an Account? <a href="/">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;