import axios from 'axios';

const api = axios.create({
   baseURL: 'http://10.0.0.247:3000/api',
 // Substitua pelo seu IP local real
});

export default api;
