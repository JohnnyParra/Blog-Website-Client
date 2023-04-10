import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchUserPosts } from '../../ApiServices/TasksService';
import PostCard from '../../Components/PostCard/PostCard';
import Navbar from '../../Components/Navbar/Navbar';
import Button from '../../Components/common/Button';

import './PostsPage.css';

export default function Posts() {
  const [userPosts, setUserPosts] = useState(1);
  const [btnSelected, setBtnSelected] = useState('published');

  const { data: userData , isLoading: userLoading, isError: userError } = useQuery(
    ['user-posts', userPosts], 
    () => fetchUserPosts(userPosts),
    {
      refetchOnWindowFocus: false,
    }
  );

  if ( userLoading ) {return <main className='posts-page'><div className='App'><Navbar /><p>Loading...</p></div></main>};
  if (userError) {return <p>An Error occurred</p>};

  async function handleClick(event){
    if (event.target.name === 'published'){
      setUserPosts(1)
      setBtnSelected('published')
    } else if (event.target.name === 'drafts'){
      setUserPosts(0)
      setBtnSelected('drafts')
    }
  };

  const postElements = userData.posts.map(post => (<PostCard key={post.post_id} post={post} />));

  return(
    <main className='posts-page'>
      <div className='App'>
        <Navbar />
        <div className='btn-container'>
          <Button 
            handleClick={handleClick} 
            isSelected={btnSelected} 
            text='Published Posts' 
            name='published' 
          />
          <Button 
            handleClick={handleClick} 
            isSelected={btnSelected} 
            text='Drafts' 
            name='drafts' 
          />
        </div>
        {postElements}
      </div>
    </main>
  )
};