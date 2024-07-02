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
        <CardActionArea 
          component='a' 
          onClick={handleClick}
          aria-label={`Read more about ${title}`}
        >
          <Card title={title} sx={{ display: 'flex' , maxHeight: "260px"}}>
            <CardContent sx={{ 
              flex: 1,  
              width: "75%", 
              overflow: "hidden", 
              textOverflow: "ellipsis",
              }}
            >
              <Typography 
                title={title} 
                component='h3' 
                variant='h2'  
                sx={{
                  overflow:"hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  lineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {title}
              </Typography>
              <Typography variant='subtitle1' color='text.secondary'>
                {date_published ? new Date(date_published).toLocaleString() : "Not Published"}
              </Typography>
              <Typography noWrap title={description} sx={{marginBottom: {xs: "5px", sm: "8px"}}} variant='subtitle1' paragraph>
                {description}
              </Typography>
              <Typography variant='subtitle1' color='primary'>
                Continue reading...
              </Typography>
            </CardContent>
            <CardMedia
              component='img'
              sx={{ width: "25%", maxHeight: "100%" , display: { xs: 'none', sm: 'block' } }}
              image={image}
              alt={title}
            />
          </Card>
        </CardActionArea>
      </Grid>
    </div>
  );
});

// WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
// WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
