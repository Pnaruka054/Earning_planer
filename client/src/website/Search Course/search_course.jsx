import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './search_course.css';
import Courses from "../Courses/courses";
import Loading from '../Loading/Loading'; // Assume you have a Loading component

const SearchCourse = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query');

        if (!query) {
            navigate('/'); // Redirect to home if no query
            return;
        }

        const fetchCourses = async () => {
            setLoading(true); // Start loading before fetching data
            setNotFound(false); // Reset notFound state

            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/courses/userCourseSearch?search=${encodeURIComponent(query)}`);
                console.log(response);
                if (response.data && response.data.length > 0) {
                    setCourses(response.data); // Set courses if found
                } else {
                    setNotFound(true); // Set notFound if no courses found
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
                setNotFound(true); // Set notFound if there's an error
            } finally {
                setLoading(false); // Stop loading after request is done
            }
        };

        fetchCourses();
    }, [location.search, navigate]); // Fetch on query change

    if (loading) {
        return <Loading />; // Show loading indicator while fetching data
    }

    if (notFound) {
        return <div>Not Found</div>; // Show "Not Found" if no courses are available
    }

    return (
        <div>
            <Courses database={true} courses={courses} heading="Search Courses" />
        </div>
    );
};

export default SearchCourse;
