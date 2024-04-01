// Libraries
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

// Api Services
import {
  addCommentLikeRequest,
  fetchCommentLikes,
  deleteCommentLikeRequest,
} from "../../ApiServices/TasksService";

// MUI Icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Styling
import "./CommentLikeButton.css";

export default function CommentLikeButton(props) {
  const [likeButton, setLikeButton] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    ["likes", props.id],
    () => fetchCommentLikes(props.id),
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
    () => addCommentLikeRequest(props.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const { mutate: mutateDeleteLike } = useMutation(
    () => deleteCommentLikeRequest(props.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error Occurred</p>;
  const styles = { color: "red" };

  function addLikeClick() {
    setLikeButton(true);
    mutateAddLike();
  }

  function removeLikeClick() {
    setLikeButton(false);
    mutateDeleteLike();
  }

  const likeBtn = likeButton ? (
    <FavoriteIcon style={styles} onClick={removeLikeClick} />
  ) : (
    <FavoriteBorderIcon style={styles} onClick={addLikeClick} />
  );

  return (
    <div className="like-btn">
      <span>{data.likes[0].Likes}</span>
      {likeBtn}
    </div>
  );
}
