// Components
import Navbar from '../../Components/Navbar/Navbar';
import UserLikedPostsContent from '../../Components/UserLikedPostsContent/UserLikedPostsContent';

// Styling
import './LikesPage.css';

export default function Posts() {

  return (
    <main className='liked-posts'>
      <div className='App'>
        <Navbar />
        <h5>Your Liked Posts</h5>
        <UserLikedPostsContent />
      </div>
    </main>
  );
};
