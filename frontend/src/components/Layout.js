import React, { useState, useContext } from 'react'
import httpClient from "../httpClient";
import { UserContext } from '../contexts/UserContext'

function Layout() {
    const { users } = useContext(UserContext);
    const goHome = () => {
        window.location.href = "/";
    }
    const goMyProjects = () => {
        window.location.href = "/myprojects";
    }
    const goAddProject = () => {
        window.location.href = "/add";
    }
    const goAdmincontrol = () => {
        window.location.href = "/admin";
    }
    const logoutUser = async () => {
        await httpClient.post("//localhost:5000/logout");
        window.location.href = "/";
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">{users.name}{" "}{users.surname}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <button className='nonborder  ml-5' onClick={goHome}>Home</button>
                    </li>
                    <li className="nav-item active">
                        <button className='nonborder' onClick={goMyProjects}>My Projects</button>
                    </li>
                    <li className="nav-item active">
                        <button className='nonborder' onClick={goAddProject}>Add New Project</button>
                    </li>
                    {users.role == "admin" ?
                    <li className="nav-item active">
                        <button className='nonborder' onClick={goAdmincontrol}>Admin Control</button>
                    </li> : null}
                    
                </ul>
                <form className="d-flex">
                    <button type="button" className="btn btn-danger" onClick={logoutUser}>Logout</button>
                </form>
                </div>
            </div>
            </nav>
        </div>
    )
}

export default Layout