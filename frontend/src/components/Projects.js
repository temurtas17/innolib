import React, { useState, useEffect } from 'react'
import APIService from './APIService';

function Projects(props) {
    const editProject = (project) => {
        props.editProject(project)
    }

    const deleteProject = (project) => {
        APIService.DeleteProject(project.id)
        .then(() => props.deleteProject(project))
    }
    
    return (
        <div>
            {props.projects && props.projects.map(project => {
            return(
            <div key = {project.id}>
                <h4>{project.title+"("+project.name+")"}</h4>
                <p>{project.body}</p>
                <p>{project.date.slice(8,10) + "/" + project.date.slice(5,7) + "/" + project.date.slice(0,4) + "-" + project.date.slice(11)}</p>

                <div className='row'>
                    <div className='col-md-1'>
                        <button className='btn btn-warning'
                        onClick = {() => editProject(project)}
                        >Update</button>
                    </div>
                    <div className='col-md-1'>
                        <button className='btn btn-danger'
                        onClick = {() => deleteProject(project)}
                        >Delete</button>
                    </div>
                </div>
                <hr/>
            </div>
            )
            })}
        </div>
  )
}

export default Projects