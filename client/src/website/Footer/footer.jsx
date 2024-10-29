import React from 'react';
import './footer.css'; // Ensure you have the CSS file
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light py-4">
            <div className="container">
                <div className="text-center mb-3">
                    <a href="/">
                        <img src="/Footer_logo.png" alt="Logo" className="img-fluid footer-logo" />
                    </a>
                </div>
                <div className="row text-center">
                    <div className="col-md-4 mb-4">
                        <h5 className='fs-5'>Quick Links</h5>
                        <div className="quick-links">
                            <a href="/">Home</a>
                            <a href="/privacy-policy">Privacy Policy</a>
                            <a href="/contact">Contact</a>
                            <a href="/about">About Us</a>
                            <a href="/terms">Terms of Service</a>
                            <a href="/terms">FAQ</a>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h5 className='fs-5'>Follow Us</h5>
                        <div className="follow-us">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i> Facebook</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i> Twitter</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i> Instagram</a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h5 className='fs-5'><i className="fa-solid fa-envelope"></i> Contact Us</h5>
                        <div className="follow-us">
                            <a href="tel:+91 9351130765" target="_blank" rel="noopener noreferrer">+91 9664244522</a>
                            <a href="tel:+91 9351130765" target="_blank" rel="noopener noreferrer">+91 8003398228</a>
                            <hr />
                            <a href="mailto:earningplanerinstuate@gmail.com" target="_blank" rel="noopener noreferrer">EarningPlanerInstuate@gmail.com</a>

                        </div>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p>&copy; {new Date().getFullYear()} <a href="/"> Earning Planer Ins.</a> All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
