import React from "react";
import { useQuery, useQueryClient } from "react-query";

import Comment from "../Comment/Comment";

import { fetchCommentReplies } from "../../ApiServices/TasksService";

import "./Replies.css";

export default function Replies(props) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    ["replies", props.comment_id],
    () => fetchCommentReplies(props.comment_id),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error Occurred</p>;

  function refreshQuery() {
    queryClient.invalidateQueries(["replies"]);
  }

  const replyElements = data.map((reply) => {
    return (
      <Comment
        key={reply.id}
        id={props.id}
        parent_id={reply.parent_id}
        comment={reply}
        size={30}
        refreshQuery={refreshQuery}
      />
    );
  });

  return <div className="replies-container">{replyElements}</div>;
}
