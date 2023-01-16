import React, { useEffect, useState } from 'react'
import APIService from './APIService'
import ReactDom from 'react-dom'


function UpdateProjects(props) {
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

    if (!props.project) return null
    return ReactDom.createPortal(
        <div>
            <div className='mb-3'>
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-content2">
                            <div className="form-group">
                                <label htmlFor="title" className='form-label'>Title:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    placeholder='Please Enter Title'
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="body" className='form-label'>Project Description:</label>
                                <textarea
                                    rows='4'
                                    className="form-control"
                                    value={body}
                                    placeholder='Please Enter Project'
                                    onChange={(e) => setBody(e.target.value)}
                                />
                            </div>
                            <button onClick={updateProject} className='btn btn-success mt-3'>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}

export default UpdateProjects