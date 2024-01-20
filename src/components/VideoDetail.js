import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideo } from '../videoApi'; // Assuming you have a fetchVideo function in your videoApi

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
    <div>
      <h1>{video.title}</h1>
      <p>{video.description}</p>
      <p>Video URL: {video.videoUrl}</p>
      {video.thumbnailUrl && <img src={video.thumbnailUrl} alt="Thumbnail" />}
    </div>
  );
};

export default VideoDetail;