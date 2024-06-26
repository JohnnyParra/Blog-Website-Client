import { API_URL } from '../Environment/environment.dev';
import { get, post, formPost, put, formPut, remove } from './HttpService'

export const fetchPost = async (id) => {
  try {
    return get(`${API_URL}/post/${id}`);
  } catch (err) {
    return { data: [], error: err }
  }
}

export const fetchPosts = async (category, sort, page) => {
  try {
    return get(`${API_URL}/posts/${category}/${sort}/${page}`);
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

export const addLikeRequest = async (post_id) => {
  try{
    return post(`${API_URL}/likes`, post_id);
  } catch(err){
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

export const fetchCommentLikes = async (id) => {
  try {
    return get(`${API_URL}/comments/likes/${id}`);
  } catch (err) {
    return { data: [], error: err }
  }
}

export const addCommentLikeRequest = async (id) => {
  try{
    return post(`${API_URL}/comments/likes/${id}`);
  } catch(err){
    return { data: [], error: err }
  }
}

export const deleteCommentLikeRequest = async (id) => {
  try{
    return remove(`${API_URL}/comments/likes/${id}`);
  } catch (err) {
    return { data: [], error: err } 
  }
}

export const fetchComments = async (id, page) => {
  try {
    return get(`${API_URL}/comments/${id}/${page}`);
  } catch (err) {
    return { data: [], error: err }
  }
}

export const fetchCommentReplies = async (id, page) => {
  try {
    return get(`${API_URL}/comments/replies/${id}/${page}`);
  } catch (err) {
    return { data: [], error: err }
  }
}

export const addCommentRequest = async (data) => {
  try{
    return post(`${API_URL}/comments`, data);
  } catch(err){
    return { data: [], error: err }
  }
}

export const editCommentRequest = async (data) => {
  try{
    return put(`${API_URL}/comments/`, data);
  } catch(err){
    return { data: [], error: err }
  }
}

export const deleteCommentRequest = async (id) => {
  try{
    return remove(`${API_URL}/comments/${id}`);
  } catch(err){
    return { data: [], error: err }
  }
}

export const fetchUserPosts = async (published, page) => {
  try {
    return get(`${API_URL}/user/posts/${published}/${page}`);
  } catch (err) {
    return { data: [], error: err }
  }
}

export const fetchUserLikedPosts = async (page) => {
  try {
    return get(`${API_URL}/user/posts/liked/${page}`);
  } catch (err) {
    return { data: [], error: err }
  }
}

export const fetchSearch = async (search, page) => {
  try {
    return get(`${API_URL}/search/${search}/${page}`);
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


export const deleteAccountRequest = async (id) => {
  try {
    return remove(`${API_URL}/user`);
  } catch (err) {
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


export const updateAvatarRequest = async (newAvatar) => {
  try{
    return formPut(`${API_URL}/profile`, newAvatar);
  } catch (err) {
    return { data: [], error: err }
  }
}
