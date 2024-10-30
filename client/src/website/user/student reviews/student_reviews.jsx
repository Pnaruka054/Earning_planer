import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './student_reviews.css';
import { Modal } from 'react-bootstrap'; // Import Modal from Bootstrap
import axios from 'axios';
import Loading from '../Loading/Loading';

// const reviews = [
//     {
//         name: 'Raju',
//         image: 'https://res.cloudinary.com/dm8miilli/image/upload/v1719146354/mwi4mlmbmiia9rmjcj5z.jpg',
//         video: 'https://res.cloudinary.com/dm8miilli/video/upload/v1730216473/15465878-hd_1080_1920_30fps_pvkg3i.mp4',
//         comment: 'This program exceeded my expectations! The structured content made complex concepts easier to grasp. The instructors were knowledgeable and approachable, always ready to help. I particularly appreciated the interactive components, which made learning enjoyable and practical. I feel much more confident in my skills now. Highly recommended for anyone looking to enhance their knowledge!',
//         rating: 5,
//         course: 'Advanced Skills Development'
//     },
//     {
//         name: 'Student B',
//         image: 'https://res.cloudinary.com/dm8miilli/image/upload/v1719146354/mwi4mlmbmiia9rmjcj5z.jpg',
//         video: 'https://res.cloudinary.com/dm8miilli/video/upload/v1730216473/15465878-hd_1080_1920_30fps_pvkg3i.mp4',
//         comment: 'My experience in this program was enriching! I gained practical skills and a deeper understanding of the subject. The instructors were patient and effective in breaking down complex topics. Collaborating with fellow students was a highlight, creating a supportive learning environment. I would recommend this program to anyone eager to learn and grow!',
//         rating: 4,
//         course: 'Fundamentals of Learning'
//     },
//     {
//         name: 'Student C',
//         image: 'https://res.cloudinary.com/dm8miilli/image/upload/v1719146354/mwi4mlmbmiia9rmjcj5z.jpg',
//         video: 'https://res.cloudinary.com/dm8miilli/video/upload/v1730216473/15465878-hd_1080_1920_30fps_pvkg3i.mp4',
//         comment: 'I highly recommend this program! It skillfully blends theory with practical application. The instructors were passionate and engaging, making each class enjoyable. Guest speakers provided real-world insights that enriched our learning. The projects challenged my critical thinking, and I gained invaluable skills for my career. A truly rewarding experience!',
//         rating: 5,
//         course: 'Creative Problem Solving'
//     },
//     {
//         name: 'Student D',
//         image: 'https://res.cloudinary.com/dm8miilli/image/upload/v1719146354/mwi4mlmbmiia9rmjcj5z.jpg',
//         video: 'https://res.cloudinary.com/dm8miilli/video/upload/v1730216473/15465878-hd_1080_1920_30fps_pvkg3i.mp4',
//         comment: 'This program transformed my approach to learning. The organization and quality of materials were impressive. Instructors made complex topics accessible, fostering a collaborative atmosphere. Practical assignments allowed me to apply theories effectively. I left motivated and equipped with new skills. If you’re considering this program, I urge you to enroll!',
//         rating: 5,
//         course: 'Professional Development Mastery'
//     },
// ];

