// Libraries
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// MUI Components && Icons
import { styled, alpha } from '@mui/material/styles';
import { UserContext } from '../../Context/UserContext';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Styling
import './Dropdown.css'

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function Dropdown() {
  const navigate = useNavigate();
  const { currentUser, logoutUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
    const target = event.target.getAttribute('name');

    if (target === 'logout') {
      navigate('/Login');
      logoutUser();
    } else if (target === 'profile') {
      navigate('/HomePage/Profile');
    } else if (target === 'posts') {
      navigate('/HomePage/Posts');
    } else if (target === 'likes') {
      navigate('/HomePage/Likes');
    } else if (target === 'home') {
      navigate('/Homepage');
    }
  };

  return (
    <div className="dropdown-container">
      <Button
        id='demo-customized-button'
        sx={{
          backgroundColor: 'transparent',
          color: 'black',
          fontFamily: "'SF Pro Text', 'Myriad Set Pro', 'SF Pro Icons', 'Helvetica Neue','Helvetica', 'Arial', 'sans-serif'",
          padding: '0',
          '&:hover': {
            backgroundColor: 'transparent',
          }
        }}
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='contained'
        disableElevation
        onClick={handleClick}
      >
        <Avatar
          src={currentUser?.userInfo[0].avatar}
          sx={{ m: 1, bgcolor: '#ff3d00'}}
        >
          {currentUser?.userInfo[0].name[0]}
        </Avatar>
        <span className='user'>{currentUser.userInfo[0]?.name}</span>
        {open ? (
          <KeyboardArrowUpIcon className='user-icon' />
        ) : (
          <KeyboardArrowDownIcon className='user-icon' />
        )}
      </Button>
      <StyledMenu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          className='menuItem'
          name='home'
          title='home'
          sx={{fontSize: "12px", minHeight: "30px"}}
          onClick={(event) => handleClose(event)}
          disableRipple
        >
          <HomeIcon />
          Home
        </MenuItem>
        <MenuItem
          className='menuItem'
          name='profile'
          title='profile'
          sx={{fontSize: "12px", minHeight: "30px"}}
          onClick={(event) => handleClose(event)}
          disableRipple
        >
          <AccountBoxIcon />
          Profile
        </MenuItem>
        <MenuItem
          className='menuItem'
          name='posts'
          title='your posts'
          sx={{fontSize: "12px", minHeight: "30px"}}
          onClick={(event) => handleClose(event)}
          disableRipple
        >
          <FileCopyIcon />
          Your Posts
        </MenuItem>
        <MenuItem
          className='menuItem'
          name='likes'
          title='your liked posts'
          sx={{fontSize: "12px", minHeight: "30px"}}
          onClick={(event) => handleClose(event)}
          disableRipple
        >
          <FavoriteIcon />
          Your Likes
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          className='menuItem'
          name='logout'
          title='logout'
          sx={{fontSize: "12px", minHeight: "30px"}}
          onClick={(event) => handleClose(event)}
          disableRipple
        >
          <LogoutIcon />
          Log Out
        </MenuItem>
      </StyledMenu>
    </div>
  );
};
