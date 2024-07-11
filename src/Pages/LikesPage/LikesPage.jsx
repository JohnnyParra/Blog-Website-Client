import { Helmet } from 'react-helmet';

// Components
import Navbar from '../../Components/Navbar/Navbar';
import UserLikedPostsContent from '../../Components/UserLikedPostsContent/UserLikedPostsContent';

// Styling
import './LikesPage.css';

export default function Posts() {

  return (
    <main className='liked-posts'>
      <Helmet>
        <title>Likes | Project B</title>
        <meta name='description' content='This is the user liked posts page of our website.' />
        <meta name='keywords' content='liked, liked posts, page, website' />
      </Helmet>
      <div className='App'>
        <Navbar />
        <h5>Your Liked Posts</h5>
        <UserLikedPostsContent />
      </div>
    </main>
  );
};
