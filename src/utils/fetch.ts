import axios from 'axios';

export const Fetch = axios.create({
  baseURL: 'https://',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
