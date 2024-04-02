import React, { useState } from "react";
import { nanoid } from "nanoid";

import Replies from "../Replies/Replies";
import CommentInput from "../CommentInput/CommentInput";
import CommentLikeButton from "../CommentLikeButton/CommentLikeButton";

import { timeSince } from "../../Utils/ConvertDate";

import { Avatar } from "@mui/material";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import "./Comment.css";

export default function Comment(props) {
  const [showReplies, setShowReplies] = useState(false);
  const [reply, setReply] = useState(false);

  function handleReplyClick(event) {
    setReply(true);
  }

  function handleRepliesClick(event) {
    setShowReplies((prev) => !prev);
  }

  function handleReplySubmit(event) {
    setReply(false);
  }

  return (
    <div className="comment-container">
      <div className="body-container">
        <div className="body">
          <Avatar
            src={props.comment.avatar}
            sx={{
              width: props.size,
              height: props.size,
              m: 1,
              bgcolor: "#ff3d00",
            }}
          >{props.comment.name[0].toUpperCase()}</Avatar>
          <div className="header-content-container">
            <div className="header">
              <span className="name">{props.comment.name}</span>
              <span className="date">
                {timeSince(new Date(props.comment.date_created))}
              </span>
            </div>
            <div className="content">
              <span>{props.comment.text}</span>
            </div>
          </div>
        </div>
        <div className="interaction">
          <span className="like">
            <CommentLikeButton id={props.comment.id} />
          </span>
          <span className="reply" onClick={(event) => handleReplyClick(event)}>
            Reply
          </span>
        </div>
      </div>
      {reply && (
        <CommentInput
          key={nanoid()}
          id={props.id}
          parent_id={props.parent_id}
          comment={props.comment}
          refreshQuery={props.refreshQuery}
          handleReplySubmit={handleReplySubmit}
        />
      )}
      {props.comment.child_count > 0 && (
        <div className="replies-btn-container">
          <div
            className="replies"
            onClick={(event) => handleRepliesClick(event)}
          >
            <span>replies</span>
            <span>
              {showReplies ? <ExpandLessIcon /> : <ExpandMoreSharpIcon />}
            </span>
          </div>
        </div>
      )}
      {showReplies && <Replies id={props.id} comment_id={props.comment.id} />}
    </div>
  );
}
