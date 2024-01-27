// Libraries
import React from 'react';
import { useQuery } from 'react-query';

// Api Services
import { fetchPosts } from '../../ApiServices/TasksService';

// Components
import PostCard from '../PostCard/PostCard';
import PageSelect from '../PageSelect/PageSelect'

export default React.memo(function ContentHolder(props) {

  const { data: backendData , isLoading: backendLoading, isError: backendError } = useQuery(
    ['posts', props.category, props.sort, props.page], 
    () => fetchPosts(props.category, props.sort, props.page),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (backendLoading) {return <p>Loading...</p>};
  if (backendError) {return <p>An Error occurred</p>};
  const backendPosts = backendData.posts;
  const count = backendData.count[0]['COUNT(*)'] - 1;

  const postElements = backendPosts.map((post, index) => {
    return <PostCard key={index} post={post} />
  });

  return (
    <div className='content-holder'>
      {postElements}
      <PageSelect pages={Math.ceil(count/2)} />
    </div>
  )
});