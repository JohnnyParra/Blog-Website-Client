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
    () => fetchFeaturedPost(props.category || 0),
    {
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );

  const fallbackPost = {
    id: 'missingFeatured',
    description: '',
    image: '',
    image_metadata: {featured: ''},
    title: '',
    date_published: '',
  }

  const postToShow = (featuredLoading || featuredError) ? fallbackPost : featuredData.post[0];

  return (
    <div className='featured-content-holder'>
      <FeaturedPost post={postToShow} isLoading={featuredLoading} isError={featuredError}/>
    </div>
  )
});