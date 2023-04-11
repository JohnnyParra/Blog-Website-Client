// Libraries
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

// API Services
import { setJwt } from '../../ApiServices/JwtService';
import { registerUser } from '../../ApiServices/AuthService';

// Image Assets
import eye from '../../Assets/eye.svg';
import eyeSlash from '../../Assets/eye-slash.svg';

// Styling
import './SignUp.css';

export default function Login() {
  // initialize, states, destructuring
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

  // stores backend call that registers user in refetch
  const { refetch, isRefetching } = useQuery(
    ['register', registerForm],
    () => registerUser({ name, email, password }),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  // handles Input changes
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
    // refetch call
    const registerResponse = await refetch();
    if (!registerResponse.isError && registerResponse.data.jwt) {
      const token = registerResponse.data.jwt;
      setJwt(token);
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      navigate('/HomePage');
    } else {
      setResponseMessage({
        state: true,
        error: 'error',
        msg: 'This email is already in use.',
      });
    }
  };

  // show password button styling
  function showPasswordBtn(event) {
    setShowPassword((prevPass) => !prevPass);
  }
  const styles = {
    backgroundImage: showPassword ? `url(${eye})` : `url(${eyeSlash})`,
  };
  const types = showPassword ? 'text' : 'password';

  return (
    <div className='sign-up'>
      <div className='left'>
        <h1 className='logo'>Blog</h1>
      </div>
      <div className='right'>
        <h1 className='logo'>Blog</h1>
        <div className='log-in'>
          <p>Already have an account?</p>
          <Link to='/Login'>
            <button>Log in</button>
          </Link>
        </div>
        <div className='input-field-container'>
          <div className='input-field'>
            <h1>Sign Up</h1>
            {responseMessage.state && (
              <div className='register-response-message'>
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
              placeholder='Enter your name'
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
              placeholder='Enter your email'
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
                placeholder='Enter Password'
              />
              <button
                style={styles}
                onClick={(event) => showPasswordBtn(event)}
              ></button>
            </div>

            <button onClick={() => handleRegisterClick()}>
              {isRefetching ? 'Loading...' : 'Register'}
            </button>
            {/* <p className='password-error-text'>{passwordMatchMsg}</p> */}
          </div>
          <p className='link'>
            Already have an account?{' '}
            <Link className='Link' to='/Login'>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
