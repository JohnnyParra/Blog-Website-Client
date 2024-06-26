// Libraries
import React from "react";

// MUI Components && Icons
import { Avatar } from "@mui/material";

// Styling
import "./CommentInputShell.css";

export default function CommentInputShell(props) {

  return (
    <React.Fragment>
      <div className="comment-input-container">
        <div className="reply-input-container">
          {props.avatar !== null
          && (
            <div className="avatar-container">
              <Avatar
                src={props.avatar}
                sx={{ 
                  m: 1, 
                  width:props.avatarSize,
                  height: props.avatarSize, 
                  bgcolor: '#ff3d00' 
                }}
              />
            </div>
           )
          }
          <textarea
            className="input-text"
            name="comment"
            autoComplete="off"
            value={props.comment}
            ref={props.commentRef}
            onChange={(event) => props.setComment(event.target.value)}
            onFocus={() => props.setCommentClicked(true)}
            maxLength={1000}
            rows="1" 
            placeholder="Add a comment..."
          >
          </textarea>
        </div>
        {props.commentClicked && (
          <div className="btns">
            <button className="cancel" onClick={() => props.handleCancel()}>
              Cancel
            </button>
            <button
              className="comment"
              disabled={props.comment.trim() == "" ? true : false}
              style={
                props.comment.trim() === ""
                  ? {}
                  : { background: "rgb(255, 106, 0)", color: "white", cursor: "pointer" }
              }
              onClick={() => props.handleSubmit()}
            >
              {props.submitButtonText}
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
