// Libraries
import React from 'react';
import { useNavigate } from 'react-router-dom';

// MUI Components && Icons
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

// Styling
import './PostCard.css';

export default React.memo(function PostCard(props) {
  const { post } = props;
  const { id, title, description, date_published, image } = post;

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/HomePage/${id}`);
  };

  return (
    <div className='post-card-container'>
      <Grid item xs={12} md={6}>
        <CardActionArea component='a' onClick={handleClick}>
          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component='h2' variant='h5'>
                {title}
              </Typography>
              <Typography variant='subtitle1' color='text.secondary'>
                {date_published ? new Date(date_published).toLocaleString() : "Not Published"}
              </Typography>
              <Typography variant='subtitle1' paragraph>
                {description}
              </Typography>
              <Typography variant='subtitle1' color='primary'>
                Continue reading...
              </Typography>
            </CardContent>
            <CardMedia
              component='img'
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
