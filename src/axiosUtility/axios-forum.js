import axios from 'axios';

// https://glacial-garden-54072.herokuapp.com/api/forum

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/forum'
});

export default instance;