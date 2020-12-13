import axios from 'axios';

// https://glacial-garden-54072.herokuapp.com/api/course

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/course'
});

export default instance;