// Libraries && Context
import { useState, useContext } from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';
import Compressor from 'compressorjs';


// Api Services
import { updateAvatarRequest } from '../../ApiServices/TasksService';
import { fetchUser, fetchAvatar } from '../../ApiServices/TasksService';
import { deleteAccountRequest } from '../../ApiServices/TasksService';

// MUI Components
import { Avatar, IconButton } from '@mui/material';

// Components
import Navbar from '../../Components/Navbar/Navbar';
import SquareButton from '../../Components/common/Buttons/SquareButton/SquareButton';

// Image Assets
import eye from '../../Assets/eye.svg';
import eyeSlash from '../../Assets/eye-slash.svg';

// Styling
import './ProfilePage.css';

export default function Profile() {
  const { currentUser, loginUser, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [popup, setPopup] = useState(false);
  const [input, setInput] = useState({
    name: currentUser.userInfo[0].name,
    email: currentUser.userInfo[0].email,
    password: '',
    avatar: '',
  });
  const [previewImage, setPreviewImage] = useState(
    ''
  );
  const [showPassword, setShowPassword] = useState(false);
  const [changes, setChanges] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    state: false,
    error: '',
    msg: '',
  });

  const { mutate: mutateUpdateAvatar } = useMutation(
    (newAvatar) => updateAvatarRequest(newAvatar),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['user']);
        setInput((prevInput) => ({ ...prevInput, avatar: '' }));
        console.log(data);
        if (!data) {
          setResponseMessage({
            state: true,
            error: 'error',
            msg: 'Incorrect Password Entered',
          });
        }
      },
      onError: (data) => {
        setResponseMessage({
          state: true,
          error: 'error',
          msg: 'An Error Occurred',
        });
      },
    }
  );

  const { mutate: mutateDeleteAccount } = useMutation(
    () => deleteAccountRequest(),
    {
      onSuccess: () => {
        navigate('/Login');
        logoutUser();
      },
    }
  );

  const { isLoading: userLoading, isError: userError } = useQuery(
    'user', 
    fetchUser, 
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        loginUser(data);
        setChanges(false);
      },
    }
  );

  const {isLoading: avatarLoading, isError: avatarError} = useQuery(
    'avatar',
    fetchAvatar,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setPreviewImage(data.image[0].avatar)
      }
    }
  )

  if (userLoading) return <p>Loading...</p>;
  if (userError) return <p>An Error occurred</p>;

  function avatarChange(event) {
    setInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.files[0],
    }));
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setChanges(true);
    setResponseMessage({ state: false });
  }

  function inputChange(event) {
    setInput((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
    setChanges(true);
    setResponseMessage({ state: false });
  }

  function popUp() {
    setPopup(true);
  }

  function deleteAccount() {
    mutateDeleteAccount();
    setPopup(false);
  }

  async function handleClick(event) {
    setInput((prevInput) => ({ ...prevInput, password: '' }));
    if (event.currentTarget.getAttribute('data-name') === 'save') {
      let formData = new FormData();
      const compressedImage = await new Promise((resolve, reject) => {
        new Compressor(input.avatar, {
          quality: 0.7,
          maxWidth: 500,
          maxHeight: 500,
          convertTypes: ['image/png', 'image/jpeg', 'image/*'],
          mimeType: 'image/webp',
          success(result) {
            resolve(result);
          },
          error(err) {
            reject(err);
          }
        })
      })
      formData.append('avatar', compressedImage, compressedImage.name);
      formData.append('name', input.name);
      formData.append('email', input.email);
      formData.append('password', input.password);
      mutateUpdateAvatar(formData);
    }
  }

  function password(event) {
    setShowPassword((prevPass) => !prevPass);
  }
  const styles = {
    backgroundImage: showPassword ? `url(${eye})` : `url(${eyeSlash})`,
  };
  const types = showPassword ? 'text' : 'password';

  return (
    <main className='profile-page'>
      <Helmet>
        <title>Profile | Project B</title>
        <meta name='description' content='This is the users profile page of our website.' />
        <meta name='keywords' content='profile, user, page, website' />
      </Helmet>
      <div className='App'>
        <Navbar />
        <div className='avatar'>
          <input
            accept='image/*'
            id='avatar-pic'
            name='avatar'
            onChange={(event) => avatarChange(event)}
            type='file'
            hidden
          ></input>
          <label htmlFor='avatar-pic'>
            <IconButton component='span'>
              <Avatar
                src={previewImage}
                sx={{
                  fontSize: 100,
                  width: {xs: 150, sm: 200},
                  height: {xs: 150, sm: 200},
                  m: 1,
                  bgcolor: '#047CB4',
                }}
                alt="user's avatar"
              >
                {currentUser.userInfo[0]?.name[0]}
              </Avatar>
            </IconButton>
          </label>
        </div>
        <p>
          Member since:{' '}
          {new Date(
            currentUser.userInfo[0].date_created
          ).toLocaleString()}
        </p>
        <div className='input-container'>
          <div className="input-canvas" role='form' aria-label="Users information">
            {responseMessage.state && (
              <div 
                className='profile-message'
                role='alert'
                aria-live='polite'
              >
                <p>{responseMessage.msg}</p>
              </div>
            )}
            <div className='input-row'>
              <div className="label">
                <label htmlFor='username'>Username: </label>
              </div>
              <div className="input username">
                <input
                  type='text'
                  id='username'
                  name='name'
                  value={input.name}
                  onChange={(event) => inputChange(event)}
                ></input>
              </div>
            </div>
            <div className='input-row'>
              <div className="label">
                <label htmlFor="email">Email: </label>
              </div>
              <div className="input email">
                <input
                  type='text'
                  id='email'
                  name='email'
                  value={input.email}
                  onChange={(event) => inputChange(event)}
                ></input>
              </div>
            </div>
            {changes && (
              <div className='input-row'>
                <div className="label">
                  <label htmlFor="password">Password: </label>
                </div>
                <div className="input password">
                  <input
                    name='password'
                    id='password'
                    value={input.password}
                    type={types}
                    onChange={(event) => inputChange(event)}
                  ></input>
                  <button
                    style={styles}
                    onClick={(event) => password(event)}
                  ></button>
                </div>
              </div>
            )}
            {changes && (
              <SquareButton 
                className={""}
                name={'save'}
                title={'save changes'}
                text={'Save Changes'}
                color={'primary'}
                isSelected={true}
                onClick={(event) => handleClick(event)}
                disabled={input.password == ''}
                shape={'square'}
              
              />
            )}
          </div>
        </div>
        <div className="delete" onClick={() => popUp()}><span>Delete Account</span></div>
        {popup && (
          <div className="overlay-delete-container">
            <div className="page-overlay">
            </div>
            <div className="check-delete-container">
              <span><b>Are you sure you want to delete your Account?</b></span>
              <span>You will have 30 days to reactivate this account</span>
              <div className="options">
                <button className="cancel" onClick={() => setPopup(false)}>Cancel</button>
                <button className="delete" onClick={() => deleteAccount()}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
