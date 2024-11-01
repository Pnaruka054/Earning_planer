import { useEffect, useState } from "react";
import Courses from "../courses";
import "./paid_courses.css";
import Loading from "../../Loading/Loading";
import axios from "axios";

const PaidCourses = ({ home }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        let fetchData = async()=>{
            try {
                let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/courses/userCoursesGet/Paid`)
                setCourses(response.data.msg)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, []);
 
    // const courses = [
    //     {
    //         title: "MERN Stack Development",
    //         duration: "3 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "mern.jpg",
    //         modules: [
    //             {
    //                 id: 1,
    //                 title: 'Introduction to Web Development',
    //                 liveClasses: '1',
    //                 projects: '3',
    //                 assignments: '3',
    //                 content: [
    //                     'What is web development?',
    //                     'Static vs dynamic website',
    //                     'Who is front-end developer?',
    //                     'Who is backend developer?',
    //                     'Who is full-stack developer?',
    //                 ],
    //             },
    //         ],
    //     },
    //     {
    //         title: "Digital Marketing Masterclass",
    //         duration: "2 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "digital_marketing.jpg",
    //         modules: [
    //             {
    //                 id: 1,
    //                 title: 'Introduction to Web Development',
    //                 liveClasses: '1',
    //                 projects: '3',
    //                 assignments: '3',
    //                 content: [
    //                     'What is web development?',
    //                     'Static vs dynamic website',
    //                     'Who is front-end developer?',
    //                     'Who is backend developer?',
    //                     'Who is full-stack developer?',
    //                 ],
    //             },
    //         ],
    //     },

    //     {
    //         title: "Graphic Design Fundamentals",
    //         duration: "1.5 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "graphic_design.jpg",
    //         modules: [
    //             {
    //                 id: 1,
    //                 title: 'Introduction to Web Development',
    //                 liveClasses: '1',
    //                 projects: '3',
    //                 assignments: '3',
    //                 content: [
    //                     'What is web development?',
    //                     'Static vs dynamic website',
    //                     'Who is front-end developer?',
    //                     'Who is backend developer?',
    //                     'Who is full-stack developer?',
    //                 ],
    //             },
    //         ],
    //     },

    //     {
    //         title: "Basic Computer for Beginners",
    //         duration: "2 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "Basic computer.jpg",
    //         modules: [
    //             {
    //                 id: 1,
    //                 title: 'Introduction to Web Development',
    //                 liveClasses: '1',
    //                 projects: '3',
    //                 assignments: '3',
    //                 content: [
    //                     'What is web development?',
    //                     'Static vs dynamic website',
    //                     'Who is front-end developer?',
    //                     'Who is backend developer?',
    //                     'Who is full-stack developer?',
    //                 ],
    //             },
    //         ],
    //     },

    //     {
    //         title: "Advance Excel",
    //         duration: "4 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "advance excel.jpg",
    //         modules: [
    //             {
    //                 id: 1,
    //                 title: 'Introduction to Web Development',
    //                 liveClasses: '1',
    //                 projects: '3',
    //                 assignments: '3',
    //                 content: [
    //                     'What is web development?',
    //                     'Static vs dynamic website',
    //                     'Who is front-end developer?',
    //                     'Who is backend developer?',
    //                     'Who is full-stack developer?',
    //                 ],
    //             },
    //         ],
    //     },

    //     {
    //         title: "Accounting Executive",
    //         duration: "3 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "accounting executive.jpg",
    //         modules: [
    //             {
    //                 id: 1,
    //                 title: 'Introduction to Web Development',
    //                 liveClasses: '1',
    //                 projects: '3',
    //                 assignments: '3',
    //                 content: [
    //                     'What is web development?',
    //                     'Static vs dynamic website',
    //                     'Who is front-end developer?',
    //                     'Who is backend developer?',
    //                     'Who is full-stack developer?',
    //                     'Who is full-stack developer?',
    //                     'Who is full-stack developer?',
                       
    //                 ],
    //             },
    //         ],
    //     },

    // ];

    if (courses.length === 0) {
        return <Loading />
    }
    return (
        <div>
            <Courses courses={courses} heading="Paid Courses" home={home} />
        </div>
    );
}

export default PaidCourses;
