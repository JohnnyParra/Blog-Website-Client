import { API_URL } from '../Environment/environment.dev';
import { get, post, formPost, put, formPut, remove } from './HttpService'

export const fetchPost = async (id) => {
  try {
    return get(`${API_URL}/post/${id}`);
  } catch (err) {
    return { data: [], error: err }
  }
}

export const fetchPosts = async (category, sort) => {
  try {
    return get(`${API_URL}/posts/${category}/${sort}`);
  } catch (err) {
    return { data: [], error: err }
  }
}

export const fetchFeaturedPost = async (category) => {
  try {
    return get(`${API_URL}/posts/featured/${category}`);
  } catch (err) {
    return { data: [], error: err }
  }
}

export const fetchUser = async () => {
  try {
    return get(`${API_URL}/user`);
  } catch (err) {
    return { data: [], error: err }
  }
}

export const fetchLikes = async (id) => {
  try {
    return get(`${API_URL}/likes/${id}`);
  } catch (err) {
    return { data: [], error: err }
  }
}

export const fetchUserPosts = async (published) => {
  try {
    return get(`${API_URL}/user/posts/${published}`);
  } catch (err) {
    return { data: [], error: err }
  }
}

export const fetchUserLikedPosts = async () => {
  try {
    return get(`${API_URL}/user/posts/liked`);
  } catch (err) {
    return { data: [], error: err }
  }
}

export const addPostRequest = async (newPost) => {
  try{
    return formPost(`${API_URL}/post`, newPost);
  } catch(err){
    return { data: [], error: err }
  }
}

export const updatePostRequest = async (newPost) => {
  try{
    return formPut(`${API_URL}/post`, newPost);
  } catch(err){
    return { data: [], error: err }
  }
}

export const addLikeRequest = async (post_id) => {
  try{
    return post(`${API_URL}/likes`, post_id);
  } catch(err){
    return { data: [], error: err }
  }
}

export const deletePostRequest = async (id) => {
  try {
    return remove(`${API_URL}/post/${id}`);
  } catch (err) {
    return { data: [], error: err } 
  }
}

export const deleteLikeRequest = async (id) => {
  try{
    return remove(`${API_URL}/likes/${id}`);
  } catch (err) {
    return { data: [], error: err } 
  }
}

export const updateAvatarRequest = async (newAvatar) => {
  try{
    return formPut(`${API_URL}/profile`, newAvatar);
  } catch (err) {
    return { data: [], error: err }
  }
}
