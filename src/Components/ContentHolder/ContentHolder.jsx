// Libraries
import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';

// Api Services
import { fetchPosts } from '../../ApiServices/TasksService';

// Components
import PostCard from '../PostCard/PostCard';

import './ContentHolder.css'

export default React.memo(function ContentHolder(props) {
  const scrollPositionRef = useRef(0);

  const {
    data: backendData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['infinitePosts', props.category, props.sort],
    ({pageParam = 1}) => fetchPosts(props.category, props.sort, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
      refetchOnWindowFocus: false,
    }
  )

  // Detects when user reaches bottom of the div
  useEffect(() => {
    const app = document.querySelector('.App');
    function detectBottom() {
      if (app) {
        const isBottom = app.scrollTop + app.clientHeight >= app.scrollHeight - 10;
        if (isBottom && !isFetching && !isFetchingNextPage && hasNextPage) {
          scrollPositionRef.current = window.scrollY;
          fetchNextPage();
        }
      }
    }
    app.addEventListener("scroll",detectBottom);

    return () => {
      app.removeEventListener("scroll",detectBottom);
    }
  },[isFetching, isFetchingNextPage, hasNextPage]);

  if (isLoading) {return <p>Loading...</p>};
  if (isError) {return <p>An Error occurred</p>};

  const allPosts = backendData.pages.flatMap(page => page.posts);
  const postElements = allPosts.map(post => {
    return <PostCard key={post.id} post={post} />;
  });

  return (
    <div className='content-holder'>
      {postElements}
      {isFetchingNextPage&& <div className="loading">Loading More Post...</div>}
    </div>
  )
});