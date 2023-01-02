import React, { useState } from 'react'
import Home from "./Home";
import AddProjects from './AddProjects';

function Layout(props) {
    const [toggle, setToggle] = useState(true)

    const changeTrue = () => {
        setToggle(true)
    }
    const changeFalse = () => {
        setToggle(false)
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">{props.user.name}{" "}{props.user.surname}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <button className='nonborder  ml-5' onClick={changeTrue}>Home</button>
                    </li>
                    <li className="nav-item active">
                        <button className='nonborder' onClick={changeFalse}>Add New Project</button>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link active" href="/admin">Admin Control Page</a>
                    </li>
                </ul>
                <form className="d-flex">
                    <button type="button" className="btn btn-danger" onClick={props.logoutUser}>Logout</button>
                </form>
                </div>
            </div>
            </nav>
            {
                toggle ? <Home/> : <AddProjects id={props.user.id} name={props.user.name}/>
            }
        </div>
    )
}

export default Layout