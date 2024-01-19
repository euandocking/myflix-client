import React, { useState } from 'react';
import { addVideo } from '../videoApi'; // Import the addVideo function

const AddVideo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddVideo = async () => {
    try {
      // Use the addVideo function from the API module
      const videoData = {
        title,
        description,
        // Add any other video-related data you want to send to the server
      };

      // Make a POST request to add the video
      const response = await addVideo(videoData);

      // Handle the response (you might want to check for success status, etc.)
      console.log('Video added successfully:', response);

      // After successfully adding the video, you can redirect the user
      // For example, navigate them back to the video catalog
      // You can use the 'useNavigate' hook from 'react-router-dom'
      // Make sure to import 'useNavigate' from 'react-router-dom'
      // and define it using 'const navigate = useNavigate();'
      // Then you can call navigate('/video-catalog');
    } catch (error) {
      // Handle errors (e.g., show an error message to the user)
      console.error('Error adding video:', error.message);
    }
  };

  return (
    <div>
      <h2>Add Video</h2>
      <form>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange} />
        </label>
        <br />
        <button type="button" onClick={handleAddVideo}>
          Add Video
        </button>
      </form>
    </div>
  );
};

export default AddVideo;
