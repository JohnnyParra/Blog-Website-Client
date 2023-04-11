import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default React.memo(function FeaturedPost(props) {
  const { updateData } = useContext(UserContext);
  const { post } = props;
  const { post_id, post_title, post_description, image, date_created } = post;

  const navigate = useNavigate();

  function handleClick() {
    updateData(post);
    navigate(`/HomePage/${post_id}`);
  }

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url("${image}")`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={image} alt='image' />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.7)',
        }}
      />
      <Grid container>
        <CardActionArea component='a' onClick={handleClick}>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component='h1'
                variant='h3'
                color='inherit'
                gutterBottom
              >
                {post_title}
              </Typography>
              <Typography variant='h5' color='inherit' paragraph>
                {post_description}
              </Typography>
              <Typography variant='subtitle1' color={`rgb(255,255,255)`}>
                Continue reading...
              </Typography>
            </Box>
          </Grid>
        </CardActionArea>
      </Grid>
    </Paper>
  );
});
