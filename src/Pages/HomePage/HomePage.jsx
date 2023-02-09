// Libraries
import React, { useState, useContext, useEffect } from 'react'
import {nanoid} from 'nanoid'
import { useQuery } from 'react-query';
import { Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import FeaturedPost from '../../Components/FeaturedPost/FeaturedPost'
import PostCard from '../../Components/PostCard/PostCard'
import SelectOption from '../../Components/SelectOption/SelectOption'

// API Services
import { clearJwt } from '../../ApiServices/JwtService'
import { fetchPosts , fetchUser} from '../../ApiServices/TasksService';

//Components
import Navbar from '../../Components/Navbar/Navbar'

// Styling
import './HomePage.css'
const options = [
  {value: 1, title: 'Recent'},
  {value: 2, title: 'Trending'},
  {value: 3, title: 'Most Liked'}
]


export default function Home(){
  const navigate = useNavigate();
  const { data, updateData, loginUser } = useContext(UserContext)
  const [input, setInput] = useState({sort: 1, category: 0})

  const { data: backendData , isLoading: backendLoading, isError: backendError , refetch} = useQuery(
    'posts', 
    () => fetchPosts(input.category, input.sort),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: userData , isLoading: userLoading, isError: userError , refetch: userRefetch} = useQuery(
    'user', 
    fetchUser,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        loginUser(data)
      }
    }
  );

  if( backendLoading || userLoading) return <p>Loading...</p>
  if(backendError) return <p>An Error occurred</p>
  const backendPosts = backendData.posts;
  console.log(backendData);

  async function handleSelect(value){
    await setInput(prevInput => ({...prevInput, sort: value}))
    refetch()
  }
  async function handleCategoryClick(value){
    await setInput(prevInput => ({...prevInput, category: value}))
    refetch()
  }

  return (
    <main>
      <div className = "App">
        <Navbar name={userData?.user.name} />
        <div className="category-links">
          <a onClick={() => handleCategoryClick(0)}href="#">All</a>
          <a onClick={() => handleCategoryClick(4)} href="#">Business</a>
          <a onClick={() => handleCategoryClick(5)} href="#">Technology</a>
          <a onClick={() => handleCategoryClick(6)} href="#">Politics</a>
          <a onClick={() => handleCategoryClick(7)} href="#">Science</a>
          <a onClick={() => handleCategoryClick(8)} href="#">Health</a>
          <a onClick={() => handleCategoryClick(9)} href="#">Travel</a>
          <a onClick={() => handleCategoryClick(10)} href="#">Sports</a>
          <a onClick={() => handleCategoryClick(11)} href="#">Gaming</a>
          <a onClick={() => handleCategoryClick(12)} href="#">Culture</a>
          <a onClick={() => handleCategoryClick(13)} href="#">Style</a>
          <a onClick={() => handleCategoryClick(14)} href="#">Other</a>
        </div>
        <FeaturedPost post={backendPosts[0]}/>
        <div className="select-option-container">
          <Button onClick={() => navigate('Posts/CreatePost')} size='small' variant="contained" color="success" startIcon={<CreateIcon />}>
            Create A Post
          </Button>
          <SelectOption options={options} selection="Sort" handleSelect={handleSelect}/>
        </div>
        <div className="post-card-container">
          <PostCard post={backendPosts[0]} />
        </div>
        <div className="post-card-container">
          <PostCard post={backendPosts[1]} />
        </div>
      </div>
    </main>
  )
};