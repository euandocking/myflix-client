import axios from 'axios';

const REACT_APP_RECOMMENDATION_API = process.env.REACT_APP_RECOMMENDATION_API || 'http://localhost:5002';

export const getRecommendations = async (userId) => {
  try {
    const response = await axios.post(
      `${REACT_APP_RECOMMENDATION_API}/recommendations`,
      { user_id: userId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.recommendations;
  } catch (error) {
    console.error('Error getting recommendations:', error.message);
    throw error;
  }
};