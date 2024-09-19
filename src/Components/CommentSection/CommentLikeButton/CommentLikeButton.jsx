// Libraries
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

// Components
import NotLoggedIn from "../../Modal/NotLoggedIn/NotLoggedIn";

// Api Services
import {
  addCommentLikeRequest,
  fetchCommentLikes,
  deleteCommentLikeRequest,
} from "../../../ApiServices/TasksService";
import { getJwt } from "../../../ApiServices/JwtService";

// MUI Components && Icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Styling
import "./CommentLikeButton.css";

export default function CommentLikeButton(props) {
  const navigate = useNavigate();
  const [likeButton, setLikeButton] = useState(false);
  const [askLogin, setAskLogin] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    ["likes", props.id],
    () => fetchCommentLikes(props.id),
    {
      onSuccess: (data) => {
        if (data.userLike > 0) {
          setLikeButton(true);
        } else {
          setLikeButton(false);
        }
      },
    }
  );

  const { mutate: mutateAddLike } = useMutation(
    () => addCommentLikeRequest(props.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
        setLikeButton(true);
      },
    }
  );

  const { mutate: mutateDeleteLike } = useMutation(
    () => deleteCommentLikeRequest(props.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
        setLikeButton(false);
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
  const styles = { color: "red" };

  function handleClick() {
    if (getJwt() == null) {
      setAskLogin(true);
      return;
    }
    if (data.userLike > 0) {
      mutateDeleteLike();
    } else {
      mutateAddLike();
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
        tabIndex='0'
        label={likeButton ? 'Unlike' : 'Like'}
        aria-pressed={likeButton}
        aria-label={likeButton ? 'Unlike' : 'Like'}
      >
        <span>{data.likes[0].Likes}</span>
        <div className="btn">
          {likeBtn}
        </div>
      </div>
      <NotLoggedIn 
      cancel={() => setAskLogin(false)}
      delete={() => navigate('/login')}
      isOpen={askLogin}
      setIsOpen={setAskLogin}
      label={"You need to be logged in to like a comment"}
      />
    </div>
  );
}
