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
      retry: 1,
    },
    {
      onSuccess: (data) => {
        if (data.userLike[0].userLike > 0) {
          setLikeButton(true);
        } else {
          setLikeButton(false);
        }
      },
      onError: (data) => {

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

  if (isLoading) {
    return(
      <div className="user-posts-container">
        <span className="status" role="status" aria-busy="true" aria-live="polite">Loading...</span>
      </div>
    )
  } else if (isError) {
    return (
      <div className="user-posts-container">
        <span className="status" role='alert' aria-live="assertive">Error</span>
      </div>
    )
  }
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
