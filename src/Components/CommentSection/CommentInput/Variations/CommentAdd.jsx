import React, { useState, useContext } from "react";
import { useMutation } from "react-query";

import { UserContext } from "../../../../Context/UserContext";

import { addCommentRequest } from "../../../../ApiServices/TasksService";
import useAutoResizeTextarea from "../../../../hooks/useAutoResizeTextarea";

import CommentInputShell from "../CommentInputShell";

export default function CommentAdd(props) {
  const { currentUser } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [commentClicked, setCommentClicked] = useState(false);
  const { ref: commentRef } = useAutoResizeTextarea(comment);

  const { mutate: mutateAddComment } = useMutation(
    (commentData) => addCommentRequest(commentData),
    {
      onSuccess: () => {
        props.refreshQuery();
        setComment("");
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
    setComment("");
  }

  return (
    <CommentInputShell 
      avatar={currentUser?.userInfo.avatar_metadata?.small}
      avatarSize={props.avatarSize}
      setComment={setComment}
      setCommentClicked={setCommentClicked}
      comment={comment}
      commentRef={commentRef}
      submitButtonText={"Comment"}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      commentClicked={commentClicked}
    />
  );
}
