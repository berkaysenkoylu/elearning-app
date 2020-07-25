import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/forum'
});

export default instance;