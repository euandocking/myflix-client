import React from 'react';

const StarRating = ({ rating }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= fullStars; i++) {
      stars.push(<span key={i} className="star full-star"></span>);
    }

    if (hasHalfStar) {
      stars.push(<span key={fullStars + 1} className="star half-star"></span>);
    }

    const remainingStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 1; i <= remainingStars; i++) {
      stars.push(<span key={fullStars + i + (hasHalfStar ? 1 : 0)} className="star empty-star"></span>);
    }

    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;
