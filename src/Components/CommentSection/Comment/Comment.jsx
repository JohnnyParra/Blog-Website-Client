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

// Utilities
import { timeSince } from "../../../Utils/ConvertDate";

// MUI Components && Icons
import { Avatar } from "@mui/material";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FlagIcon from '@mui/icons-material/Flag';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// API Services
import { deleteCommentRequest } from "../../../ApiServices/TasksService";

// Hooks
import useDetectClick from "../../../hooks/useDetectClick";

// Styling
import "./Comment.css";

export default function Comment(props) {
  const { currentUser } = useContext(UserContext);
  const [showReplies, setShowReplies] = useState(false);
  const [reply, setReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);
  const { ref, btnRef, isDropDown, setIsDropDown } = useDetectClick();

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
    mutateDeleteComment(props.comment.id)
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
              {props.comment.date_updated 
                && <span className="edited">(edited)</span>
              }
            </div>
            {isEditing 
              ? (
                <CommentEdit 
                  key={nanoid()}
                  id={props.id}
                  parent_id={props.parent_id}
                  comment={props.comment}
                  refreshQuery={props.refreshQuery}
                  handleReplySubmit={handleReplySubmit}
                  avatarSize={30}
                  setIsEditing={setIsEditing}
                />
              )
              : <CommentExpander text={props.comment.text} />
            }
            <div className="interaction">
              <span className="like" title="like">
                <CommentLikeButton id={props.comment.id} />
              </span>
              <span className="reply" title="reply" onClick={() => handleReplyClick()}>
                Reply
              </span>
            </div>
            {reply && (
              <CommentReply
                key={nanoid()}
                id={props.id}
                parent_id={props.parent_id}
                comment={props.comment}
                refreshQuery={props.refreshQuery}
                handleReplySubmit={handleReplySubmit}
                avatarSize={30}
              />
            )}
          </div>
          <div className="more-container"> 
            <div className="more" ref={btnRef}>
              <MoreVertIcon fontSize="large"/>
            </div>
            <div className={`dropdown-content${isDropDown ? " show" : ""}`} ref={ref} >
              {props.comment.user_id === currentUser.user.userId 
                ? (
                  <>
                    <div className="link-container">
                      <div className="link" onClick={() => editComment()}>
                        <div className="icon">
                          <EditIcon />
                        </div>
                        <div className="text">
                          <span>Edit</span>
                        </div>
                      </div>
                      <div className="link" onClick={() => deleteCommentCheck()}>
                        <div className="icon">
                          <DeleteIcon />
                        </div>
                        <div className="text">
                          <span>Delete</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) 
                : (
                  <div className="link-container">
                    <div className="link">
                      <div className="icon">
                        <FlagIcon fontSize="large"/>
                      </div>
                      <div className="text">
                        <span>Report</span>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <div className="replies-container-2">
        {props.comment.child_count > 0 && (
          <div className="replies-btn-container">
            <div
              className="replies"
              title={showReplies ? "hide replies" : "replies"}
              onClick={() => handleRepliesClick()}
            >
              <span className="expand-icon">
                {showReplies ? <ExpandLessIcon /> : <ExpandMoreSharpIcon />}
              </span>
              <span>{showReplies ? "hide replies" : `${props.comment.child_count} replies`}</span>
            </div>
          </div>
        )}
        {showReplies && <Replies id={props.id} comment_id={props.comment.id} />}
      </div>
      {checkDelete 
        && (
          <div className="overlay-delete-container">
            <div className="page-overlay">
            </div>
            <div className="check-delete-container">
              <span>Are you sure you want to delete your comment?</span>
              <div className="options">
                <button className="cancel" onClick={() => cancelDelete()}>Cancel</button>
                <button className="delete" onClick={() => deleteComment()}>Delete</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}
