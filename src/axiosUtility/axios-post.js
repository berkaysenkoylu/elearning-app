import axios from 'axios';

// https://glacial-garden-54072.herokuapp.com/api/post
// http://localhost:8000/api/post

const instance = axios.create({
    baseURL: 'https://glacial-garden-54072.herokuapp.com/api/post'
});

export default instance;