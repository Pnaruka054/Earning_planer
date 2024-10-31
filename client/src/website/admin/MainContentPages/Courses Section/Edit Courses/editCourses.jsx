import './editCourses.css';
import React, { useState, useEffect } from 'react';
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
    const [gifImage, setGifImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [gifError, setGifError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Redirect to /admin if courseData is empty
    useEffect(() => {
        if (!courseData._id) {
            navigate('/admin');
        }
    }, [courseData, navigate]);

    const handleInputChange = (setter) => (event) => setter(event.target.value);
    const handleModuleChange = (index, field) => (event) => {
        const updatedModules = [...modules];
        updatedModules[index][field] = event.target.value;
        setModules(updatedModules);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const input = event.target;

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

    const handleGifChange = (event) => {
        const file = event.target.files[0];
        const input = event.target;

        if (file && file.type === 'image/gif') {
            setGifError('');
            setGifImage(file);
        } else {
            setGifError('Please upload a valid GIF image.');
            setGifImage(null);
            input.value = ''; // Clear the input
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const confirmUpdate = window.confirm('Are you sure you want to update this course?');
        if (!confirmUpdate) return;

        setLoading(true); // Set loading to true

        const formData = {
            title,
            duration,
            mode,
            liveSessions,
            projects,
            modules: modules.length ? modules : undefined,
        };

        try {
            if (image) {
                const imageData = new FormData();
                imageData.append('image', image);
                await axios.patch(`${import.meta.env.VITE_SERVER_URL}/courses/userCourseImagesEditUploder/?imageurl=${courseData.image}`, imageData);
            }

            if (gifImage) {
                const gifData = new FormData();
                gifData.append('gifImage', gifImage);
                await axios.patch(`${import.meta.env.VITE_SERVER_URL}/courses/userCourseImagesEditUploder/?imageurl=${courseData.gifImage}`, gifData);
            }

            await axios.patch(`${import.meta.env.VITE_SERVER_URL}/courses/userCourseEditPatch/${courseData._id}`, formData);
            alert('Data successfully updated!'); // Show success message
            navigate('/admin');
        } catch (error) {
            console.error(error);
            alert('Error updating course.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleExitButtonClick = () => {
        navigate('/admin');
    };

    const addModule = () => {
        setModules([...modules, { title: '', liveClasses: '', projects: '', content: [] }]);
    };

    const deleteModule = (index) => {
        const updatedModules = modules.filter((_, i) => i !== index);
        setModules(updatedModules);
    };

    const addContentToModule = (index) => {
        const updatedModules = [...modules];
        updatedModules[index].content.push(''); // Add an empty string to represent a new content field
        setModules(updatedModules);
    };

    const handleContentChange = (moduleIndex, contentIndex) => (event) => {
        const updatedModules = [...modules];
        updatedModules[moduleIndex].content[contentIndex] = event.target.value;
        setModules(updatedModules);
    };

    const deleteContentField = (moduleIndex, contentIndex) => {
        const updatedModules = [...modules];
        updatedModules[moduleIndex].content.splice(contentIndex, 1); // Remove the specified content field
        setModules(updatedModules);
    };

    const hasModuleName = modules.some(module => module.title); // Check if any module has a title

    return (
        <div style={{ background: "#dadada", height:"100%", paddingBottom:"20px" }}>
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

                            {hasModuleName && (
                                <div className="mb-3">
                                    <label className='form-label'>Upload GIF Image</label>
                                    <input type='file' className='form-control' accept="image/gif" onChange={handleGifChange} />
                                    {gifError && <div className="text-danger mt-2">{gifError}</div>}
                                </div>
                            )}

                            {modules.length > 0 && (
                                <div>
                                    <h5 className='mt-4'>Modules</h5>
                                    {modules.map((module, moduleIndex) => (
                                        <div key={moduleIndex} className='mb-3 border p-3 rounded'>
                                            <h6>Module {moduleIndex + 1}</h6>
                                            <div className="mb-2">
                                                <label className='form-label'>Module Title</label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={module.title}
                                                    onChange={handleModuleChange(moduleIndex, 'title')}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className='form-label'>Live Classes</label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={module.liveClasses}
                                                    onChange={handleModuleChange(moduleIndex, 'liveClasses')}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className='form-label'>Projects</label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    value={module.projects}
                                                    onChange={handleModuleChange(moduleIndex, 'projects')}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className='form-label'>Content:</label>
                                                {module.content.map((content, contentIndex) => (
                                                    <div key={contentIndex} className="d-flex mb-2">
                                                        <input
                                                            type='text'
                                                            className='form-control me-2'
                                                            value={content}
                                                            onChange={handleContentChange(moduleIndex, contentIndex)}
                                                            placeholder="Add content here..."
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            onClick={() => deleteContentField(moduleIndex, contentIndex)}
                                                        >
                                                            <i className="fa-regular fa-trash-can"></i>
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary mt-2"
                                                    onClick={() => addContentToModule(moduleIndex)}
                                                >
                                                    <i className="fa-solid fa-plus"></i> Add Content
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-danger mt-2"
                                                onClick={() => deleteModule(moduleIndex)}
                                            >
                                                <i className="fa-regular fa-trash-can"></i> Delete Module
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button type="button" className='btn btn-success w-100 mb-3' onClick={addModule}>
                                Add Module
                            </button>

                            <button type='submit' className='btn btn-primary w-100' disabled={loading}>
                                {loading ? 'Updating...' : 'Update'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditCourses;
