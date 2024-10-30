import { useEffect, useState } from "react";
import Courses from "../courses";
import "./free_courses.css";
import axios from "axios";
import Loading from "../../Loading/Loading";

const FreeCourses = ({ home }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        let fetchData = async()=>{
            try {
                let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/courses/userCoursesGet/Free`)
                setCourses(response.data.msg)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, []);

    // const courses = [
    //     {
    //         title: "Telegram Account",
    //         duration: "3 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "mern.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Telegram Rose Bot",
    //         duration: "2 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "digital_marketing.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Telegram Group Help Bot",
    //         duration: "1.5 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "graphic_design.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Telegram Monetization",
    //         duration: "4 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "advance excel.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Telegram Channel",
    //         duration: "4 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "advance excel.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Telegram Group",
    //         duration: "4 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "advance excel.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Telegram Channel Help Bot",
    //         duration: "4 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "advance excel.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Telegram Bots Creating",
    //         duration: "4 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "advance excel.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Telegram Protectron Bot",
    //         duration: "4 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "advance excel.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Telegram Group Booster Bot",
    //         duration: "4 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "advance excel.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Telegram Members Adding Tricks",
    //         duration: "4 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "advance excel.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Facebook Account",
    //         duration: "2 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "Basic computer.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Facebook Group",
    //         duration: "4 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "advance excel.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Facebook Page",
    //         duration: "4 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "advance excel.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "HTML Complete Course",
    //         duration: "4 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "advance excel.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Instagram App",
    //         duration: "4 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "advance excel.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Computers Knowledge",
    //         duration: "4 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "advance excel.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Computers Problems Solution",
    //         duration: "3 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "accounting executive.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "KineMaster Mobile Video Editing",
    //         duration: "3 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "accounting executive.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "WhatsApp App",
    //         duration: "3 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "accounting executive.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Twitter App",
    //         duration: "3 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "accounting executive.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "Online Scam Alert",
    //         duration: "3 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "accounting executive.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    //     {
    //         title: "YouTube",
    //         duration: "3 months",
    //         mode: 'Online',
    //         liveSessions: '100+ hrs',
    //         projects: '15+',
    //         image: "accounting executive.jpg",
    //         playlist_id:"PLXDJaKn-JoE9z26cjYLORXbaxJy6y9Fdh",
    //     },
    // ];

    if (courses.length === 0) {
        return <Loading />
    }
    return (
        <div>
            <Courses courses={courses} heading="Free Courses" home={home} />
        </div>
    );
}

export default FreeCourses;
