import React from "react";
import { useQuery, useQueryClient } from "react-query";

import Comment from "../Comment/Comment";
import CommentInput from "../CommentInput/CommentInput";

import { fetchComments } from "../../ApiServices/TasksService";

import "./CommentSection.css";

export default function CommentSection(props) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    ["comments", props.id],
    () => fetchComments(props.id),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error Occurred</p>;

  function refreshQuery() {
    queryClient.invalidateQueries(["comments"]);
  }

  const commentElements = data.comments.map((comment) => {
    return (
      <Comment
        key={comment.id}
        id={props.id}
        parent_id={null}
        comment={comment}
        size={40}
        refreshQuery={refreshQuery}
      />
    );
  });

  return (
    <div className="comment-section-container">
      <div className="title">
        <span>{data.total[0].total} Comments</span>
      </div>
      <CommentInput
        id={props.id}
        parent_id={null}
        refreshQuery={refreshQuery}
        handleReplySubmit={() => null}
      />
      {commentElements}
    </div>
  );
}
