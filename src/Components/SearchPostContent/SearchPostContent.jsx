// Libraries
import React from 'react';
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
    }
  )
  useDetectPageBottom(isFetching, isFetchingNextPage, hasNextPage, fetchNextPage);

  if (isLoading) {return <p>Loading...</p>};
  if (isError) {return <p>An Error occurred</p>};

  const allPosts = backendData.pages.flatMap(page => page.posts);
  const postElements = allPosts.map(post => {
    return <PostCard key={post.id} post={post} />;
  });

  return (
    <div className='search-post-content-container'>
      {postElements.length !== 0 ? postElements: "No Matching Results"}
      {isFetchingNextPage&& <div className="loading">Loading More Post...</div>}
    </div>
  )
});