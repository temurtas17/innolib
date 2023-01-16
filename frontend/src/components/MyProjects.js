import React from 'react'
import httpClient from "../httpClient";
import { useState, useEffect, useContext } from 'react'
import Projects from './Projects';
import UpdateProjects from './UpdateProjects';
import Layout from './Layout';
import { UserContext } from '../contexts/UserContext'

function MyProjects() {
  const { users, updateUser } = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [editedProject, setEditedProject] = useState(null);
  const isAdmin = false;

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
    <>
    {users != null ? (
    <div className='App'>
      <Layout/>
      <h2 className="text-center">MY PROJECTS</h2>
      <br/>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">UserName</th>
            <th scope="col">Date</th>
            <th scope="col">Rating</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <Projects projects = {projects} users={users} admin={isAdmin} editProject = {editProject} deleteProject = {deleteProject} />
        </tbody>
      </table>
      {editedProject ? <UpdateProjects project = {editedProject} updatedData = {updatedData} setNull = {setNull}/> : null}
    </div>):(null)}</>
  )
}

export default MyProjects
