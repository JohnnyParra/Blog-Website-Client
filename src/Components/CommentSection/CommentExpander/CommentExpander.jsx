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

  const styles = {
    overflow: showMore ? "none" : "hidden",
    display: showMore ? "block" : "-webkit-box",
    WebkitLineClamp: showMore ? "none" : "4",
    lineClamp: showMore ? "none" : "4",
    WebkitBoxOrient: showMore ? "none" : "vertical",
  }

  return (
    <div className="comment-expander-container">
      <div className="text-container" style={styles} ref={divRef}>
        <p className='text' ref={spanRef}>{props.text}</p>
      </div>
      <div className="expand-btn-container" style={{display: overflow ? "flex" : "none"}}>
        {overflow && 
          <span 
            className="expand-btn" 
            onClick={() => handleClick()}
          >
            {showMore ? "Show Less" : "Show More"}
          </span>
        }
      </div>
    </div>
  )
}