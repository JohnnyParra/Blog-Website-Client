// Libraries
import React  from "react";
import { useNavigate } from 'react-router-dom';

// Styling
import './FeaturedPost.css';

export default function FeaturedPost(props) {
  const { post } = props;
  const { id, title, description, image, image_metadata, date_published } = post;

  const navigate = useNavigate();

  function handleClick() {
    if (!props.isLoading && !props.isError) {
      navigate(`/post/${id}`);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      navigate(`/post/${id}`)
    }
  }



  return (
    <div className="featured-post-container">
      <div 
        className="featured-post"
        onClick={() => handleClick()}
        onKeyDown={(event) => handleKeyDown(event)}
        role='button'
        title={title}
        tabIndex='0'
        aria-label={`Read more about ${title}`}
      >
        <div className="image-container" style={{backgroundImage: `url(${image_metadata?.featured})`}} role="img">
          <div className="image-overlay"></div>
          <div className="text-overlay">
            <div className="title-description-container">
              <div className="title-container" title={title}>
                <h1 className="title">{!props.isError ? title : 'An error occurred'}</h1>
              </div>
              <div className="description-container" title={description}>
                <h3 className="description">{description}</h3>
              </div>
            </div>
            <div className="continue-container">
              <h5 className="continue">{!props.isLoading && !props.isError ? "continue reading..." : ''}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}