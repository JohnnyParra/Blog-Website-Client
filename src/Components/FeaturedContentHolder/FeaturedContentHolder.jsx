// Libraries
import React from 'react';
import { useQuery } from 'react-query';

// Api Services
import { fetchFeaturedPost } from '../../ApiServices/TasksService';

// Components
import FeaturedPost from '../FeaturedPost/FeaturedPost';

import './FeaturedContentHolder.css';

export default React.memo(function FeaturedContentHolder(props) {

  const { data: featuredData , isLoading: featuredLoading, isError: featuredError } = useQuery(
    ['posts', props.category], 
    () => fetchFeaturedPost(props.category),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className='featured-content-holder'>
      {featuredLoading ? <p>Loading...</p>
      : featuredError ? <p>An Error occurred</p>
      : <FeaturedPost post={featuredData.post[0]} isLoading={featuredLoading} isError={featuredError}/>}
    </div>
  )
});