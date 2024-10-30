import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './courseModule.css'; // Custom CSS for additional styling
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../Nav Bar/nav_bar';

const CourseModule = () => {
    const location = useLocation();
    const course = location.state;
    const [modules, setModules] = useState([]);
    const [courseDetails, setCourseDetails] = useState([]);

    let navigate = useNavigate();
    useEffect(() => {
        if (!course) {
            navigate("/");
            return;
        }
        setModules(course.modules);
        setCourseDetails(course);
    }, [course, navigate]);

    const [activeModule, setActiveModule] = useState(null);
    const contentRefs = useRef([]);

    const toggleModule = (id) => {
        if (activeModule === id) {
            const contentHeight = contentRefs.current[id - 1].scrollHeight;
            contentRefs.current[id - 1].style.height = `${contentHeight}px`;
            setTimeout(() => {
                contentRefs.current[id - 1].style.height = '0px';
                setTimeout(() => setActiveModule(null), 400);
            }, 50);
        } else {
            setActiveModule(id);
        }
    };

    useEffect(() => {
        modules.forEach((module, index) => {
            if (activeModule === module.id) {
                contentRefs.current[index].style.height = `${contentRefs.current[index].scrollHeight}px`;
            } else {
                contentRefs.current[index].style.height = '0px';
            }
        });
    }, [activeModule, modules]);

    const renderContentColumns = (content) => {
        const chunkSize = 5; // Maximum items per column
        const columns = [];

        // Split content into chunks
        for (let i = 0; i < content.length; i += chunkSize) {
            columns.push(content.slice(i, i + chunkSize));
        }

        return (
            <div className="d-flex flex-wrap mt-3">
                {columns.map((column, colIndex) => (
                    <ul key={colIndex} className="mx-3 m-0">
                        {column.map((item, index) => (
                            <li key={index} className="mb-2">
                                {item}
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        );
    };

    return (
        <div>
            {/* Nav Section */}
            <div>
                <NavBar />
            </div>
            <div className="container mt-5">
                <h2 className="text-center mb-4">{courseDetails.title} Course Syllabus</h2>
                <div id='course_module_top_details' style={{ background: `url('${courseDetails.gifImage}') no-repeat right center`, backgroundSize: "contain" }} className="p-4 rounded mb-4">
                    <p><strong>Duration:</strong> {courseDetails.duration}</p>
                    <p><strong>Mode:</strong> {courseDetails.mode}</p>
                    <p><strong>Live Sessions:</strong> {courseDetails.liveSessions}</p>
                    <p><strong>Projects:</strong> {courseDetails.projects}</p>
                </div>
                <div className="accordion" id="moduleAccordion">
                    {modules.map((module, index) => {
                        const isActive = activeModule === module.id;
                        return (
                            <div className="rounded-24 mb-3 accordion-item" key={module.id}>
                                <span className="rounded-24 accordion-header">
                                    <button
                                        type="button"
                                        aria-expanded={isActive}
                                        className={`accordion-button z-0 ${isActive ? '' : 'collapsed'}`}
                                        onClick={() => toggleModule(module.id)}
                                    >
                                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                                            <p className="mb-1 fs-5">
                                                <span className="d-lg-none d-inline-block">{module.id}.</span>
                                                {module.title}
                                            </p>
                                            <ul id='courseModule_ul' className="d-flex align-items-center m-0 list-unstyled flex-wrap">
                                                <li className="d-flex align-items-center my-1 ">
                                                    <div className="text-center d-flex align-items-center justify-content-center">
                                                        {module.liveClasses}
                                                    </div>
                                                    Live Classes
                                                </li>
                                                {module.assignments && (
                                                    <li className="d-flex align-items-center my-1 ">
                                                        <div className="text-center d-flex align-items-center justify-content-center">
                                                            {module.assignments}
                                                        </div>
                                                        Assignments
                                                    </li>
                                                )}
                                                {module.projects && (
                                                    <li className="d-flex align-items-center my-1 ">
                                                        <div className="text-center d-flex align-items-center justify-content-center">
                                                            {module.projects}
                                                        </div>
                                                        Projects
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </button>
                                </span>
                                <div
                                    className={`accordion-collapse collapse ${isActive ? 'show' : ''}`}
                                    ref={el => contentRefs.current[index] = el}
                                    style={{
                                        height: '0px',
                                        overflow: 'hidden',
                                        transition: 'height 0.4s ease',
                                    }}
                                >
                                    {renderContentColumns(module.content)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CourseModule;
