import React, { useEffect } from 'react';
import Home from './website/Home/home';
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import FreeCourses from './website/Courses/Free Courses/free_courses';
import PaidCourses from './website/Courses/Paid Courses/paid_courses';
import Footer from './website/Footer/footer';
import CourseModule from './website/Course Module/courseModule';
import AOS from 'aos';
import 'aos/dist/aos.css';
import YtPlaylist from './website/YT playlist/YT_playlist';
import Page_Not_Found from './website/Error page/page_Not_Found';
import SearchCourse from './website/Search Course/search_course';

const App = () => {

  useEffect(() => { 
    AOS.init({
      offset: 0,
      duration: 500,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/free-courses/info" element={<YtPlaylist />} />
          <Route path='/course/info/:id' element={<CourseModule />} />
          <Route path='/free-courses' element={<FreeCourses />} />
          <Route path='/paid-courses' element={<PaidCourses />} />
          <Route path='/search' element={<SearchCourse />} />
          <Route path="/*" element={<Page_Not_Found />} /> 
        </Routes>
        <div>
          <a href="https://wa.link/mzvlws">
            <img style={{ position: "fixed", right: 0, bottom: "10px", width: "70px" }} src="WhatsAppLogo.webp" alt="" />
          </a>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;