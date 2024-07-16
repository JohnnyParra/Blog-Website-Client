// Libraries
import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';

// Api Services
import { fetchSearch } from '../../ApiServices/TasksService';

// Hooks
import useDetectPageBottom from '../../hooks/useDetectPageBottom';

// Components
import PostCard from '../PostCard/PostCard';

// Styling
import './SearchPostContent.css'

export default React.memo(function SearchPostContent(props) {
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
    ['infinitePosts', props.search],
    ({pageParam = 1}) => fetchSearch(props.search, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
      refetchOnWindowFocus: false,
      retry: false,
      onError: (data) => {
        if (data.status === 404) {
          setErrorMsg("No matching results found");
        } else {
          setErrorMsg("An Error occurred")
        }
      }
    }
  )
  useDetectPageBottom(isFetching, isFetchingNextPage, hasNextPage, fetchNextPage);

  if (isLoading) {return <span aria-busy="true" aria-live="polite">Loading...</span>};
  if (isError) {return <span role='alert' aria-live="assertive">{errorMsg}</span>};

  const allPosts = backendData.pages.flatMap(page => page.posts);
  const postElements = allPosts.map(post => {
    return <PostCard key={post.id} post={post} />;
  });

  return (
    <div className='search-post-content-container'>
      {postElements}
      {isFetchingNextPage&& <div className="loading"  role='status' aria-live='polite'>Loading More Posts...</div>}
    </div>
  )
});