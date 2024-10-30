// src/YtPlaylist.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import "./YT_playlist.css";
import Loading from '../Loading/Loading';
import NavBar from '../Nav Bar/nav_bar';

const YtPlaylist = () => {
    const location = useLocation();
    const course = location.state;
    const query = new URLSearchParams(location.search);
    const playlistId = query.get('list');
    const playlistTitle = query.get('title');
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [playingVideoId, setPlayingVideoId] = useState(null); // Track the currently playing video
    const videosPerPage = 9; // Set videos per page to 9
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY; // Accessing API key

    useEffect(() => {
        const fetchPlaylistVideos = async () => {
            if (!playlistId) return; // Check if playlistId is available

            try {
                const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
                    params: {
                        part: 'snippet',
                        maxResults: 50,
                        playlistId: playlistId,
                        key: apiKey,
                    },
                });
                setVideos(response.data.items);
            } catch (error) {
                console.error('Error fetching playlist videos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylistVideos();
    }, [playlistId, apiKey]);

    if (loading) {
        return <Loading />;
    }

    const totalPages = Math.ceil(videos.length / videosPerPage);
    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleVideoPlay = (videoId) => {
        // Set the new video as currently playing
        setPlayingVideoId(videoId);
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const pageNumbers = [];
        const maxPageNumbers = 5;
        let startPage, endPage;

        if (totalPages <= maxPageNumbers) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = maxPageNumbers;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - (maxPageNumbers - 1);
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button onClick={() => paginate(currentPage - 1)} className="page-link">&laquo;</button>
                    </li>
                    {startPage > 1 && (
                        <>
                            <li className="page-item">
                                <button onClick={() => paginate(1)} className="page-link">1</button>
                            </li>
                            {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                        </>
                    )}
                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                            <button onClick={() => paginate(number)} className="page-link">{number}</button>
                        </li>
                    ))}
                    {endPage < totalPages && (
                        <>
                            {endPage < totalPages - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                            <li className="page-item">
                                <button onClick={() => paginate(totalPages)} className="page-link">{totalPages}</button>
                            </li>
                        </>
                    )}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button onClick={() => paginate(currentPage + 1)} className="page-link">&raquo;</button>
                    </li>
                </ul>
            </nav>
        );
    };

    return (
        <div>
            {/* Nav Section */}
            <div>
                <NavBar />
            </div>
            <div className="container yt-playlist mt-5">
                <h2 className="text-center mb-4">{playlistTitle}</h2>
                <div className="row">
                    {currentVideos.map((video) => (
                        <div key={video.id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="video-wrapper">
                                    <ReactPlayer
                                        url={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                                        playing={playingVideoId === video.snippet.resourceId.videoId} // Control playback
                                        controls={true}
                                        width="100%"
                                        height="100%"
                                        className="react-player"
                                        key={playingVideoId} // Change key to reset player
                                        onPlay={() => handleVideoPlay(video.snippet.resourceId.videoId)} // Handle video play
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {renderPagination()}
            </div>
        </div>
    );
};

export default YtPlaylist;
