// Libraries
import { useState } from 'react';
import { Helmet } from 'react-helmet';

// Components
import Navbar from '../../Components/Navbar/Navbar';
import SquareButton from '../../Components/common/Buttons/SquareButton/SquareButton';
import UserPostsContent from '../../Components/UserPostsContent/UserPostsContent';

// Styling
import './PostsPage.css';

export default function Posts() {
  const [userPosts, setUserPosts] = useState(1);
  const [btnSelected, setBtnSelected] = useState('Published');

  function handleClick(event) {
    let name = event.currentTarget.getAttribute('data-name');

    if (name === 'Published') {
      setUserPosts(1);
      setBtnSelected('Published');
    } else if (name === 'Drafts') {
      setUserPosts(0);
      setBtnSelected('Drafts');
    } else if (name === 'Deleted') {
      setUserPosts('deleted');
      setBtnSelected('Deleted')
    }
  }

  return (
    <main className='posts-page'>
      <Helmet>
        <title>{`${btnSelected} ${btnSelected === 'Drafts' ? '' : 'Posts'}`} | Fire Talks</title>
        <meta name='description' content='This is the users posts page of our website.' />
        <meta name='keywords' content='user posts, page, website' />
      </Helmet>
      <div className='App'>
        <Navbar />
        <div className='btn-container'>
          <SquareButton
            onClick={handleClick}
            isSelected={btnSelected == 'Published'}
            text='Published Posts'
            name='Published'
          />
          <SquareButton
            onClick={handleClick}
            isSelected={btnSelected == 'Drafts'}
            text='Drafts'   
            name='Drafts'
          />
          <SquareButton
            onClick={handleClick}
            isSelected={btnSelected == 'Deleted'}
            text='Deleted Posts'
            name='Deleted' 
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
