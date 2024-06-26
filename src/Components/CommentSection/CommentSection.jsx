// Libraries
import React from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";

// Components
import Comment from "./Comment/Comment";
import CommentAdd from "./CommentInput/Variations/CommentAdd";

// API Services
import { fetchComments } from "../../ApiServices/TasksService";

// Hooks
import useDetectPageBottom from "../../hooks/useDetectPageBottom";

// Styling
import "./CommentSection.css";

export default function CommentSection(props) {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['comments', props.category, props.sort],
    ({pageParam = 1}) => fetchComments(props.id, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
      refetchOnWindowFocus: false,
    }
  )
  useDetectPageBottom(isFetching, isFetchingNextPage, hasNextPage, fetchNextPage);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error Occurred</p>;

  function refreshQuery() {
    queryClient.invalidateQueries(["comments"]);
  }

  const allComments = data.pages.flatMap(page => page.comments);

  const commentElements = allComments.map((comment) => {
    return (
      <Comment
        key={comment.id}
        id={props.id}
        parent_id={comment.id}
        comment={comment}
        size={40}
        refreshQuery={refreshQuery}
      />
    );
  });

  return (
    <div className="comment-section-container">
      <div className="title">
        <span>{data.pages[0].total[0].total} Comments</span>
      </div>
      <CommentAdd
        id={props.id}
        parent_id={null}
        refreshQuery={refreshQuery}
        handleReplySubmit={() => null}
        avatarSize={40}
      />
      {commentElements}
      {isFetchingNextPage&& <div className="loading">Loading More Comments...</div>}
    </div>
  );
}
