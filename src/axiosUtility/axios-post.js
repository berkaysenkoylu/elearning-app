import axios from 'axios';

// https://glacial-garden-54072.herokuapp.com/api/post

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/post'
});

export default instance;