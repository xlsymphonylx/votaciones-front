import axios from 'axios';
import { appUrl } from './config';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${appUrl}/auth/login`, { username, password });
    return response.data.token;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An error occurred during login.');
    }
  }
};