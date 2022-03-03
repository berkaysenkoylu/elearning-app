import axios from 'axios';

// 'https://glacial-garden-54072.herokuapp.com/api/auth'
// 'http://localhost:8000/api/auth'

const instance = axios.create({
    baseURL: 'https://glacial-garden-54072.herokuapp.com/api/auth'
});

export default instance;