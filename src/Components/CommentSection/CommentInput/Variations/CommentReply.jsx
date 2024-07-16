import React, { useState, useContext } from "react";
import { useMutation } from "react-query";

import { UserContext } from "../../../../Context/UserContext";

import { addCommentRequest } from "../../../../ApiServices/TasksService";
import useAutoResizeTextarea from "../../../../hooks/useAutoResizeTextarea";

import CommentInputShell from "../CommentInputShell";

export default function CommentReply(props) {
  const { currentUser } = useContext(UserContext);
  const [comment, setComment] = useState(props.parent_id != null ? `@${props.comment.name}` : "");
  const [commentClicked, setCommentClicked] = useState(false);
  const { ref: commentRef } = useAutoResizeTextarea(comment);

  const { mutate: mutateAddComment } = useMutation(
    (commentData) => addCommentRequest(commentData),
    {
      onSuccess: () => {
        props.refreshQuery();
        setComment(props.parent_id != null ? `@${props.comment.name}` : "");
      },
    }
  );

  function handleSubmit() {
    props.handleReplySubmit();
    setCommentClicked(false);
    mutateAddComment({
      post_id: props.id,
      text: comment,
      parent_id: props.parent_id,
    });
  }

  function handleCancel() {
    props.handleReplySubmit();
    setCommentClicked(false);
    setComment(props.parent_id != null ? `@${props.comment.name}` : "");
  }

  return props.isOpen ? (
    <CommentInputShell 
      avatar={currentUser?.userInfo.avatar_metadata?.small}
      avatarSize={props.avatarSize}
      setComment={setComment}
      setCommentClicked={setCommentClicked}
      comment={comment}
      commentRef={commentRef}
      submitButtonText={"Reply"}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      commentClicked={commentClicked}
    />
  ) : (
    <></>
  )
}
