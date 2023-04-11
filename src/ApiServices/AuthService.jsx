import { API_URL } from '../Environment/environment.dev';
import { get, post } from './HttpService';

export const registerUser = async (user) => {
  try {
    return post(`${API_URL}/authenticate/register`, user);
  } catch (err) {
    return { data: [], error: err };
  }
};

export const authenticateUser = async (user) => {
  try {
    return post(`${API_URL}/authenticate/login`, user);
  } catch (err) {
    return { data: [], error: err };
  }
};

export const findUser = async () => {
  try {
    return get(`${API_URL}/user`);
  } catch (err) {
    return { data: { auth: false }, error: err };
  }
};
