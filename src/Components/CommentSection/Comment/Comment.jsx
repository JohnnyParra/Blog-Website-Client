// Libraries & Context
import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { nanoid } from "nanoid";
import { UserContext } from "../../../Context/UserContext";

// Components
import Replies from "../Replies/Replies";
import CommentReply from "../CommentInput/Variations/CommentReply";
import CommentEdit from "../CommentInput/Variations/CommentEdit";
import CommentLikeButton from "../CommentLikeButton/CommentLikeButton";
import CommentExpander from "../CommentExpander/CommentExpander";
import DropDownButton from "../../DropDownButton/DropDownButton";
import AlertModal from "../../AlertModal/AlertModal";

// Utilities
import { timeSince } from "../../../Utils/ConvertDate";

// MUI Components && Icons
import { Avatar } from "@mui/material";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// API Services
import { deleteCommentRequest } from "../../../ApiServices/TasksService";

// Styling
import "./Comment.css";

export default function Comment(props) {
  const { currentUser } = useContext(UserContext);
  const [showReplies, setShowReplies] = useState(false);
  const [reply, setReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);

  const { mutate: mutateDeleteComment } = useMutation(
    (comment_id) => deleteCommentRequest(comment_id),
    {
      onSuccess: () => {
        props.refreshQuery();
      },
    }
  );

  function handleReplyClick() {
    setReply(true);
  }

  function handleRepliesClick() {
    setShowReplies((prev) => !prev);
  }

  function handleReplySubmit() {
    setReply(false);
  }

  function editComment() {
    setIsEditing(true);
  }

  function deleteCommentCheck() {
    setCheckDelete(true);
  }

  function cancelDelete() {
    setCheckDelete(false);
  }

  function deleteComment() {
    setCheckDelete(false);
    mutateDeleteComment(props.comment.id);
  }

  function handleKeyDown(event, type) {
    if (event.key === 'Enter') {
      if (type === 'reply') {
        handleReplyClick();
      } else if (type === 'replies') {
        handleRepliesClick();
      }
    }
  }

  function handleDropDownSelect(type) {
    if (type === 'Report') {
      console.log('report functionality coming soon');
    } else if (type === 'Edit') {
      editComment();
    } else if (type === 'Delete') {
      deleteCommentCheck();
    }
  }
  console.log('comment: ', props.comment, props.comment.avatar_metadata, props.comment.avatar_metadata.small);

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
            alt={`Avatar of ${props.comment.name}`}
          >
            {props.comment.name[0].toUpperCase()}
          </Avatar>
          <div className="header-content-container">
            <div className="header">
              <span className="name" aria-label='name'>{props.comment.name}</span>
              <span className="date" aria-label='date comment was left'>
                {timeSince(new Date(props.comment.date_created))}
              </span>
              {props.comment.date_updated && (
                <span className="edited" aria-label='date edited'>
                  (edited)
                </span>
              )}
            </div>
            <CommentEdit
              key={nanoid()}
              isOpen={isEditing}
              id={props.id}
              parent_id={props.parent_id}
              comment={props.comment}
              refreshQuery={props.refreshQuery}
              handleReplySubmit={handleReplySubmit}
              avatarSize={30}
              setIsEditing={setIsEditing}
            />
            <CommentExpander 
              isOpen={!isEditing} 
              text={props.comment.text} 
            />
            <div className="interaction">
              <span className="like" title="like">
                <CommentLikeButton id={props.comment.id} />
              </span>
              <span
                className="reply"
                title="reply"
                onClick={() => handleReplyClick()}
                onKeyDown={(event) => handleKeyDown(event, 'reply')}
                tabIndex='0'
                role="button"
                aria-label="reply to comment"
              >
                Reply
              </span>
            </div>
            <CommentReply
              key={nanoid()}
              isOpen={reply}
              id={props.id}
              parent_id={props.parent_id}
              comment={props.comment}
              refreshQuery={props.refreshQuery}
              handleReplySubmit={handleReplySubmit}
              avatarSize={30}
            />
          </div>
          <div className="more-container">
            <DropDownButton 
              isUser={props.comment.user_id === currentUser.user.userId}
              commentId={props.comment.id}
              handleClick={handleDropDownSelect}
            />
          </div>
        </div>
      </div>
      <div className="replies-content">
        {props.comment.child_count > 0 && (
          <div className="replies-btn-container">
            <div
              className="replies"
              title={showReplies ? "hide replies" : "replies"}
              onClick={() => handleRepliesClick()}
              onKeyDown={(event) => handleKeyDown(event, 'replies')}
              role="button"
              tabIndex='0'
              aria-expanded={showReplies}
              aria-controls={`replies-${props.comment.id}`}
            >
              <span className="expand-icon">
                {showReplies ? <ExpandLessIcon /> : <ExpandMoreSharpIcon />}
              </span>
              <span>
                {showReplies
                  ? "hide replies"
                  : `${props.comment.child_count} replies`}
              </span>
            </div>
          </div>
        )}
        <Replies 
          isOpen={showReplies}
          id={props.id} 
          comment_id={props.comment.id} 
        />
      </div>
      <AlertModal 
        cancel={cancelDelete}
        delete={deleteComment}
        isOpen={checkDelete}
        setIsOpen={setCheckDelete}
        label={"Are you sure you want to delete your comment?"}
      />
    </div>
  );
}
