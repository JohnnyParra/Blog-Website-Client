// Libraries
import React, { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

// Pages
const SignUp = lazy(() => import('./Pages/SignUpPage/SignUp'));
const Login = lazy(() => import('./Pages/LoginPage/LoginPage'));
const Home = lazy(() => import('./Pages/HomePage/HomePage'));
const Search = lazy(() => import('./Pages/SearchPage/SearchPage'));
const CreatePost = lazy(() => import('./Pages/CreatePostPage/CreatePostPage'));
const EditPost = lazy(() => import('./Pages/EditPostPage/EditPostPage'));
const Likes = lazy(() => import('./Pages/LikesPage/LikesPage'));
const Post = lazy(() => import( './Pages/PostPage/PostPage'));
const Posts = lazy(() => import('./Pages/PostsPage/PostsPage'));
const Profile = lazy(() => import('./Pages/ProfilePage/ProfilePage'));
const NotFound = lazy(() => import('./Pages/NotFound/NotFound'));
import PrivateRoutes from './Utils/PrivateRoutes';


//Styling
import './index.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Suspense><Home /></Suspense>} />
        <Route path='/signup' element={<Suspense><SignUp /></Suspense>} />
        <Route path='/login' element={<Suspense><Login /></Suspense>} />
        <Route path='/search/:search' element={<Suspense><Search /></Suspense>} />
        <Route path='/post/:id' element={<Suspense><Post /></Suspense>} />
        <Route element={<PrivateRoutes />}>
          <Route path='/profile' element={<Suspense><Profile /></Suspense>} />
          <Route path='/your-posts' element={<Suspense><Posts /></Suspense>} />
          <Route path='/create-post' element={<Suspense><CreatePost /></Suspense>} />
          <Route path='/edit-post/:id' element={<Suspense><EditPost /></Suspense>} />
          <Route path='/liked-posts' element={<Suspense><Likes /></Suspense>} />
        </Route>
        <Route path='*' element={<Suspense><NotFound /></Suspense>} />
      </Routes>
    </Router>
  );
};
