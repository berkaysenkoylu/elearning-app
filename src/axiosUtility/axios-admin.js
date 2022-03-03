import axios from 'axios';

// https://glacial-garden-54072.herokuapp.com/api/admin
// http://localhost:8000/api/admin

const instance = axios.create({
    baseURL: 'https://glacial-garden-54072.herokuapp.com/api/admin'
});

export default instance;