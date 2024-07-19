// Libraries
import React, { useState, useEffect } from "react";
import { useInfiniteQuery , useQueryClient } from "react-query";

// Components
import Comment from "../Comment/Comment";

// MUI Components && Icons
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

// API Services
import { fetchCommentReplies } from "../../../ApiServices/TasksService";

// Styling
import "./Replies.css";

export default function Replies(props) {
  const queryClient = useQueryClient();
  const [hasFetched, setHasFetched] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['replies', props.comment_id],
    ({pageParam = 1}) => fetchCommentReplies(props.comment_id, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
      refetchOnWindowFocus: false,
      enabled: props.isOpen || hasFetched,
      onSuccess: (data) => {
        setHasFetched(true);
      }
    }
  )

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error Occurred</p>;
  if (!props.isOpen || !hasFetched) return;

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      fetchNextPage();
    }
  }

  function refreshQuery() {
    queryClient.invalidateQueries(["replies"]);
  }
  const allReplies = data.pages.flatMap(page => page.comments);

  const replyElements = allReplies.map((reply) => {
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

  return props.isOpen ? (
    <div className="replies-container">
      {replyElements}
      {isFetchingNextPage&& <div className="loading" role='alert' aria-live='polite'>Loading More Replies...</div>}
      {hasNextPage && (
        <div className="replies-btn-container">
          <div
            className="replies"
            title="Show more replies"
            onClick={() => fetchNextPage()}
            onKeyDown={(event) => handleKeyDown(event)}
            tabIndex='0'
            role='button'
            aria-label='Load more replies'
            aria-controls='replies-container'
          >
            <span className="expand-icon">
              <SubdirectoryArrowRightIcon />
            </span>
            <span>Show more replies</span>
          </div>
        </div>
      )}
    </div>
  ) : (
    <></>
  )
}
