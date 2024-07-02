// Libraries
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

// Api Services
import { addLikeRequest, fetchLikes, deleteLikeRequest } from '../../ApiServices/TasksService';

// MUI Icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Styling
import './LikeButton.css';

export default function LikeButton(props) {
  const [likeButton, setLikeButton] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    ['likes', props.id],
    () => fetchLikes(props.id),
    {
      onSuccess: (data) => {
        if (data.userLike[0].userLike > 0) {
          setLikeButton(true);
        } else {
          setLikeButton(false);
        }
      },
    }
  );

  const { mutate: mutateAddLike } = useMutation(
    (like) => addLikeRequest(like),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['likes']);
      },
    }
  );

  const { mutate: mutateDeleteLike } = useMutation(
    () => deleteLikeRequest(props.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['likes']);
      },
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error Occurred</p>;
  const styles = { color: 'red' };

  function handleClick() {
    if (data.userLike[0].userLike > 0) {
      setLikeButton(false);
      mutateDeleteLike();
    } else {
      setLikeButton(true);
      mutateAddLike({ id: props.id });
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleClick();
    }
  }

  const likeBtn = likeButton ? (
    <FavoriteIcon style={styles}/>
  ) : (
    <FavoriteBorderIcon style={styles}/>
  );

  return (
    <div className='like-btn-container'>
      <div 
        className="like-btn"
        onClick={handleClick}
        onKeyDown={(event) => handleKeyDown(event)}
        role='button'
        title={likeButton ? 'Unlike' : 'Like'}
        tabIndex='0'
        aria-pressed={likeButton}
        aria-label={likeButton ? 'Unlike' : 'Like'}
      >
        <span>{data.likes[0].Likes}</span>
        <div className="btn">
          {likeBtn}
        </div>
      </div>
    </div>
  );
};
