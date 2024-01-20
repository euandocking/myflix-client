import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideo } from '../videoApi';
import './VideoDetail.css'; // Import the CSS file

const VideoDetail = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVideo(videoId);
        setVideo(data);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [videoId]);

  if (!video) {
    return <p>Loading...</p>;
  }

  return (
    <div className="video-detail-container">
      <iframe
        className="video-player"
        src={video.videoUrl}
        title={video.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>

      <div className="video-details">
        {video.thumbnailUrl && (
          <img className="thumbnail" src={video.thumbnailUrl} alt="Thumbnail" />
        )}

        <div className="title-description">
          <h1>{video.title}</h1>
          <p>{video.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;