const StudentReviews = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentVideo, setCurrentVideo] = useState('');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        let fetchData = async()=>{
            try {
                let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/reviews/studentReviewsGet`)
                setReviews(response.data.msg)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, []);

    const nextReview = () => {
        if (!isAutoScrollActive) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + 1;
            if (newIndex === reviews.length + 1) {
                setTimeout(() => {
                    setCurrentIndex(1);
                    setIsTransitioning(false);
                }, 300);
                return newIndex;
            }
            return newIndex;
        });
    };

    const prevReview = () => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex - 1;
            if (newIndex === 0) {
                setTimeout(() => {
                    setCurrentIndex(reviews.length);
                    setIsTransitioning(false);
                }, 300);
                return newIndex;
            }
            return newIndex;
        });
        resetAutoScroll();
    };

    const resetAutoScroll = () => {
        setIsAutoScrollActive(false);
        setTimeout(() => {
            setIsAutoScrollActive(true);
        }, 5000); // Resume auto-scroll after 5 seconds
    };

    useEffect(() => {
        const interval = isAutoScrollActive ? setInterval(nextReview, 5000) : null;
        return () => clearInterval(interval);
    }, [isAutoScrollActive]);

    const handleVideoPlay = (videoSrc) => {
        setCurrentVideo(videoSrc);
        setShowModal(true);
        setIsAutoScrollActive(false);
    };

    const handleVideoClose = () => {
        setShowModal(false);
        setCurrentVideo('');
        setTimeout(() => {
            setIsAutoScrollActive(true);
        }, 3000);
    };

    if (reviews.length === 0) {
        return <Loading />
    }

    return (
        <div data-aos="zoom-in-down" id='student_reviews' className="student-reviews-container container mt-2 shadow-sm card">
            <div className="d-flex justify-content-between align-items-center">
                <button className="btn-circle" onClick={() => { prevReview(); resetAutoScroll(); }}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <div className="review-slider">
                    <div
                        className={`review-box ${isTransitioning ? '' : 'no-transition'}`}
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {/* Last review clone at the start */}
                        <div className="slide">
                            <div className="row align-items-center flex-column-reverse flex-md-row">
                                <div className="col-md-9 order-1 order-md-0 text-center">
                                    <img src={reviews[reviews.length - 1].image} alt={reviews[reviews.length - 1].name} className="img-fluid rounded-circle mb-3" />
                                    <h4>{reviews[reviews.length - 1].name}</h4>
                                    <h5>{reviews[reviews.length - 1].course}</h5>
                                    <div className="mb-2">
                                        {'⭐'.repeat(reviews[reviews.length - 1].rating)}
                                        {'☆'.repeat(5 - reviews[reviews.length - 1].rating)}
                                    </div>
                                    <p>{reviews[reviews.length - 1].comment}</p>
                                </div>
                                <div className="col-md-3 order-0 order-md-1">
                                    {/* Show video or play button based on screen size */}
                                    <div className="d-none d-md-block">
                                        <video width="100%" height="auto" controls onPlay={() => setIsAutoScrollActive(false)} onPause={() => setIsAutoScrollActive(true)}>
                                            <source src={reviews[reviews.length - 1].video} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <div className="d-md-none">
                                        <button className="btn btn-primary" onClick={() => handleVideoPlay(reviews[reviews.length - 1].video)}>
                                            Play Video
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Main reviews */}
                        {reviews.map(({ name, image, video, comment, rating, course }, index) => (
                            <div className="slide" key={index}>
                                <div className="row align-items-center flex-column-reverse flex-md-row">
                                    <div className="col-md-9 order-1 order-md-0 text-center">
                                        <img src={image} alt={name} className="img-fluid rounded-circle mb-3" />
                                        <h4>{name}</h4>
                                        <h5>{course}</h5>
                                        <div className="mb-2">
                                            {'⭐'.repeat(rating)}
                                            {'☆'.repeat(5 - rating)}
                                        </div>
                                        <p>{comment}</p>
                                    </div>
                                    <div className="col-md-3 order-0 order-md-1">
                                        <div className="d-none d-md-block">
                                            <video width="100%" height="auto" controls onPlay={() => setIsAutoScrollActive(false)} onPause={() => setIsAutoScrollActive(true)}>
                                                <source src={video} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                        <div className="d-md-none d-flex justify-content-center">
                                            <button className="btn btn-primary" onClick={() => handleVideoPlay(video)}>
                                                Play Video
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* First review clone at the end */}
                        <div className="slide">
                            <div className="row align-items-center flex-column-reverse flex-md-row">
                                <div className="col-md-9 order-1 order-md-0 text-center">
                                    <img src={reviews[0].image} alt={reviews[0].name} className="img-fluid rounded-circle mb-3" />
                                    <h4>{reviews[0].name}</h4>
                                    <h5>{reviews[0].course}</h5>
                                    <div className="mb-2">
                                        {'⭐'.repeat(reviews[0].rating)}
                                        {'☆'.repeat(5 - reviews[0].rating)}
                                    </div>
                                    <p>{reviews[0].comment}</p>
                                </div>
                                <div className="col-md-3 order-0 order-md-1">
                                    <div className="d-none d-md-block">
                                        <video width="100%" height="auto" controls onPlay={() => setIsAutoScrollActive(false)} onPause={() => setIsAutoScrollActive(true)}>
                                            <source src={reviews[0].video} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <div className="d-md-none">
                                        <button className="btn btn-primary" onClick={() => handleVideoPlay(reviews[0].video)}>
                                            Play Video
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn-circle" onClick={() => { nextReview(); resetAutoScroll(); }}>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            {/* Video Modal */}
            <Modal show={showModal} onHide={handleVideoClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Video Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <video width="100%" height="auto" controls autoPlay>
                        <source src={currentVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default StudentReviews;
