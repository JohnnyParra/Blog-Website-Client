// Libraries
import React from 'react';
import { useInfiniteQuery } from 'react-query';

// Api Services
import { fetchPosts } from '../../ApiServices/TasksService';

// Hooks
import useDetectPageBottom from '../../hooks/useDetectPageBottom';

// Components
import PostCard from '../PostCard/PostCard';

// Styling
import './ContentHolder.css'

export default React.memo(function ContentHolder(props) {

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
  useDetectPageBottom(isFetching, isFetchingNextPage, hasNextPage, fetchNextPage);

  if (isLoading) {return <p>Loading...</p>};
  if (isError) {return <p>An Error occurred</p>};

  const allPosts = backendData.pages.flatMap(page => page.posts);
  const postElements = allPosts.map(post => {
    return <PostCard key={post.id} post={post} />;
  });

  return (
    <section className='content-holder' role='feed'>
      {postElements}
      {isFetchingNextPage&& <div className="loading" role='status' aria-live='polite'>Loading More Posts...</div>}
    </section>
  )
});