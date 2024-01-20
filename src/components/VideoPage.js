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

  return (
    <div>
      <h1>Video Catalog</h1>
      <div className="flexContainer">
        {videos.map((video) => (
          <Link to={`/videos/${video._id}`} key={video._id} className="videoContainer">
            <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
            <div>
              <h2>{video.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;