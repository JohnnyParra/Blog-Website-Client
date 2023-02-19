import { API_URL } from '../environment/environment.dev';
import { get, post, put, remove } from './HttpService'


export const fetchPosts = async (category, sort) => {
  try {
    return get(`${API_URL}/posts/${category}/${sort}`);
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
    return get(`${API_URL}/get-likes/${id}`);
  } catch (err) {
    return { data: [], error: err }
  }
}

export const fetchUserPosts = async (published) => {
  try {
    return get(`${API_URL}/user-posts/${published}`);
  } catch (err) {
    return { data: [], error: err }
  }
}

export const fetchUserLikedPosts = async () => {
  try {
    return get(`${API_URL}/user-liked-posts`);
  } catch (err) {
    return { data: [], error: err }
  }
}

export const addPostRequest = async (newPost) => {
  try{
    return post(`${API_URL}/add-post`, newPost);
  } catch(err){
    return { data: [], error: err }
  }
}

export const updatePostRequest = async (newPost) => {
  try{
    return put(`${API_URL}/update-post`, newPost);
  } catch(err){
    return { data: [], error: err }
  }
}

export const addLikeRequest = async (post_id) => {
  try{
    return post(`${API_URL}/add-like`, post_id);
  } catch(err){
    return { data: [], error: err }
  }
}

export const deletePostRequest = async (id) => {
  try{
    return remove(`${API_URL}/delete-post/${id}`);
  } catch(err){
    return { data: [], error: err } 
  }
}

export const deleteLikeRequest = async (id) => {
  try{
    return remove(`${API_URL}/delete-like/${id}`);
  } catch(err){
    return { data: [], error: err } 
  }
}
