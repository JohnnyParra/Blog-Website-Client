import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { addCommentRequest } from "../../ApiServices/TasksService";

import "./CommentInput.css";

export default function CommentInput(props) {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState(
    props.parent_id != null ? `@${props.comment.name}` : ""
  );
  const [commentClicked, setCommentClicked] = useState(false);

  const { mutate: mutateAddComment } = useMutation(
    (commentData) => addCommentRequest(commentData),
    {
      onSuccess: () => {
        props.refreshQuery();
        setComment(props.parent_id != null ? `@${props.comment.name}` : "");
      },
    }
  );

  function handleSubmit(event) {
    props.handleReplySubmit();
    setCommentClicked(false);
    mutateAddComment({
      post_id: props.id,
      text: comment,
      parent_id: props.parent_id,
    });
  }

  function handleCancel(event) {
    props.handleReplySubmit();
    setCommentClicked(false);
    setComment(props.parent_id != null ? `@${props.comment.name}` : "");
  }

  return (
    <React.Fragment>
      <input
        className="input-text"
        type="text"
        name="comment"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        onFocus={() => setCommentClicked(true)}
        maxLength={1000}
        placeholder="Add a comment..."
      ></input>
      {commentClicked && (
        <div className="btns">
          <button className="cancel" onClick={() => handleCancel()}>
            Cancel
          </button>
          <button
            className="comment"
            disabled={comment.trim() == "" ? true : false}
            style={
              comment.trim() === ""
                ? {}
                : { background: "rgb(228, 148, 0)", cursor: "pointer" }
            }
            onClick={(event) => handleSubmit(event)}
          >
            Comment
          </button>
        </div>
      )}
    </React.Fragment>
  );
}
