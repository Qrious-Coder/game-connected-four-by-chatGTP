import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const registerUser = async (data) => {
  const {username, email, password} = data
  console.log(`api/register`, username)
  const res = await axios.post(`${API_BASE_URL}/register`, {
    username,
    email,
    password,
  });

  return res.data;
};

export const loginUser = async (data) => {
  const {username, password} = data
  console.log(`api/loginUser `, username)
  const res = await axios.post(`${API_BASE_URL}/login`, {
    username,
    password,
  });
  return res.data;
};

// set the auth header
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// set the token in the auth header
export const getUserInfo = async () => {
  setAuthToken(localStorage.getItem('token'));
  const res = await axios.get(`${API_BASE_URL}/user`);
  return res.data;
};