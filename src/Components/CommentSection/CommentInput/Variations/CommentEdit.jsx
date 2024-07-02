import React, { useState } from "react";
import { useMutation } from "react-query";

import { editCommentRequest } from "../../../../ApiServices/TasksService";
import useAutoResizeTextarea from "../../../../hooks/useAutoResizeTextarea";

import CommentInputShell from "../CommentInputShell";

export default function CommentEdit(props) {
  const [comment, setComment] = useState(props.comment.text);
  const [commentClicked, setCommentClicked] = useState(false);
  const { ref: commentRef } = useAutoResizeTextarea(comment);

  const { mutate: mutateEditComment } = useMutation(
    (commentData) => editCommentRequest(commentData),
    {
      onSuccess: () => {
        props.refreshQuery();
        setComment(props.comment.text);
      },
    }
  );

  function handleSubmit() {
    props.handleReplySubmit();
    setCommentClicked(false);
    props.setIsEditing(false);
    mutateEditComment({
      comment_id: props.comment.id,
      text: comment,
      parent_id: props.parent_id,
    });
  }

  function handleCancel() {
    props.handleReplySubmit();
    setCommentClicked(false);
    props.setIsEditing(false);
    setComment(props.comment.text);
  }

  return props.isOpen ? (
    <CommentInputShell 
      avatar={null}
      avatarSize={0}
      setComment={setComment}
      setCommentClicked={setCommentClicked}
      comment={comment}
      commentRef={commentRef}
      submitButtonText={"Update"}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      commentClicked={commentClicked}
    />
  ) : (
    <></>
  )
}
