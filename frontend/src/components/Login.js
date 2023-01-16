import React, { useState, useEffect, useContext } from "react";
import httpClient from "../httpClient";
import Home from "./Home.js"
import { UserContext } from '../contexts/UserContext'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { users, updateUser } = useContext(UserContext);


  const logInUser = async () => {
    try {
      const resp = await httpClient.post("//localhost:5000/login", {
        email,
        password,
      });

      window.location.href = "/";
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        updateUser(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  return (
    <div>
      {users != null ? (
        <Home/>
      ) : (
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="button" className="btn btn-primary" onClick={() => logInUser()}>
                  Submit
                </button>
              </div>
              <p className="forgot-password text-right mt-2">
                Don't have an Account? <a href="/register">Register</a>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;