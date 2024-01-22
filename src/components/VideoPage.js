import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchVideos, fetchVideo } from '../videoApi';
import { useAuth } from '../AuthContext'; // Update the path to your AuthContext
import { getRecommendations } from '../recommendAPI';
import './VideoPage.css'; // Import the CSS file

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const { user } = useAuth(); // Use the useAuth hook to access user information
  const [recommendedVideos, setRecommendedVideos] = useState([]);

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

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (user && user.userId) {
          console.log('User ID:', user.userId);

          // Make the HTTP request using the recommendAPI function
          const recommendedVideoIds = await getRecommendations(user.userId);

          // Fetch detailed information for each recommended video
          const recommendedVideos = await Promise.all(
            recommendedVideoIds.map(async (videoId) => await fetchVideo(videoId))
          );

          // Update state with recommended videos
          setRecommendedVideos(recommendedVideos);
        }
      } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
      }
    };

    fetchRecommendations();
  }, [user]);

  // Organize videos by category
  const videosByCategory = videos.reduce((acc, video) => {
    const categories = video.categories || ['Uncategorized'];  // Use an array for categories
    categories.forEach(category => {
      acc[category] = acc[category] || [];
      acc[category].push(video);
    });
    return acc;
  }, {});

  return (
    <div>
      <h1>Video Catalog</h1>

      {/* Display Recommended Videos */}
      {recommendedVideos.length > 0 && (
        <div>
          <h2>Recommended Videos</h2>
          <div className="flexContainer">
            {recommendedVideos.map((video) => (
              <Link to={`/videos/${video._id}`} key={video._id} className="videoContainer">
                <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
                <div>
                  <h3>{video.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Display Videos by Category */}
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