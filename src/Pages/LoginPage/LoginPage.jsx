// Libraries
import { useQuery } from 'react-query';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

//Components
import SquareButton from '../../Components/common/Buttons/SquareButton/SquareButton';

// Api Services: Authentication
import { setJwt } from '../../ApiServices/JwtService';
import { authenticateUser } from '../../ApiServices/AuthService';

// Image Assets
import eye from '../../Assets/eye.svg';
import eyeSlash from '../../Assets/eye-slash.svg';

// Styling
import './LoginPage.css';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    state: false,
    error: '',
    msg: '',
  });
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const { refetch, isRefetching } = useQuery(
    ['authentication', loginForm],
    () => authenticateUser(loginForm),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleLoginClick = async () => {
    // checks for missing inputs
    if (Object.values(loginForm).indexOf('') > -1) {
      setResponseMessage({
        state: true,
        error: 'missing',
        msg: 'Missing Input Fields',
      });
      return;
    }
    
    const loginResponse = await refetch();

    if (!loginResponse.isError && loginResponse.data.jwt) {
      const token = loginResponse.data.jwt;
      setJwt(token);
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      navigate('/HomePage');
    } else {
      setResponseMessage({
        state: true,
        error: 'error',
        msg: 'Sorry, We could not find a user with this login information',
      });
    }
  };

  // show password button styling
  function password(event) {
    setShowPassword((prevPass) => !prevPass);
  }
  const styles = {
    backgroundImage: showPassword ? `url(${eye})` : `url(${eyeSlash})`,
  };
  const types = showPassword ? 'text' : 'password';

  return (
    <div className='login'>
      <Helmet>
        <link rel="preload" as="image" href="./src/Assets/table-background.webp" />
        <title>Log in | Project B</title>
        <meta name='description' content='This is the log in page of our website.' />
        <meta name='keywords' content='log in, sign in, page, website' />
      </Helmet>
      <div className='left'>
        <h1 className='logo'>Blog</h1>
      </div>
      <div className='right'>
        <h1 className='logo'>Blog</h1>
        <div className='input-field-container'>
          <div className='input-field' role='form'>
            <h2>Login</h2>
            {responseMessage.state && (
              <div 
                className='login-response-message'
                role='alert'
                aria-live='assertive'
              >
                <p>{responseMessage.msg}</p>
              </div>
            )}
            <label htmlFor='email'>Email</label>
            <input
              onChange={(event) => handleFormChange(event)}
              className={
                responseMessage.error === 'missing' 
                && loginForm.email === ''
                  ? 'error'
                  : 'email'
              }
              id='email'
              name='email'
              type='email'
              placeholder='Enter your email'
              autoComplete='on'
              aria-required='true'
              aria-invalid={responseMessage.error === 'missing' && loginForm.email === ''}
            />

            <label htmlFor='password'>Password</label>
            <div className='password-input'>
              <input
                onChange={(event) => handleFormChange(event)}
                className={
                  responseMessage.error === 'missing' 
                  && loginForm.password === ''
                    ? 'error'
                    : 'password'
                }
                id='password'
                name='password'
                type={types}
                placeholder='Enter Password'
                autoComplete='on'
                aria-required='true'
                aria-invalid={responseMessage.error === 'missing' && loginForm.password === ''}
              />
              <button
                style={styles}
                onClick={(event) => password(event)}
                aria-label={types === 'password' ? 'Show password' : 'Hide password'}
              ></button>
            </div>
            <SquareButton 
              className={"btn-width"}
              name={"log in button"}
              title={"Log into website"}
              text={isRefetching ? 'Loading...' : 'Log in'}
              isSelected={true}
              isDisabled={false}
              onClick={() => handleLoginClick()}
              shape={"square"}
              ariaLabel={"Log into website"}
            />
          </div>
          <p className='link'>
            Don't have an account?{' '}
            <Link className='Link' to='/'>
              Sign up
            </Link>
          </p>
          {/* <p>skip login</p> */}
        </div>
      </div>
    </div>
  );
};
