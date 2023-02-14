import react from 'react'
import { useQuery } from 'react-query'
import { fetchUserPosts } from '../../ApiServices/TasksService';
import PostCard from '../../Components/PostCard/PostCard';
import Navbar from '../../Components/Navbar/Navbar';

import './PostsPage.css'

export default function Posts() {

  const { data: userData , isLoading: userLoading, isError: userError , refetch} = useQuery(
    'user-posts', 
    fetchUserPosts,
    {
      refetchOnWindowFocus: false,
    }
  );

  if( userLoading ) return <main className="posts-page"><div className="App"><Navbar /><p>Loading...</p></div></main>
  if(userError) return <p>An Error occurred</p>

  const postElements = userData.posts.map(post => (<PostCard key={post.post_id} post={post} />))

  return(
    <main className="posts-page">
      <div className="App">
        <Navbar />
        Your Posts
        {postElements}
      </div>
    </main>
  )
}