// Libraries
import { useState } from 'react';

// Components
import Navbar from '../../Components/Navbar/Navbar';
import SquareButton from '../../Components/common/Buttons/SquareButton/SquareButton';
import UserPostsContent from '../../Components/UserPostsContent/UserPostsContent';

// Styling
import './PostsPage.css';

export default function Posts() {
  const [userPosts, setUserPosts] = useState(1);
  const [btnSelected, setBtnSelected] = useState('published');

  function handleClick(event) {
    let name = event.currentTarget.getAttribute('name');

    if (name === 'published') {
      setUserPosts(1);
      setBtnSelected('published');
    } else if (name === 'drafts') {
      setUserPosts(0);
      setBtnSelected('drafts');
    } else if (name === 'deleted') {
      setUserPosts('deleted');
      setBtnSelected('deleted')
    }
  }

  return (
    <main className='posts-page'>
      <div className='App'>
        <Navbar />
        <div className='btn-container'>
          <SquareButton
            onClick={handleClick}
            isSelected={btnSelected == 'published'}
            text='Published Posts'
            name='published'
          />
          <SquareButton
            onClick={handleClick}
            isSelected={btnSelected == 'drafts'}
            text='Drafts'   
            name='drafts'
          />
          <SquareButton
            onClick={handleClick}
            isSelected={btnSelected == 'deleted'}
            text='Deleted Posts'
            name='deleted' 
          />
        </div>
        {btnSelected === 'deleted' && (
          <h5>Posts here will automatically delete after 30 days.</h5>
        )}
        <UserPostsContent param={userPosts} />
      </div>
    </main>
  );
};
