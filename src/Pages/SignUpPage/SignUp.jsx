// Libraries
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Components
import SquareButton from '../../Components/common/Buttons/SquareButton/SquareButton';

// Api Services
import { setJwt } from '../../ApiServices/JwtService';
import { registerUser } from '../../ApiServices/AuthService';

// Image Assets
import eye from '../../Assets/eye.svg'
import eyeSlash from '../../Assets/eye-slash.svg';
import tableBackground from '../../Assets/table-background.webp';

// Styling
import './SignUp.css';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    state: false,
    error: '',
    msg: '',
  });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = registerForm;

  const { refetch, isRefetching } = useQuery(
    ['register', registerForm],
    () => registerUser({ name, email, password }),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // const passwordMatchMsg = password !== confirmPassword ? 'Passwords must match' : '';

  // calls register refetch on Login Click
  const handleRegisterClick = async () => {
    // checks for missing inputs and valid email
    if (Object.values(registerForm).indexOf('') > -1) {
      setResponseMessage({
        state: true,
        error: 'missing',
        msg: 'Missing Input Fields',
      });
      return;
    } else if (registerForm.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) == null) {
      setResponseMessage({
        state: true,
        error: 'invalid',
        msg: 'Email is Invalid',
      });
      return;
    }

    const registerResponse = await refetch();
    if (!registerResponse.isError && registerResponse.data.jwt) {
      const token = registerResponse.data.jwt;
      setJwt(token);
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      navigate('/home');
    } else {
      setResponseMessage({
        state: true,
        error: 'error',
        msg: 'This email is already in use.',
      });
    }
  };

  function showPasswordBtn(event) {
    setShowPassword((prevPass) => !prevPass);
  }

  const styles = {
    backgroundImage: `url("${showPassword ? eye : eyeSlash}")`
  };
  const types = showPassword ? 'text' : 'password';

  return (
    <div className='sign-up'>
      <Helmet>
        <title>Sign up | Project B</title>
        <meta name='description' content='This is the sign up page of our website.' />
        <meta name='keywords' content='sign up, register, page, website' />
      </Helmet>
      <div className='left' style={{backgroundImage: `url("${tableBackground}")`}}>
        <h1 className='logo'>Blog</h1>
      </div>
      <div className='right'>
        <h1 className='logo'>Blog</h1>
        <div className='input-field-container'>
          <div className='input-field' role='form'>
            <h2>Sign up</h2>
            {responseMessage.state && (
              <div 
                className='register-response-message'
                role='alert'
                aria-live='assertive'
              >
                <p>{responseMessage.msg}</p>
              </div>
            )}
            <label htmlFor='name'>Name</label>
            <input
              onChange={(event) => handleFormChange(event)}
              id={
                responseMessage.error === 'missing' && name === ''
                  ? 'error'
                  : 'name'
              }
              name='name'
              type='text'
              autoComplete='username'
              placeholder='Enter your name'
              aria-required='true'
              aria-invalid={responseMessage.error === 'missing' && name === ''}
            />

            <label htmlFor='email'>Email</label>
            <input
              onChange={(event) => handleFormChange(event)}
              id={
                responseMessage.error === 'error' ||
                responseMessage.error === 'invalid'
                  ? 'error'
                  : responseMessage.error === 'missing' && email === ''
                  ? 'error'
                  : 'email'
              }
              name='email'
              type='email'
              autoComplete='email'
              placeholder='Enter your email'
              aria-required='true'
              aria-invalid={
                responseMessage.error === 'error' 
                || responseMessage.error === 'invalid' 
                || (responseMessage.error === 'missing' && email === '')
              }
            />

            <label htmlFor='password'>password</label>
            <div className='password-input'>
              <input
                onChange={(event) => handleFormChange(event)}
                id={
                  responseMessage.error === 'missing' && password === ''
                    ? 'error'
                    : 'password'
                }
                name='password'
                type={types}
                autoComplete='new-password'
                placeholder='Enter Password'
                aria-required='true'
                aria-invalid={responseMessage.error === 'missing' && password === ''}
              />
              <button
                style={styles}
                onClick={(event) => showPasswordBtn(event)}
                aria-label={types === 'password' ? 'Show password' : 'Hide password'}
              ></button>
            </div>
            <SquareButton 
              className={"btn-width"}
              name={"sign up button"}
              title={"sign up for website"}
              text={isRefetching ? 'Loading...' : 'Sign up'}
              isSelected={true}
              isDisabled={false}
              onClick={() => handleRegisterClick()}
              shape={"square"}
              ariaLabel={"Sign up for the website"}
            />
          </div>
          <p className='link'>
            Already have an account?{' '}
            <Link className='Link' to='/login'>
              Log in
            </Link>
          </p>
          {/* <p>skip sign up</p> */}
        </div>
      </div>
    </div>
  );
};
