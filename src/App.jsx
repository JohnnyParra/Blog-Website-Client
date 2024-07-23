// Libraries
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

// Pages
import SignUp from './Pages/SignUpPage/SignUp';
import Login from './Pages/LoginPage/LoginPage';
import Home from './Pages/HomePage/HomePage';
import Search from './Pages/SearchPage/SearchPage'
import CreatePost from './Pages/CreatePostPage/CreatePostPage';
import EditPost from './Pages/EditPostPage/EditPostPage';
import Likes from './Pages/LikesPage/LikesPage';
import Post from './Pages/PostPage/PostPage';
import Posts from './Pages/PostsPage/PostsPage';
import Profile from './Pages/ProfilePage/ProfilePage';
import PrivateRoutes from './Utils/PrivateRoutes';
import NotFound from './Pages/NotFound/NotFound';

//Styling
import './index.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/home' element={<Home />} />
          <Route path='/search/:search' element={<Search />} />
          <Route path='/post/:id' element={<Post />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/your-posts' element={<Posts />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/edit-post/:id' element={<EditPost />} />
          <Route path='/liked-posts' element={<Likes />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};
