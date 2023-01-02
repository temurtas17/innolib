import React, { useEffect, useState } from 'react'
import APIService from './APIService'

function Form(props) {
    const[title, setTitle] = useState('')
    const[body, setBody] = useState('')

    useEffect(() => {
        setTitle(props.project.title)
        setBody(props.project.body)
    },[props.project])

    const updateProject = () => {
        APIService.UpdateProject(props.project.id, {title, body})
        .then(resp => props.updatedData(resp))
        .then(props.setNull())
        .catch(error => console.log(error))
    }

    return (
        <div>
            {props.project ? (
                <div className='mb-3'>
                    <label htmlFor='title' className='form-label'>Title:</label>
                    <input type='text' className='form-control' value={title}
                    placeholder='Please Enter Title' onChange={(e) => setTitle(e.target.value)}/>

                    <label htmlFor='body' className='form-label'>Project Description:</label>
                    <textarea rows='4' className='form-control' value={body}
                    placeholder='Please Enter Project' onChange={(e) => setBody(e.target.value)}/>
                    
                    <button onClick={updateProject} className='btn btn-success mt-3'>Update</button>
                </div>
                ):null        
            }
        </div>
    )
}

export default Form