import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { addLikeRequest, fetchLikes, deleteLikeRequest } from '../../ApiServices/TasksService';

import './LikeButton.css'

export default function LikeButton(props) {
  const [likeButton, setLikeButton] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    'likes' , 
    () => fetchLikes(props.id),
    {
      onSuccess: (data) =>{
        if(data.userLike[0].userLike > 0){
          setLikeButton(true)
        }
      } 
    }
  )

  const { mutate: mutateAddLike } = useMutation((like) => addLikeRequest(like),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['likes']);
      }
    }
  )
  const { mutate: mutateDeleteLike } = useMutation(() => deleteLikeRequest(props.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['likes']);
      }
    }
  )


  if(isLoading) return<p>Loading...</p>
  if(isError) return<p>Error Occurred</p>
  const styles= {color: 'red'}

  function addLikeClick() {
    setLikeButton(true)
    mutateAddLike({post_id: props.id})
  }

  function removeLikeClick() {
    setLikeButton(false)
    mutateDeleteLike()
  }

  const likeBtn = likeButton ? <FavoriteIcon style={styles} onClick={removeLikeClick} /> : <FavoriteBorderIcon style={styles} onClick={addLikeClick} /> 

  return(
    <div className="like-btn">
      <span>{data.likes[0].Likes}</span>
      {likeBtn}
    </div>
  )
}