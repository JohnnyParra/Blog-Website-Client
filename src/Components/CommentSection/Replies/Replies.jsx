// Libraries
import React from "react";
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
    }
  )

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error Occurred</p>;

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

  return (
    <div className="replies-container">
      {replyElements}
      {isFetchingNextPage&& <div className="loading">Loading More Replies...</div>}
      {hasNextPage && (
        <div className="replies-btn-container">
          <div
            className="replies"
            title="Show more replies"
            onClick={() => fetchNextPage()}
          >
            <span className="expand-icon">
              <SubdirectoryArrowRightIcon />
            </span>
            <span>Show more replies</span>
          </div>
        </div>
      )}
    </div>
  )
}
