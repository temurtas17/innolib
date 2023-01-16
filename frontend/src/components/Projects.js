import React, { useState, useEffect } from 'react'
import APIService from './APIService';
import httpClient from "../httpClient";

function Projects(props) {
    var num = 0;
    const [rated, setRated] = useState("not given")
    const [id, setID] = useState(0)
    const editProject = (project) => {
        props.editProject(project)
    }

    const deleteProject = (project) => {
        APIService.DeleteProject(project.id)
        .then(() => props.deleteProject(project))
    }

    const handleRender = () => {
        setTimeout(() => {
            console.log("");
        }, 500);
    }

    const updateRate = async () => {
        try {
          const resp = await httpClient.put(`http://127.0.0.1:5000/updaterate/${id}/`, {
            rated,
          });
        } catch (error) {
          console.log(error)
        }
    };
    
    return (
        <>
            {props.users && !props.admin && props.projects && props.projects.map(project => {
            if(props.users.id == project.userid){
                {num+=1}
                return(
                    <tr key = {project.id}>
                        <th scope="row">{num}</th>
                        <th>{project.title}</th>
                        <td>{project.body}</td>
                        <td>{project.name}</td>
                        <td>{project.date.slice(8,10) + "/" + project.date.slice(5,7) + "/" + project.date.slice(0,4)}</td>
                        <td>{project.rated}</td>
                        <td>
                        <div className='col-md-1'>
                            <button className='btn btn-warning'
                            onClick = {() => editProject(project)}
                            >Update</button>
                        </div>
                        </td>
                        <td>
                        <div className='col-md-1'>
                            <button className='btn btn-danger'
                            onClick = {() => deleteProject(project)}
                            >Delete</button>
                        </div>
                        </td>
                    </tr>
                    )
                }else {return null}
            })}
            {!props.users && !props.admin && props.projects && props.projects.map(project => {
            {num+=1}
            return(
                <tr key = {project.id}>
                    <th scope="row">{num}</th>
                    <th>{project.title}</th>
                    <td>{project.body}</td>
                    <td>{project.name}</td>
                    <td>{project.date.slice(8,10) + "/" + project.date.slice(5,7) + "/" + project.date.slice(0,4)}</td>
                    <td>{project.rated}</td>
                    <td>
                    <div className='col-md-1'>
                        <button className='btn btn-warning'
                        onClick = {() => editProject(project)}
                        >Update</button>
                    </div>
                    </td>
                    <td>
                    <div className='col-md-1'>
                        <button className='btn btn-danger'
                        onClick = {() => deleteProject(project)}
                        >Delete</button>
                    </div>
                    </td>
                </tr>
            )
            })}
            {!props.users && props.admin && props.projects && props.projects.map(project => {
            {num+=1}
            return(
                <tr key = {project.id}>
                    <th scope="row">{num}</th>
                    <th>{project.title}</th>
                    <td>{project.body}</td>
                    <td>{project.name}</td>
                    <td>{project.date.slice(8,10) + "/" + project.date.slice(5,7) + "/" + project.date.slice(0,4)}</td>
                    <td>{project.rated}</td>
                    <td>
                        <div className="btn-group">
                            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Select
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" onClick={() => {setRated("5 points"); setID(project.id);}}>5</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => {setRated("4 points"); setID(project.id);}}>4</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => {setRated("3 points"); setID(project.id);}}>3</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => {setRated("2 points"); setID(project.id);}}>2</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => {setRated("1 points"); setID(project.id);}}>1</a></li>
                            </ul>
                        </div>
                    </td>
                    <td>
                    <div className='col-md-1'>
                        <button className='btn btn-success'
                        onClick = {() => updateRate(project)}
                        >Submit</button>
                    </div>
                    </td>
                </tr>
            )
            })}
        </>
  )
}

export default Projects