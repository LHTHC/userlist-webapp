import axios from 'axios';

const BASE_URL = 'https://randomuser.me/';

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
