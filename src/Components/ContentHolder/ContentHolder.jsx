import React from 'react';
import { useQuery } from 'react-query';

import { fetchPosts } from '../../ApiServices/TasksService';
import PostCard from '../PostCard/PostCard';

export default React.memo(function ContentHolder(props) {

  const { data: backendData , isLoading: backendLoading, isError: backendError } = useQuery(
    ['posts', props.category, props.sort], 
    () => fetchPosts(props.category, props.sort),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (backendLoading) {return <p>Loading...</p>};
  if (backendError) {return <p>An Error occurred</p>};
  const backendPosts = backendData.posts;

  const postElements = backendPosts.map(post => {
    return <PostCard post={post} />
  });

  return (
    <div className='content-holder'>
      {postElements}
    </div>
  )
});