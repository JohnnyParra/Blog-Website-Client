import react from 'react'
import { useQuery } from 'react-query'
import { fetchUserPosts } from '../../ApiServices/TasksService';
import PostCard from '../../Components/PostCard/PostCard';
import Navbar from '../../Components/Navbar/Navbar';

export default function Posts() {

  const { data: userData , isLoading: userLoading, isError: userError , refetch} = useQuery(
    'user-posts', 
    fetchUserPosts,
    {
      refetchOnWindowFocus: false,
    }
  );

  if( userLoading ) return <p>Loading...</p>
  if(userError) return <p>An Error occurred</p>

  const postElements = userData.posts.map(post => {
    return (
      <div key={post.post_id} className="post-card-container">
        <PostCard post={post} />
      </div>
    )
  })

  return(
    <div>
      <Navbar />
      Your Posts
      {postElements}
    </div>
  )
}