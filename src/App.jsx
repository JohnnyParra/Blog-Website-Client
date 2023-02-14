// Libraries
import React from 'react'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"

// Pages
import SignUp from './Pages/SignUpPage/SignUp'
import Login from './Pages/LoginPage/LoginPage'
import Home from './Pages/HomePage/HomePage'
import CreatePost from './Pages/CreatePostPage/CreatePostPage'
import EditPost from './Pages/EditPostPage/EditPostPage'
import Likes from './Pages/LikesPage/LikesPage'
import Post from './Pages/PostPage/PostPage'
import Posts from './Pages/PostsPage/PostsPage'
import Profile from './Pages/ProfilePage/ProfilePage'
import PrivateRoutes from './Utils/PrivateRoutes'

//Styling
import './index.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<SignUp />} />
        <Route path = "/Login" element = {<Login />} />
        <Route element={ <PrivateRoutes/>}>
          <Route path = "/HomePage" element = {<Home/>}/>
            <Route path = "/HomePage/:id"  element = {<Post />}/>
            <Route path = "HomePage/Profile" element = {<Profile/>}/>
            <Route path = "HomePage/Posts" element = {<Posts/>}/>
              <Route path = "HomePage/Posts/CreatePost" element = {<CreatePost />}/>
              <Route path = "HomePage/Posts/EditPost" element = {<EditPost />}/>
            <Route path = "HomePage/Likes" element = {<Likes/>}/>
        </Route> 
      </Routes>
    </Router>
  )
}

