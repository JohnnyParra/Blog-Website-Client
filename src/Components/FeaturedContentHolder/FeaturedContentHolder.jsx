import React from 'react';
import { useQuery } from 'react-query';

import { fetchFeaturedPost } from '../../ApiServices/TasksService';
import FeaturedPost from '../FeaturedPost/FeaturedPost';

export default React.memo(function FeaturedContentHolder(props) {

  const { data: featuredData , isLoading: featuredLoading, isError: featuredError } = useQuery(
    ['posts', props.category], 
    () => fetchFeaturedPost(props.category),
    {
      refetchOnWindowFocus: false,
    }
  );

  if(featuredLoading) {return <p>Loading...</p>};
  if(featuredError) {return <p>An Error occurred</p>};
  const featuredPost = featuredData.post;

  return (
    <div className='featured-content-holder'>
      <FeaturedPost post={featuredPost[0]}/>
    </div>
  )
});