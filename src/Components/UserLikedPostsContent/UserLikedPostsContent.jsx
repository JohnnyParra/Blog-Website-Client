// Libraries
import React, { useState } from "react";
import { useInfiniteQuery } from "react-query";

// Components
import PostCard from "../PostCard/PostCard.jsx";

// API Services
import { fetchUserLikedPosts } from '../../ApiServices/TasksService';

// Hooks
import useDetectPageBottom from "../../hooks/useDetectPageBottom";

// Styling
import './UserLikedPostsContent.css';

export default function UserLikedPostsContent() {
  const [errorMsg, setErrorMsg] = useState('');

  const {
    data: backendData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['infiniteUserLikedPosts'],
    ({pageParam = 1}) => fetchUserLikedPosts(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (data) => {
        setErrorMsg("An error occurred");
      }
    }
  )
  useDetectPageBottom(isFetching, isFetchingNextPage, hasNextPage, fetchNextPage);

  if (isLoading) {
    return(
      <div className="user-posts-container">
        <span className="status" role="status" aria-busy="true" aria-live="polite">Loading...</span>
      </div>
    )
  } else if (isError) {
    return (
      <div className="user-posts-container">
        <span className="status" role='alert' aria-live="assertive">{errorMsg}</span>
      </div>
    )
  }

  const allPosts = backendData.pages.flatMap(page => page.posts);
  const postElements = allPosts.map(post => {
    return <PostCard key={post.id} post={post} />;
  });

  return (
    <div className='user-liked-posts-container'>
      {postElements}
      {isFetchingNextPage&& <div className="loading"  role='status' aria-live='polite'>Loading More Post...</div>}
    </div>
  )
}