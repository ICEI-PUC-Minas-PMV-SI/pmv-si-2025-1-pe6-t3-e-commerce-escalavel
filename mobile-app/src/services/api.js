import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.100:3000/api', // Substitua pelo seu IP local real
});

export default api;
