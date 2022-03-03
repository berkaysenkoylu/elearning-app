import axios from 'axios';

// https://glacial-garden-54072.herokuapp.com/api/course
// http://localhost:8000/api/course

const instance = axios.create({
    baseURL: 'https://glacial-garden-54072.herokuapp.com/api/course'
});

export default instance;