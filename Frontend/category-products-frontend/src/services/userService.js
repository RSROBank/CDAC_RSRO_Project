import axios from 'axios';
const BASE_URL = 'http://localhost:8080/user';

export const addNewUser = (user) => {
  return axios.post(BASE_URL+ "/signup", user);
};
