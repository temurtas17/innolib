import React from 'react'
import { useState, useEffect } from 'react'
import Projects from './Projects';
import Form from './Form';

function Home() {
  const [projects, setProjects] = useState([])
  const [editedProject, setEditedProject] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    }).then(resp => resp.json())
    .then(resp => setProjects(resp))
    .catch(error => console.log(error))
  }, []);

  const editProject = (project) => {
    setEditedProject(project)
  }

  const updatedData = (project) => {
    const new_project = projects.map(my_project => {
      if(my_project.id === project.id){
        return project
      }else{
        return my_project
      }
    })
    setProjects(new_project)
  }

  const deleteProject = (project) => {
    const new_projects = projects.filter(my_project => {
      if(my_project.id === project.id){
        return false
      }
      return true
    })
    setProjects(new_projects)
  }

  const setNull = () => {
    setEditedProject(null)
  }

  return (
    <div className='App'>
      <h2 className="text-center">PROJECTS</h2>
      <br/>
      <Projects projects = {projects} editProject = {editProject} deleteProject = {deleteProject}/>
      {editedProject ? <Form project = {editedProject} updatedData = {updatedData} setNull = {setNull}/> : null}
    </div>
  )
}

export default Home
