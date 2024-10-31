import './AdminPage.css'
import { useEffect, useRef, useState } from 'react'
import AddCourses from './MainContentPages/Courses Section/Add Courses/addCourses'
import HeroSection from './MainContentPages/Hero Section/hero_section'
import AddReviews from './MainContentPages/Student Reviews/Add Reviews/addReviews'

function AdminPage() {

    let [target, setTarget] = useState('')
    const mediaQuery = window.matchMedia('(max-width: 283px)');

    function sideBarFunction(event) {
        if (event.currentTarget.innerText === 'Courses') {
            refFirst.current.classList.add('sideBarButtonClicked')
            refSecond.current.classList.remove('sideBarButtonClicked')
            refThird.current.classList.remove('sideBarButtonClicked')
            setAdminside(refFirst)
            if (mediaQuery.matches) {
                target.style.display = 'none'
            }
        } else if (event.currentTarget.innerText === 'Hero Section') {
            refSecond.current.classList.add('sideBarButtonClicked')
            refFirst.current.classList.remove('sideBarButtonClicked')
            refThird.current.classList.remove('sideBarButtonClicked')
            setAdminside(refSecond)
            if (mediaQuery.matches) {
                target.style.display = 'none'
            }
        } else if (event.currentTarget.innerText === 'Student Reviews') {
            refThird.current.classList.add('sideBarButtonClicked')
            refFirst.current.classList.remove('sideBarButtonClicked')
            refSecond.current.classList.remove('sideBarButtonClicked')
            setAdminside(refThird)
            if (mediaQuery.matches) {
                target.style.display = 'none'
            }
        }
    }

    let refFirst = useRef(null)
    let refSecond = useRef(null)
    let refThird = useRef(null)

    useEffect(() => {
        if (window.location.pathname === '/admin') {
            refFirst.current.classList.add('sideBarButtonClicked')
        }
    }, [])

    let [Adminside, setAdminside] = useState(refFirst)

    let AdminPageMenuShow = () => {
        let target = document.getElementById('AdminPageMenuContent')
        target.style.display = 'block'
        setTarget(target)
    }

    return (
        <div className='AdminPageDiv'>
            <div className='sideBarDiv'>
                <div onClick={AdminPageMenuShow} className='AdminPageMenuIcon'>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div id='AdminPageMenuContent' className='sideBarDivFixed'>
                    <div id='sideBarFirst' className='addProjects' onClick={sideBarFunction} ref={refFirst} >
                        Courses
                    </div>
                    <div id='sideBarSecond' className='addProjects' onClick={sideBarFunction} ref={refSecond} >
                        Hero Section
                    </div>
                    <div id='sideBarThird' className='addProjects' onClick={sideBarFunction} ref={refThird}>
                        Student Reviews
                    </div>
                </div>
            </div>
            <div className='adMainContent'> 
                {Adminside === refFirst && <AddCourses />}
                {Adminside === refSecond && <HeroSection />}
                {Adminside === refThird && <AddReviews />}
            </div>
        </div>
    )
}

export default AdminPage