// VideoPage.js

import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchVideos, fetchVideo } from '../videoApi';
import { useAuth } from '../AuthContext';
import { getRecommendations } from '../recommendAPI';
import './VideoPage.css';

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const { user } = useAuth();
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const containerRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVideos();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (user && user.userId) {
          const recommendedVideoIds = await getRecommendations(user.userId);
          const recommendedVideos = await Promise.all(
            recommendedVideoIds.map(async (videoId) => await fetchVideo(videoId))
          );

          setRecommendedVideos(recommendedVideos);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [user]);

  const handleNavigation = (direction, containerIndex) => {
    const container = containerRefs.current[containerIndex];
    const scrollAmount = container.clientWidth;
    const currentScroll = container.scrollLeft;

    if (direction === 'next') {
      container.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: 'smooth',
      });
    } else if (direction === 'prev') {
      container.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const videosByCategory = videos.reduce((acc, video) => {
    const categories = video.categories || ['Uncategorized'];
    categories.forEach((category) => {
      acc[category] = acc[category] || [];
      acc[category].push(video);
    });
    return acc;
  }, {});

  return (
    <div>
      <h1 className="main-heading">Video Catalog</h1>

      {recommendedVideos.length > 0 && (
        <div>
          <h2>Recommended Videos</h2>
          <div ref={(ref) => (containerRefs.current[0] = ref)} className="flexContainer">
            {recommendedVideos.map((video) => (
              <Link to={`/videos/${video._id}`} key={video._id} className="videoContainer">
                <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
                <div>
                  <h3>{video.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="nav-arrows">
            <button onClick={() => handleNavigation('prev', 0)}>{'<'}</button>
            <button onClick={() => handleNavigation('next', 0)}>{'>'}</button>
          </div>
        </div>
      )}

      {Object.entries(videosByCategory).map(([category, categoryVideos], index) => (
        <div key={category}>
          <h2>{category}</h2>
          <div ref={(ref) => (containerRefs.current[index + 1] = ref)} className="flexContainer">
            {categoryVideos.map((video) => (
              <Link to={`/videos/${video._id}`} key={video._id} className="videoContainer">
                <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
                <div>
                  <h3>{video.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="nav-arrows">
            <button onClick={() => handleNavigation('prev', index + 1)}>{'<'}</button>
            <button onClick={() => handleNavigation('next', index + 1)}>{'>'}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoPage;
