import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchVideos } from '../videoApi';
import './VideoPage.css'; // Import the CSS file

const VideoPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVideos();
        setVideos(data);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  // Organize videos by category
  const videosByCategory = videos.reduce((acc, video) => {
    const category = video.category || 'Uncategorized';
    acc[category] = acc[category] || [];
    acc[category].push(video);
    return acc;
  }, {});

  return (
    <div>
      <h1>Video Catalog</h1>
      {Object.entries(videosByCategory).map(([category, categoryVideos]) => (
        <div key={category}>
          <h2>{category}</h2>
          <div className="flexContainer">
            {categoryVideos.map((video) => (
              <Link to={`/videos/${video._id}`} key={video._id} className="videoContainer">
                <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
                <div>
                  <h3>{video.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoPage;
