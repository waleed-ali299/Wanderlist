import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/api/users/register`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_URL}/api/users/login`, userData);
};
