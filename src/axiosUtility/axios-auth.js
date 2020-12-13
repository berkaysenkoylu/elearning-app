import axios from 'axios';

// 'https://glacial-garden-54072.herokuapp.com/api/auth'

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/auth'
});

export default instance;