import React, { useEffect, useState } from 'react';
import { fetchVideos } from '../videoApi';

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
      <ul>
        {videos.map((video) => (
          <li key={video._id}>
            <h2>{video.title}</h2>
            <p>{video.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoPage;