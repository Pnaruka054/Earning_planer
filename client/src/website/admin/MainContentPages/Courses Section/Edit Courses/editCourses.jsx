import './editCourses.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function EditCourses() {
    const { index } = useParams();
    const location = useLocation();
    const courseData = location.state?.course || {};

    const [title, setTitle] = useState(courseData.title || '');
    const [duration, setDuration] = useState(courseData.duration || '');
    const [mode, setMode] = useState(courseData.mode || '');
    const [liveSessions, setLiveSessions] = useState(courseData.liveSessions || '');
    const [projects, setProjects] = useState(courseData.projects || '');
    const [modules, setModules] = useState(courseData.modules || []);
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');

    const navigate = useNavigate();

    const handleInputChange = (setter) => (event) => setter(event.target.value);
    const handleModuleChange = (index, field) => (event) => {
        const updatedModules = [...modules];
        updatedModules[index][field] = event.target.value;
        setModules(updatedModules);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const input = event.target; // Reference to the input element

        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                if (img.width !== 1280 || img.height !== 720) {
                    setImageError('Image must be 1280 x 720 pixels.');
                    setImage(null);
                    input.value = ''; // Clear the input
                } else {
                    setImageError('');
                    setImage(file);
                }
            };
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            title,
            duration,
            mode,
            liveSessions,
            projects,
            modules: modules.length ? modules : undefined,
        };

        if (image) {
            const imageData = new FormData();
            imageData.append('image', image);
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/upload`, imageData); // Adjust this endpoint as needed
        }

        try {
            await axios.patch(`${import.meta.env.VITE_SERVER_URL}/patchEditCourse/${courseData._id}`, formData);
            navigate('/admin');
        } catch (error) {
            console.error(error);
            alert('Error updating course.');
        }
    };

    const handleExitButtonClick = () => {
        navigate('/admin');
    };

    return (
        <div style={{ background: "#dadada", height: "100vh" }}>
            <div className='container'>
                <button className='btn btn-secondary my-3' onClick={handleExitButtonClick}>
                    <i className="fa-solid fa-left-to-bracket"></i> Exit
                </button>
                <div className='card mb-5'>
                    <div className='card-body'>
                        <h5 className='card-title'>Edit Course Information</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className='form-label'>Course Title</label>
                                <input type='text' className='form-control' value={title} onChange={handleInputChange(setTitle)} required />
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Duration</label>
                                <input type='text' className='form-control' value={duration} onChange={handleInputChange(setDuration)} required />
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Mode</label>
                                <input type='text' className='form-control' value={mode} onChange={handleInputChange(setMode)} required />
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Live Sessions</label>
                                <input type='text' className='form-control' value={liveSessions} onChange={handleInputChange(setLiveSessions)} required />
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Projects</label>
                                <input type='text' className='form-control' value={projects} onChange={handleInputChange(setProjects)} required />
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Upload Image (1280 x 720)</label>
                                <input type='file' className='form-control' accept="image/*" onChange={handleImageChange} />
                                {imageError && <div className="text-danger mt-2">{imageError}</div>}
                            </div>

                            {modules.length > 0 && (
                                <div>
                                    <h5 className='mt-4'>Modules</h5>
                                    {modules.map((module, index) => (
                                        <div key={index} className='mb-3 border p-3 rounded'>
                                            <h6>Module {index + 1}</h6>
                                            <div className="mb-2">
                                                <label className='form-label'>Module Title</label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={module.title}
                                                    onChange={handleModuleChange(index, 'title')}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className='form-label'>Live Classes</label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={module.liveClasses}
                                                    onChange={handleModuleChange(index, 'liveClasses')}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className='form-label'>Projects</label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={module.projects}
                                                    onChange={handleModuleChange(index, 'projects')}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className='form-label'>Content (comma separated)</label>
                                                <textarea
                                                    className='form-control'
                                                    value={module.content.join(', ')}
                                                    onChange={(e) => {
                                                        const updatedModules = [...modules];
                                                        updatedModules[index].content = e.target.value.split(', ');
                                                        setModules(updatedModules);
                                                    }}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button type='submit' className='btn btn-primary w-100'>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditCourses;
