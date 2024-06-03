import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import './FeaturedPost.css';

export default function FeaturedPost(props) {
  const { post } = props;
  const { id, title, description, image, date_published } = post;

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/HomePage/${id}`);
  }

  return (
    <div className="featured-post-container">
      <div 
        className="featured-post"
        onClick={() => handleClick()}
      >
        <div className="image-container" style={{backgroundImage: `url(${image})`}}>
          <div className="image-overlay"></div>
          <div className="text-overlay">
            <div className="title-description-container">
              <div className="title-container">
                <h1 className="title">{title}</h1>
              </div>
              <div className="description-container">
                <h3 className="description">{description}</h3>
              </div>
            </div>
            <div className="continue-container">
              <h5 className="continue">continue reading...</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
