import axios from 'axios';

// https://glacial-garden-54072.herokuapp.com/api/forum
// 'http://localhost:8000/api/forum'

const instance = axios.create({
    baseURL: 'https://glacial-garden-54072.herokuapp.com/api/forum'
});

export default instance;