// Libraries
import React, { useState, useEffect, useRef } from "react";

// Styling
import './CommentExpander.css'

export default function CommentExpander(props) {
  const [showMore, setShowMore] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const spanRef = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    const div = divRef.current;
    const span = spanRef.current;
    if (div.scrollHeight > div.clientHeight) {
      setOverflow(true);
    }
  },[])

  function handleClick() {
    setShowMore(prev => !prev);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      setShowMore(prev => !prev);
    }
  }

  const styles = {
    overflow: showMore ? "none" : "hidden",
    display: showMore ? "block" : "-webkit-box",
    WebkitLineClamp: showMore ? "none" : "4",
    lineClamp: showMore ? "none" : "4",
    WebkitBoxOrient: showMore ? "none" : "vertical",
  }

  return props.isOpen ? (
    <div className="comment-expander-container">
      <div className="text-container" id='comment-text' style={styles} ref={divRef}>
        <p className='text' ref={spanRef}>{props.text}</p>
      </div>
      <div className="expand-btn-container" style={{display: overflow ? "flex" : "none"}}>
        {overflow && 
          <div 
            className="expand-btn" 
            onClick={() => handleClick()}
            onKeyDown={(event) => handleKeyDown(event)}
            role='button'
            tabIndex='0'
            aria-expanded={showMore}
            aria-controls='comment-text'
            aria-label={showMore ? "Show Less" : "Show More"}
          >
            <span>{showMore ? "Show Less" : "Show More"}</span>
          </div>
        }
      </div>
    </div>
  ) : (
    <></>
  )
}