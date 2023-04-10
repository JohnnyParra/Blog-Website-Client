import React, { useContext } from 'react';
import { useQueryClient } from 'react-query';
import { UserContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import './PostCard.css'


export default React.memo(function PostCard(props) {
  const { updateData } = useContext(UserContext)
  const queryClient = useQueryClient();
  const { post } = props;
  const {post_id, post_title, post_description, date_created, image} = post

  const navigate = useNavigate();

  function handleClick() {
    updateData(post)
    navigate(`/HomePage/${post_id}`)
  }

  return (
    <div className="post-card-container">
      <Grid item xs={12} md={6}>
        <CardActionArea component="a" onClick={handleClick}>
          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {post_title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {new Date(Number(date_created)).toLocaleString()}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post_description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={image}
              alt='image'
            />
          </Card>
        </CardActionArea>
      </Grid>
    </div>
  );
});