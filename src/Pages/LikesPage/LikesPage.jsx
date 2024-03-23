// Libraries
import { useQuery } from 'react-query';

// Api Services
import { fetchUserLikedPosts } from '../../ApiServices/TasksService';

// Components
import PostCard from '../../Components/PostCard/PostCard';
import Navbar from '../../Components/Navbar/Navbar';

// Styling
import './LikesPage.css';

export default function Posts() {
  const { data: userLikeData, isLoading: userLikeLoading, isError: userLikeError } = useQuery(
    'user-liked-posts', 
    fetchUserLikedPosts, 
    {
      refetchOnWindowFocus: false,
    }
  );

  if (userLikeLoading)
    return (
      <main className='liked-posts'>
        <div className='App'>
          <Navbar />
          <p>Loading...</p>
        </div>
      </main>
    );
  if (userLikeError) return <p>An Error occurred</p>;

  const postElements = userLikeData.posts.map((post) => {
    return (
      <div key={post.id} className='post-card-container'>
        <PostCard post={post} />
      </div>
    );
  });

  return (
    <main className='liked-posts'>
      <div className='App'>
        <Navbar />
        Your Liked Posts
        {postElements}
      </div>
    </main>
  );
};
